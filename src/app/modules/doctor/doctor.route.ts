import { Router } from "express";
import { DoctorController } from "./doctor.controller";
import { cheeckAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { updateDoctorZodSchema } from "./doctor.validation";

const router =Router()

router.get("/",
    cheeckAuth(Role.ADMIN,Role.SUPER_ADMIN), DoctorController.getAllDoctors);
    router.get("/:id",
        cheeckAuth(Role.ADMIN,Role.SUPER_ADMIN),DoctorController.getDoctorById
    );

    router.patch("/:id",
    cheeckAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(updateDoctorZodSchema), DoctorController.updateDoctor);
router.delete("/:id",
    cheeckAuth(Role.ADMIN, Role.SUPER_ADMIN),
    DoctorController.deleteDoctor);



export const DoctorRoutes=router;