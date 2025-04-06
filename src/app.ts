import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';

import userRoutes from './routes/userRoutes';
import clanRoutes from './routes/clanRouter';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api/clans', clanRoutes);
app.use('/api/users', userRoutes);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
