import express, { Router } from "express";
import {getDeliveries,addDelivery,getDelivery,updateDelivery} from '../controllers/delivery';

const deliveryRouter:Router = express.Router();


deliveryRouter.get('/deliveries',getDeliveries);
deliveryRouter.post('/deliveries',addDelivery);
deliveryRouter.get('/deliveries/:id',getDelivery);
deliveryRouter.patch('/deliveries/:id',updateDelivery);



export default deliveryRouter;