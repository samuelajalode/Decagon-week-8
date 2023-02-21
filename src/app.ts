import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import connectDatabase from './config/mongoDb';
dotenv.config()
connectDatabase();



const app = express();
app.get('/', (_req:Request, res:Response) => {
    res.json({message: 'Hello World'});
});
const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

