import { NextFunction, Request, Response } from "express";
import z from "zod";

export const validateRequest = (zodSchema: z.ZodObject) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if(req.body.data){
            req.body = JSON.parse(req.body.data)
        }

        const parsedResult = zodSchema.safeParse(req.body)

        if (!parsedResult.success) {
            next(parsedResult.error)
        }

        //sanitizing the data
        req.body = parsedResult.data;

        next();
    }
}





// import { NextFunction, Request, Response } from "express";
// import { z } from "zod";

// export const validateRequest = (schema: z.ZodTypeAny) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       if (req.body && typeof req.body.data === "string") {
//         try {
//           req.body = JSON.parse(req.body.data);
//         } catch (e) {}
//       }

//       await schema.parseAsync({
//         body: req.body || {},
//         query: req.query,
//         params: req.params,
//       });
//       return next();
//     } catch (error) {
//       next(error);
//     }
//   };
// };