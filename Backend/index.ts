import "reflect-metadata";
import express from "express";
import cors from "cors";
import * as StoreController from "./src/api/StoreController";
import { AppDataSource } from "./database/appDataSource";

const PORT = 3000;
const createConnection = AppDataSource;

async function startup() {
    await createConnection.initialize();
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.post('/store', StoreController.save);
    app.get('/store', StoreController.getAll);

    app.listen(PORT, () => {
        console.log(`APP rodando em https://localhost:${PORT}`);
    })
}

startup();