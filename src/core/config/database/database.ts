import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';

const ENTITY_BASE_PATH = 'src/modules';

const databaseConfig: DataSourceOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    entities: [
        `${ENTITY_BASE_PATH}/**/*.entity{.ts,.js}`
    ],
    migrations: [
        "src/core/config/migrations/*.ts"
    ],
    synchronize: false,
    dropSchema: false,
    migrationsRun: false,
    logging: false,
};

export default databaseConfig;