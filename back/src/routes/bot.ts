import express, { Router } from "express";
import {addBot,getBot,getBots,updateBot} from '../controllers/bot';

const botRouter:Router = express.Router();


botRouter.get('/bots',getBots);
botRouter.post('/bots',addBot);
botRouter.get('/bots/:id',getBot);
botRouter.patch('/bots/:id',updateBot);



export default botRouter;