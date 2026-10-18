import { Router } from "express";
import { cheeckAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { AdminController } from "./admin.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { updatedAdminZodSchema } from "./admin.validation";

const router=Router();

router.get("/",
    cheeckAuth(Role.ADMIN,Role.SUMPER_ADMIN),
    AdminController.getAllAdmins);
    router.get("/:id",
        cheeckAuth(Role.ADMIN,Role.SUMPER_ADMIN),
        AdminController.getAdminById);

     router.patch("/:id",
        cheeckAuth(Role.SUMPER_ADMIN),
         validateRequest(updatedAdminZodSchema),AdminController.updateAdmin);

         router.delete("/:id",
            cheeckAuth(Role.SUMPER_ADMIN),
            AdminController.updateAdmin);


export const AdminRoutes=router;
         


            
        
    
