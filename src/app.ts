import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import IndexRoutes from './app/routes';
import path from "path";
import { envVars } from './app/config/env';
import { auth } from './app/lib/auth';
import { toNodeHandler } from "better-auth/node";
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import { notFound } from './app/middleware/notFound';

const app: Application = express();

// parsers
app.set("vew engine","ejs");
app.set("views",path.resolve(process.cwd(),`src/app/templates`))

app.use(cors({
  origin:[envVars.FRONTEND_URL,envVars.BETTER_AUTH_URL,"http://localhost:5000"],
  credentials:true,
  methods:["GET","POST","PUT","DELETE","PATCH"],
  allowedHeaders:["content-Type","Authorization"]
}))

app.use("/api/auth",toNodeHandler(auth))
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', IndexRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Apollo Gears World!');    res.status(201).json({
        success: true,
        message: 'API is working',
    })
});

app.use(globalErrorHandler)
app.use(notFound)

export default app;
