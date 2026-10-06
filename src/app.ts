import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import IndexRoutes from './app/routes';

const app: Application = express();

// parsers
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', IndexRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Apollo Gears World!');
});

export default app;
