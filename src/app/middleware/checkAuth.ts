

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { NextFunction, Request, Response } from "express";
// import status from "http-status";
// import { Role, UserStatus } from "../../generated/prisma/enums";
// import { envVars } from "../config/env";
// // import AppError from "../errorHelpers/AppError";
// import { prisma } from "../lib/prisma";
// // import { CookieUtils } from "../utils/cookie";
// import { jwtUtils } from "../utils/jwt";
// import { CookieUtils } from "../utils/cookies";
// import AppError from "../errorHelper/AppError";

// export const checkAuth = (...authRoles: Role[]) => async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         //Session Token Verification
//         const sessionToken = CookieUtils.getCookie(req, "better-auth.session_token");

//         if (!sessionToken) {
//             throw new Error('Unauthorized access! No session token provided.');
//         }

//         if (sessionToken) {
//             const sessionExists = await prisma.session.findFirst({
//                 where: {
//                     token: sessionToken,
//                     expiresAt: {
//                         gt: new Date(),
//                     }
//                 },
//                 include: {
//                     user: true,
//                 }
//             })

//             if (sessionExists && sessionExists.user) {
//                 const user = sessionExists.user;

//                 const now = new Date();
//                 const expiresAt = new Date(sessionExists.expiresAt)
//                 const createdAt = new Date(sessionExists.createdAt)

//                 const sessionLifeTime = expiresAt.getTime() - createdAt.getTime();
//                 const timeRemaining = expiresAt.getTime() - now.getTime();
//                 const percentRemaining = (timeRemaining / sessionLifeTime) * 100;

//                 if (percentRemaining < 20) {
//                     res.setHeader('X-Session-Refresh', 'true');
//                     res.setHeader('X-Session-Expires-At', expiresAt.toISOString());
//                     res.setHeader('X-Time-Remaining', timeRemaining.toString());

//                     console.log("Session Expiring Soon!!");
//                 }

//                 if (user.status === UserStatus.BLOCKED || user.status === UserStatus.DELETED) {
//                     throw new AppError(status.UNAUTHORIZED, 'Unauthorized access! User is not active.');
//                 }

//                 if (user.isDeleted) {
//                     throw new AppError(status.UNAUTHORIZED, 'Unauthorized access! User is deleted.');
//                 }

//                 if (authRoles.length > 0 && !authRoles.includes(user.role)) {
//                     throw new AppError(status.FORBIDDEN, 'Forbidden access! You do not have permission to access this resource.');
//                 }

//                 req.user = {
//                     userId : user.id,
//                     role : user.role,
//                     email : user.email,
//                 }
//             }

//             const accessToken = CookieUtils.getCookie(req, 'accessToken');

//             if (!accessToken) {
//                 throw new AppError(status.UNAUTHORIZED, 'Unauthorized access! No access token provided.');
//             }


//         }

//         //Access Token Verification
//         const accessToken = CookieUtils.getCookie(req, 'accessToken');

//         if (!accessToken) {
//             throw new AppError(status.UNAUTHORIZED, 'Unauthorized access! No access token provided.');
//         }

//         const verifiedToken = jwtUtils.verifyToken(accessToken, envVars.ACCESS_TOKEN_SECRET);

//         if (!verifiedToken.success) {
//             throw new AppError(status.UNAUTHORIZED, 'Unauthorized access! Invalid access token.');
//         }

//         if (authRoles.length > 0 && !authRoles.includes(verifiedToken.data!.role as Role)) {
//             throw new AppError(status.FORBIDDEN, 'Forbidden access! You do not have permission to access this resource.');
//         }

//         next()
//     } catch (error: any) {
//         next(error);
//     }
// };





// deepsek ai er code 

import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { Role, UserStatus } from "../../generated/prisma/enums";
import { envVars } from "../config/env";
// import AppError from "../errorHelpers/AppError";
import { prisma } from "../lib/prisma";
// import { CookieUtils } from "../utils/cookie";
import { jwtUtils } from "../utils/jwt";
import { CookieUtils } from "../utils/cookies";
import AppError from "../errorHelper/AppError";

export const checkAuth = (...authRoles: Role[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            // ==========================================
            // পদ্ধতি ১: Better Auth Session
            // ==========================================
            const sessionToken = CookieUtils.getCookie(req, "better-auth.session_token");

            if (sessionToken) {
                const sessionExists = await prisma.session.findFirst({
                    where: {
                        token: sessionToken,
                        expiresAt: { gt: new Date() },
                    },
                    include: { user: true },
                });

                if (sessionExists && sessionExists.user) {
                    const user = sessionExists.user;

                    // Session refresh warning
                    const now = new Date();
                    const expiresAt = new Date(sessionExists.expiresAt);
                    const createdAt = new Date(sessionExists.createdAt);
                    const sessionLifeTime = expiresAt.getTime() - createdAt.getTime();
                    const timeRemaining = expiresAt.getTime() - now.getTime();
                    const percentRemaining = (timeRemaining / sessionLifeTime) * 100;

                    if (percentRemaining < 20) {
                        res.setHeader("X-Session-Refresh", "true");
                        res.setHeader("X-Session-Expires-At", expiresAt.toISOString());
                        res.setHeader("X-Time-Remaining", timeRemaining.toString());
                        console.log("Session Expiring Soon!!");
                    }

                    // User status চেক
                    if (user.status === UserStatus.BLOCKED || user.status === UserStatus.DELETED) {
                        throw new AppError(status.UNAUTHORIZED, "Unauthorized! User is not active.");
                    }
                    if (user.isDeleted) {
                        throw new AppError(status.UNAUTHORIZED, "Unauthorized! User is deleted.");
                    }

                    // Role চেক
                    if (authRoles.length > 0 && !authRoles.includes(user.role)) {
                        throw new AppError(status.FORBIDDEN, "Forbidden! You do not have permission.");
                    }

                    // ✅ req.user সেট এবং এখানেই শেষ
                    req.user = {
                        userId: user.id,
                        role: user.role,
                        email: user.email,
                    };

                    return next(); // Better Auth সফল — JWT চেক লাগবে না
                }
            }

            // ==========================================
            // পদ্ধতি ২: JWT Access Token (Fallback)
            // ==========================================
            const accessToken = CookieUtils.getCookie(req, "accessToken");

            if (!accessToken) {
                throw new AppError(
                    status.UNAUTHORIZED,
                    "Unauthorized! No session or access token provided."
                );
            }

            const verifiedToken = jwtUtils.verifyToken(accessToken, envVars.ACCESS_TOKEN_SECRET);

            if (!verifiedToken.success || !verifiedToken.data) {
                throw new AppError(status.UNAUTHORIZED, "Unauthorized! Invalid access token.");
            }

            // Role চেক
            if (authRoles.length > 0 && !authRoles.includes(verifiedToken.data.role as Role)) {
                throw new AppError(status.FORBIDDEN, "Forbidden! You do not have permission.");
            }

            // ✅ accessToken থেকেও req.user সেট
            req.user = {
                userId: verifiedToken.data.userId,
                role: verifiedToken.data.role,
                email: verifiedToken.data.email,
            };

            next();
        } catch (error: any) {
            next(error);
        }
    };