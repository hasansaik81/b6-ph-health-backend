import { Router } from "express";
// import { cheeckAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { AdminController } from "./admin.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { updatedAdminZodSchema } from "./admin.validation";
import { checkAuth } from "../../middleware/checkAuth";

const router=Router();

router.get("/",
    checkAuth(Role.ADMIN,Role.SUPER_ADMIN),
    AdminController.getAllAdmins);
    router.get("/:id",
        checkAuth(Role.ADMIN,Role.SUPER_ADMIN),
        AdminController.getAdminById);

     router.patch("/:id",
        checkAuth(Role.SUPER_ADMIN),
         validateRequest(updatedAdminZodSchema),AdminController.updateAdmin);

         router.delete("/:id",
            checkAuth(Role.SUPER_ADMIN),
            AdminController.updateAdmin);


export const AdminRoutes=router;
         


            
        


