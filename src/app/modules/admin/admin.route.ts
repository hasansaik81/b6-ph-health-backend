import { Router } from "express";
// import { cheeckAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { AdminController } from "./admin.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { updatedAdminZodSchema } from "./admin.validation";
import { checkAuth } from "../../middleware/checkAuth";

const router=Router();

router.get("/",
    cheeckAuth(Role.ADMIN,Role.SUPER_ADMIN),
    AdminController.getAllAdmins);
    router.get("/:id",
        cheeckAuth(Role.ADMIN,Role.SUPER_ADMIN),
        AdminController.getAdminById);

     router.patch("/:id",
        checkAuth(Role.SUPER_ADMIN),
         validateRequest(updatedAdminZodSchema),AdminController.updateAdmin);

         router.delete("/:id",
            checkAuth(Role.SUPER_ADMIN),
            AdminController.updateAdmin);


export const AdminRoutes=router;
         


            
        
    
function cheeckAuth(ADMIN: string, SUPER_ADMIN: string): import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> {
   throw new Error("Function not implemented.");
}

