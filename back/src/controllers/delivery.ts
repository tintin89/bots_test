import { Request, Response } from "express";
import { db } from "../utils/admin";

import Delivery from "../models/delivery";




export const getDeliveries = async(req:Request,res:Response)=>{       
    const orderBy = req.query.orderBy === "desc" ? "desc": "asc"
    try {
        const deliveriesRef = db.collection('deliveries').orderBy('creation_date',orderBy);
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
            const deliveriesFiltered:Array<Delivery> = (req.query.filterBy && req.query.filterBy!=="all") ? 
            deliveries.filter(d=>d.state===req.query.filterBy) : deliveries;            
            res.status(200).send(deliveriesFiltered);
        }

    } catch (error:any) {
        res.status(400).send(error.message)
    }
};

export const addDelivery = async (req:Request, res:Response) => {
    try {        
        const data = req.body;
        if(data){
            const docRef = db.collection('deliveries').doc();            
            const delivery:Delivery = {
                id:docRef.id,
                creation_date:new Date(),
                ...data                
            };
            docRef.set(delivery);

            res.status(201).send('Delivery saved successfuly');   
        }else{
            res.status(404).send('Invalid data');
        }
        
           } catch (error:any) {
               res.status(400).send(error.message);
    }
};

export const getDelivery = async (req:Request, res:Response) => {
    try {
        const id = req.params.id;
        const delivery = await db.collection('deliveries').doc(id);
        const data = await delivery.get();
        if(!data.exists) {
            res.status(404).send('Delivery with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error:any) {
        res.status(400).send(error.message);
    }
}

export const updateDelivery = async (req:Request, res:Response) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const delivery = db.collection('deliveries').doc(id);
        await delivery.update(data);
        res.send('Delivery  updated successfuly');        
    } catch (error:any) {
        res.status(400).send(error.message);
    }
}