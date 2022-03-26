import { Request, Response } from "express";
import { db } from "../utils/admin";
import { Bot } from "../models/bot";


export const getBots = async(req:Request,res:Response)=>{     
    try {
        const botsRef = db.collection('bots').where('status','==','available');
        const data = await botsRef.get();
        const bots:Array<Bot>=[];
        if(data.empty){
            res.status(404).send('No data found');
        }else{
            data.forEach(doc=>{
                const bot:Bot = {
                     id:doc.data().id,
                     location:doc.data().location,
                     status:doc.data().status,
                     zone_id:doc.data().zone_id   
                }
                bots.push(bot);
            });
                      
            res.status(200).send(bots);
        }

    } catch (error:any) {
        res.status(400).send(error.message)
    }
};

export const addBot = async (req:Request, res:Response) => {
    try {        
        const data = req.body;
        if(data){
            const docRef = db.collection('bots').doc();            
            const bot:Bot = {
                id:docRef.id,                
                ...data                
            };
            docRef.set(bot);
            res.status(201).send('Bot saved successfuly');   
        }else{
            res.status(404).send('Invalid data');
        }
        
           } catch (error:any) {
               res.status(400).send(error.message);
    }
};

export const getBot = async (req:Request, res:Response) => {
    try {
        const id = req.params.id;
        const botRef = await db.collection('bots').doc(id);
        const data = await botRef.get();
        if(!data.exists) {
            res.status(404).send('Bot with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error:any) {
        res.status(400).send(error.message);
    }
}

export const updateBot = async (req:Request, res:Response) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const botRef = db.collection('bots').doc(id);
        await botRef.update(data);
        res.send('Bot  updated successfuly');        
    } catch (error:any) {
        res.status(400).send(error.message);
    }
}