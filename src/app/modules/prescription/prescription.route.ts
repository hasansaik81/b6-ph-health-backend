import express from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { PrescriptionValidation } from "./prescription.validation";
import { PrescriptionController } from "./prescription.controller";

const router=express.Router()

router.post(
    '/',
    checkAuth(Role.DOCTOR),
    validateRequest(PrescriptionValidation.createPrescriptionZodSchema ),
    PrescriptionController.givePrescription
)