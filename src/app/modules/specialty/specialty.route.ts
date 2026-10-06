import { Router } from "express";
import { SpecialtyController } from "./specialty.controller";
import { cheeckAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";


const router=Router();


router.post("/",cheeckAuth(Role.ADMIN,Role.SUMPER_ADMIN), SpecialtyController.createSpecialty);
router.get("/",SpecialtyController.getAllSpecialty);
router.delete("/:id",cheeckAuth(Role.ADMIN,Role.SUMPER_ADMIN ),SpecialtyController.deleteSpecialty);


export const SpecialtyRoute=router;