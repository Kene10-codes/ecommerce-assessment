import { DataSource } from 'typeorm';
import { configDotenv } from 'dotenv';
import { User } from './users/entity/User.entity';



configDotenv()

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  autoLoadEntities: true, 
  synchronize: true,
  entities: [User]
  migrations: ['dist/migrations/*.js'],
  migrationsTableName: 'migrations'
});
export default dataSource;