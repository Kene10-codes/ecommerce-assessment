import { DataSource, DataSourceOptions } from "typeorm";
import { configDotenv } from "dotenv";
import { User } from "./users/entity/User.entity";

configDotenv()

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 14369,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    entities: [User],
    migrations: ['src/database/migrations/*-migration.ts'],
    logging: true,
    ssl: {
        rejectUnauthorized: false,
    }
};

export const AppDataSource = new DataSource(dataSourceOptions)