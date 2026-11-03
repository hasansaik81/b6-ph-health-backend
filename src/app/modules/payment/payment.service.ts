/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from "stripe";
import { PaymentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { uploadFileToCloudinary } from "../../config/cloudinary.config";


const handlerStripeWebhookEvent = async (event : Stripe.Event) =>{

    const existingPayment = await prisma.payment.findFirst({
        where:{
            stripeEventId : event.id
        }
    })

    if(existingPayment){
        console.log(`Event ${event.id} already processed. Skipping`);
        return {message : `Event ${event.id} already processed. Skipping`}
    }

    switch(event.type){
        case "checkout.session.completed" : {
            const session = event.data.object 

            const appointmentId = session.metadata?.appointmentId

            const paymentId = session.metadata?.paymentId

            if(!appointmentId || !paymentId){
                console.error("Missing appointmentId or paymentId in session metadata");
                return {message : "Missing appointmentId or paymentId in session metadata"}
            }

            const appointment = await prisma.appointment.findUnique({
                where : {
                    id : appointmentId
                },
                include:{
                    patient:true,
                    doctor:true,
                    payment:true,
                    schedule:true,
                }
            })

            if(!appointment){
                console.error(`Appointment with id ${appointmentId} not found`);
                return {message : `Appointment with id ${appointmentId} not found`}
            }

            let pdfBuffer : Buffer | null = null;

              // Update both appointment and payment in a transaction

            await prisma.$transaction(async (tx) => {
     const result = await tx.appointment.update({
                    where : {
                        id : appointmentId
                    },
                    data : {
                        paymentStatus : session.payment_status === "paid" ? PaymentStatus.PAID : PaymentStatus.UNPAID
                    }
                });

                let invoceUrl:null;

                // If payment is successful, generate and upload invoice
                if(session.payment_status === "paid"){
                try{
                    // Generate invoice PDF
                    pdfBuffer=await generateInvoicepdf({
                         invoiceId: appointment.payment?.id || paymentId,
                            patientName: appointment.patient.name,
                            patientEmail: appointment.patient.email,
                            doctorName: appointment.doctor.name,
                            appointmentDate: appointment.schedule.startDateTime.toString(),
                            amount: appointment.payment?.amount || 0,
                            transactionId: appointment.payment?.transactionId || "",
                            paymentDate: new Date().toISOString()
                    })
                           // Upload PDF to Cloudinary
               const cloudinaryResponse=await uploadFileToCloudinary(pdfBuffer,
                            `ph-healthcare/invoices/invoice-${paymentId}-${Date.now()}.pdf`) ; 

                             invoiceUrl = cloudinaryResponse?.secure_url;  
                         console.log(`✅ Invoice PDF generated and uploaded for payment ${paymentId}`);       
                            
                }catch(pdfError){
                     console.error("❌ Error generating/uploading invoice PDF:", pdfError);
                      // Continue with payment update even if PDF generation fails
                }
                
            });

            console.log(`Processed checkout.session.completed for appointment ${appointmentId} and payment ${paymentId}`);
            break;
        }
        case "checkout.session.expired" : {
                const session = event.data.object

                console.log(`Checkout session ${session.id} expired. Marking associated payment as failed.`);
                break;

        }
        case "payment_intent.payment_failed" : {
            const session = event.data.object

            console.log(`Payment intent ${session.id} failed. Marking associated payment as failed.`);
            break;
        }
        default :
            console.log(`Unhandled event type ${event.type}`);
    }

    return {message : `Webhook Event ${event.id} processed successfully`}
}

export const PaymentService = {
    handlerStripeWebhookEvent
}