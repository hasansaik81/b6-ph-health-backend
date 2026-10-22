// import express, { Application, Request, Response } from 'express';
// import cors from 'cors';
// import IndexRoutes from './app/routes';
// import path from "path";
// import { envVars } from './app/config/env';
// import { auth } from './app/lib/auth';
// import { toNodeHandler } from "better-auth/node";
// import { globalErrorHandler } from './app/middleware/globalErrorHandler';
// import { notFound } from './app/middleware/notFound';
// import cookieParser from 'cookie-parser';

// const app: Application = express();

// // parsers
// app.set("vew engine","ejs");
// app.set("views",path.resolve(process.cwd(),`src/app/templates`))

// app.use(cors({
//   origin:[envVars.FRONTEND_URL,envVars.BETTER_AUTH_URL, "http://localhost:3000", "http://localhost:5000"],
//   credentials:true,
//   methods:["GET","POST","PUT","DELETE","PATCH"],
//   allowedHeaders:["content-Type","Authorization"]
// }))

// app.use("/api/auth",toNodeHandler(auth))
// // app.all("/api/v1/auth/*splat", toNodeHandler(auth));
// app.use(express.urlencoded({extended:true}))

// // Middleware to parse JSON bodies
// app.use(express.json());
// app.use(cookieParser())

// // application routes
// app.use('/api/v1', IndexRoutes);

// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello from Apollo Gears World!');    res.status(201).json({
//         success: true,
//         message: 'API is working',
//     })
// });

// app.use(globalErrorHandler)
// app.use(notFound)

// export default app;








import express, { Application, Request, Response } from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { toNodeHandler } from "better-auth/node";

import IndexRoutes from "./app/routes";
import { envVars } from "./app/config/env";
import { auth } from "./app/lib/auth";
import { globalErrorHandler } from "./app/middleware/globalErrorHandler";
import { notFound } from "./app/middleware/notFound";

const app: Application = express();

// EJS configuration
app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), "src/app/templates"));

// CORS
app.use(
  cors({
    origin: [
      envVars.FRONTEND_URL,
      envVars.BETTER_AUTH_URL,
      "http://localhost:3000",
      "http://localhost:5000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

// Better Auth handler — before application 404 middleware
// app.all("/api/v1/auth/*splat", toNodeHandler(auth));
app.use("/api/auth",toNodeHandler(auth))

// Application routes
app.use("/api/v1", IndexRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

// Error handlers — last
app.use(globalErrorHandler);
app.use(notFound);

export default app;

