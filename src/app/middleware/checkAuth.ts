// import { NextFunction, Request, Response } from "express";
// import { Role, UserStatus } from "../../generated/prisma/enums";
// import { CookieUtils } from "../utils/cookies";
// import { prisma } from "../lib/prisma";
// import AppError from "../errorHelper/AppError";
// import status from "http-status";
// import { jwtUtils } from "../utils/jwt";
// import { envVars } from "../config/env";

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



// chat gpt code 





// import { NextFunction, Request, Response } from "express";
// import status from "http-status";
// import { Role, UserStatus } from "../../generated/prisma/enums";
// import { envVars } from "../config/env";
// import { prisma } from "../lib/prisma";
// import { jwtUtils } from "../utils/jwt";
// import { CookieUtils } from "../utils/cookies";
// import AppError from "../errorHelper/AppError";

// export const checkAuth =
//   (...authRoles: Role[]) =>
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       // 1. Better Auth session token
//       const sessionToken = CookieUtils.getCookie(
//         req,
//         "better-auth.session_token"
//       );

//       if (!sessionToken) {
//         throw new AppError(
//           status.UNAUTHORIZED,
//           "Session token not found. Please log in again."
//         );
//       }

//       // 2. Verify session in database
//       const sessionExists = await prisma.session.findFirst({
//         where: {
//           token: sessionToken,
//           expiresAt: {
//             gt: new Date(),
//           },
//         },
//         include: {
//           user: true,
//         },
//       });

//       // BUG FIX: Never call next() without an authenticated user
//       if (!sessionExists?.user) {
//         throw new AppError(
//           status.UNAUTHORIZED,
//           "Invalid or expired session. Please log in again."
//         );
//       }

//       const user = sessionExists.user;

//       // 3. Check user status
//       if (
//         user.status === UserStatus.BLOCKED ||
//         user.status === UserStatus.DELETED
//       ) {
//         throw new AppError(
//           status.UNAUTHORIZED,
//           "User account is not active."
//         );
//       }

//       if (user.isDeleted) {
//         throw new AppError(
//           status.UNAUTHORIZED,
//           "User account has been deleted."
//         );
//       }

//       // 4. Check role from database
//       if (authRoles.length > 0 && !authRoles.includes(user.role)) {
//         throw new AppError(
//           status.FORBIDDEN,
//           "You do not have permission to access this resource."
//         );
//       }

//       // 5. Verify access token
//       const accessToken = CookieUtils.getCookie(req, "accessToken");

//       if (!accessToken) {
//         throw new AppError(
//           status.UNAUTHORIZED,
//           "Access token not found. Please log in again."
//         );
//       }

//       const verifiedToken = jwtUtils.verifyToken(
//         accessToken,
//         envVars.ACCESS_TOKEN_SECRET
//       );

//       if (!verifiedToken.success || !verifiedToken.data) {
//         throw new AppError(
//           status.UNAUTHORIZED,
//           "Invalid or expired access token."
//         );
//       }

//       // 6. Ensure the JWT belongs to the same user as the session
//       if (
//         verifiedToken.data.email !== user.email ||
//         verifiedToken.data.role !== user.role
//       ) {
//         throw new AppError(
//           status.UNAUTHORIZED,
//           "Session and access token do not match."
//         );
//       }

//       // 7. Set req.user before calling next()
//       req.user = {
//         userId: user.id,
//         role: user.role,
//         email: user.email,
//       };

//       console.log("Authenticated user:", req.user);

//       // 8. Continue only after successful authentication
//       return next();
//     } catch (error) {
//       return next(error);
//     }
//   };




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



// deep seek ai 


// import { NextFunction, Request, Response } from "express";
// import status from "http-status";
// import { Role, UserStatus } from "../../generated/prisma/enums";
// import { envVars } from "../config/env";
// import { prisma } from "../lib/prisma";
// import { jwtUtils } from "../utils/jwt";
// import { CookieUtils } from "../utils/cookies";
// import AppError from "../errorHelper/AppError";

// export const checkAuth = (...authRoles: Role[]) =>
//     async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             // ==========================================
//             // 1. Session Token ভেরিফিকেশন (Better Auth)
//             // ==========================================
//             const sessionToken = CookieUtils.getCookie(req, "better-auth.session_token");

//             if (sessionToken) {
//                 const sessionExists = await prisma.session.findFirst({
//                     where: {
//                         token: sessionToken,
//                         expiresAt: { gt: new Date() },
//                     },
//                     include: { user: true },
//                 });

//                 if (sessionExists && sessionExists.user) {
//                     const user = sessionExists.user;

//                     // Session refresh warning
//                     const now = new Date();
//                     const expiresAt = new Date(sessionExists.expiresAt);
//                     const createdAt = new Date(sessionExists.createdAt);
//                     const sessionLifeTime = expiresAt.getTime() - createdAt.getTime();
//                     const timeRemaining = expiresAt.getTime() - now.getTime();
//                     const percentRemaining = (timeRemaining / sessionLifeTime) * 100;

//                     if (percentRemaining < 20) {
//                         res.setHeader("X-Session-Refresh", "true");
//                         res.setHeader("X-Session-Expires-At", expiresAt.toISOString());
//                         res.setHeader("X-Time-Remaining", timeRemaining.toString());
//                         console.log("Session Expiring Soon!!");
//                     }

//                     // User status চেক
//                     if (user.status === UserStatus.BLOCKED || user.status === UserStatus.DELETED) {
//                         throw new AppError(status.UNAUTHORIZED, "Unauthorized access! User is not active.");
//                     }
//                     if (user.isDeleted) {
//                         throw new AppError(status.UNAUTHORIZED, "Unauthorized access! User is deleted.");
//                     }

//                     // Role চেক
//                     if (authRoles.length > 0 && !authRoles.includes(user.role)) {
//                         throw new AppError(status.FORBIDDEN, "Forbidden access! You do not have permission.");
//                     }

//                     // ✅ req.user সেট
//                     req.user = {
//                         userId: user.id,
//                         role: user.role,
//                         email: user.email,
//                     };

//                     return next(); // session দিয়ে auth সম্পন্ন
//                 }
//             }

//             // ==========================================
//             // 2. Fallback: Access Token ভেরিফিকেশন
//             // ==========================================
//             const accessToken = CookieUtils.getCookie(req, "accessToken");

//             if (!accessToken) {
//                 throw new AppError(status.UNAUTHORIZED, "Unauthorized access! No session or access token provided.");
//             }

//             const verifiedToken = jwtUtils.verifyToken(accessToken, envVars.ACCESS_TOKEN_SECRET);

//             if (!verifiedToken.success || !verifiedToken.data) {
//                 throw new AppError(status.UNAUTHORIZED, "Unauthorized access! Invalid access token.");
//             }

//             // Role চেক
//             if (authRoles.length > 0 && !authRoles.includes(verifiedToken.data.role as Role)) {
//                 throw new AppError(status.FORBIDDEN, "Forbidden access! You do not have permission.");
//             }

//             // ✅ accessToken থেকে req.user সেট
//             req.user = {
//                 userId: verifiedToken.data.userId,
//                 role: verifiedToken.data.role,
//                 email: verifiedToken.data.email,
//             };

//             next();
//         } catch (error: any) {
//             next(error);
//         }
//     };





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