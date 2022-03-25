import { Request, Response } from "express";
import { db } from "../utils/admin";
import Delivery from "../models/delivery";


export const getDeliveries = async(req:Request,res:Response)=>{
    try {
        const deliveriesRef = db.collection('deliveries');
        const data = await deliveriesRef.get();
        const deliveries:Array<Delivery>=[];
        if(data.empty){
            res.status(404).send('No data found');
        }else{
            data.forEach(doc=>{
                const delivery:Delivery = {
                    id:doc.data().id,
                    creation_date:doc.data().creation_date,
                    dropoff:doc.data().dropoff,
                    pickup:doc.data().pickup,
                    state:doc.data().state,
                    zone_id:doc.data().zone_id
                }
                deliveries.push(delivery);
            });
            res.status(200).send(deliveries);
        }

    } catch (error:any) {
        res.status(400).send(error.message)
    }
}