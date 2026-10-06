import { Role } from "../../generated/prisma/enums";
import { CookieUtils } from "../utils/cookies";

export const cheeckAuth=(...authRoles:Role[]=>{
    try{
          //Session Token Verification
          const sessionToken=CookieUtils.getCookie(req,"better-auth.session_token");

          if(!sessionToken){
            throw new Error ('Unauthorized access! No session token provided.');
            
          }
    }catch(){}
})