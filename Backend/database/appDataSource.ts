import { DataSource } from "typeorm";
import { Store } from "../src/entity/Store";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: 'database/app.sqlite',
    entities: [Store],
    subscribers: [],
    migrations: [],
    synchronize: true,
    logging: true,
})