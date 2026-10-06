import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma"; // your prisma client instance
import { Role, UserStatus } from "../../generated/prisma/enums";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "sqlite", ...etc
    }),
    emailAndPassword: {
        enabled: true
    },
    user:{
        additionalFields:{
            role:{
                type:"string",
                required:true,
                defaultvalue:Role.PATIENT
            },
            status:{
                type:"string",
                required:true,
                defaultvalue:UserStatus.ACTIVE
            },
            needPasswordChange:{
                type:"boolean",
                required:true,
                defaultvalue:false
            },
            isDeleted:{
            type:"boolean",
            required:true,
            defaultvalue:false
            },
            deletedAt:{
                type:"date",
                required:false,
                defaultvalue:null
            },

        }
    },

    // trustedOrigin: [process.env.BETTER_AUTH_URL || "http://localhost:5000"],
    // advanced:{
    //     disableCSRFcheck:true,
    // }
    // your frontend URL
});