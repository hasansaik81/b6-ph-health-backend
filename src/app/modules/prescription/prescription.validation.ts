import z from "zod";

const createPrescriptionZodSchema=z.object({
    appointmentId:z.string("Instructions is required").min(1,"Instructions connot be empty"),
    instructions:z.string("Instructions is required").min(1,"Instructions cannot be empty"),
    followUpData:z.string("Follow-up date must be a valid date").optional()
});

const updatePrescriptionZodSchema=z.object({
       instructions: z.string("Instructions is required").min(1, "Instructions cannot be empty").optional(),
    followUpDate: z.string("Follow-up date must be a valid date").optional()
})


export const PrescriptionValidation={
    createPrescriptionZodSchema,
    updatePrescriptionZodSchema
};