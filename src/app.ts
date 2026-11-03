

import express, { Application, Request, Response } from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { toNodeHandler } from "better-auth/node";
import cron from "node-cron";
// import IndexRoutes from "./app/routes";
import { envVars } from "./app/config/env";
import { auth } from "./app/lib/auth";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";
import qs from "qs";
import { PaymentController } from "./app/modules/payment/payment.controller";
import { AppointmentService } from "./app/modules/appointment/appointment.service";
import { IndexRoutes } from "./app/routes";

const app: Application = express();
app.set("query parser", (str : string) => qs.parse(str));

// EJS configuration
app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), "src/app/templates"));
app.post("/webhook", express.raw({ type: "application/json" }), PaymentController.handleStripeWebhookEvent)

// app.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   async (req: Request, res: Response) => {
//     console.log("Webhook received:", req.body);

//     res.status(200).json({
//       received: true,
//     });
//   }
// );


// CORS
app.use(
  cors({
    origin: [
      envVars.FRONTEND_URL,
      envVars.BETTER_AUTH_URL,
      "http://localhost:3000",
      "http://localhost:5000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

// Better Auth handler — before application 404 middleware
// app.all("/api/v1/auth/*splat", toNodeHandler(auth));
app.use("/api/auth",toNodeHandler(auth))


cron.schedule("*/25 * * * *",async()=>{
  try{console.log("Running cron job to cancel unpaid appointmets...");
    await AppointmentService.cancelUnpaidAppointments();
  }catch(error:any){
    console.error("Error occurred while canceling unpaid appointments:",error.message);
  }
})

// Application routes
app.use("/api/v1", IndexRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

// Error handlers — last
app.use(globalErrorHandler);
app.use(notFound);

export default app;

