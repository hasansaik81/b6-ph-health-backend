import { Router } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { Role } from "../../../generated/prisma/enums";
import { multerUpload } from "../../config/multer.config";

const router=Router();


router.patch("/update-my-profile",
    catchAsync(Role.PATIENT),
    multerUpload.fields([
        { name : "profilePhoto", maxCount : 1},
        { name : "medicalReports", maxCount :
    ]),

    updateMyPatientProfileMiddleware,
    validateRequest(PatientValidation.updatePatientProfileZodSchema),
    PatientController.updateMyProfile
)