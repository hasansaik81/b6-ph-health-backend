import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { multerUpload } from "../../config/multer.config";
import { SpecialtyController } from "./specialty.controller";
import { SpecialtyValidation } from "./specialty.validation";
import { validateRequest } from "../../middleware/validateRequest";



const router=Router();



router.post("/",
    // checkAuth(Role.ADMIN,Role.SUPER_ADMIN),
    multerUpload.single("file"),
    validateRequest(SpecialtyValidation.createSpecialtyZodSchema),
 SpecialtyController.createSpecialty);
router.get("/",SpecialtyController.getAllSpecialty);
router.delete("/:id",checkAuth(Role.ADMIN,Role.SUPER_ADMIN ),SpecialtyController.deleteSpecialty);


export const SpecialtyRoutes=router;

