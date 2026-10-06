import { Router } from "express";
import { DoctorController } from "./doctor.controller";

const router =Router()

router.post("/",DoctorController.getAllDoctors);


export const DoctorRoutes=router;