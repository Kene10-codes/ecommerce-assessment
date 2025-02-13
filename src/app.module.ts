import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDotenv } from 'dotenv';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { dataSourceOptions } from './typeorm.config';
import { SeederModule } from './seeders/seeder.module';

configDotenv()

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    AuthModule,
    MailModule,
    SeederModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
