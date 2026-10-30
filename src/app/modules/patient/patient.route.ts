import { Router } from "express";
// import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { multerUpload } from "../../config/multer.config";
import { validateRequest } from "../../middleware/validateRequest";
import { PatientValidation } from "./patient.validation";
import { PatientController } from "./patient.controller";
import { checkAuth } from "../../middleware/checkAuth";

const router=Router();


router.patch("/update-my-profile",
    checkAuth(Role.PATIENT),
    multerUpload.fields([
        { name : "profilePhoto", maxCount : 1},
        { name : "medicalReports", maxCount :
    ]),

    validateRequest(PatientValidation.updatePatientProfileZodSchema),
    PatientController.updateMyProfile
)