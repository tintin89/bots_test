import express, { Router } from "express";
import {getDeliveries} from '../controllers/delivery';

const deliveryRouter:Router = express.Router();


deliveryRouter.get('/deliveries',getDeliveries);



export default deliveryRouter;