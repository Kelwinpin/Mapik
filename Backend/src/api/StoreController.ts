import { Request, Response } from "express"
import { Store } from "../entity/Store";
import { AppDataSource } from "../../database/appDataSource";

const storeRepository = AppDataSource.getRepository(Store);

export async function save(req: Request, res: Response) {

    const savedStore = await storeRepository.manager.save(Store, req.body);
    
    return res.status(200).json(savedStore);
}

export async function getAll(req: Request, res: Response) {

    const allStories = await storeRepository.manager.find(Store);
    
    return res.status(200).json(allStories);
}