import { Router } from "express";
// import { SpecialtyController } from "./specialty.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { multerUpload } from "../../config/multer.config";
import { SpecialtyController } from "./specialty.controller";


const router=Router();


router.post("/",
    // checkAuth(Role.ADMIN,Role.SUPER_ADMIN),
    multerUpload.single("file"),
 SpecialtyController.createSpecialty);
router.get("/",SpecialtyController.getAllSpecialty);
router.delete("/:id",checkAuth(Role.ADMIN,Role.SUPER_ADMIN ),SpecialtyController.deleteSpecialty);


export const SpecialtyRoute=router;