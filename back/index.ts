import express, { Application, Request, Response } from "express";
import dotenv from 'dotenv';
import deliveryRouter from './src/routes/delivery';
import botRouter from "./src/routes/bot";
import cors from 'cors';

dotenv.config();

const app: Application = express();
const port = process.env.PORT;

//Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/',deliveryRouter);
app.use('/',botRouter);


//Main route
app.get(
    "/",
    async (req: Request, res: Response): Promise<Response> => {
        return res.send('API Bots and Deliveries');
    }
);


try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error:any) {
    console.error(`Error occured: ${error.message}`);
}


