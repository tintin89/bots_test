import express, { Application, Request, Response } from "express";
import {getDeliveries} from './src/controllers/delivery';
import dotenv from 'dotenv';
import deliveryRouter from './src/routes/delivery';
import cors from 'cors';

dotenv.config();

const app: Application = express();
const port = process.env.PORT;

//Middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/',deliveryRouter)


//Main route
app.get(
    "/",
    async (req: Request, res: Response): Promise<Response> => {
        return res.send('API bots and deliveries');
    }
);


try {
    app.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error:any) {
    console.error(`Error occured: ${error.message}`);
}

