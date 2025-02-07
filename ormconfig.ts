import { DataSource } from 'typeorm';
import { configDotenv } from 'dotenv';
import { User } from './src/users/entity/User.entity';



configDotenv()

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 14369,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  entities: [User],
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'migrations',
  ssl: {
    rejectUnauthorized: false,
  },
});
export default dataSource;