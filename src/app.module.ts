import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configDotenv } from 'dotenv';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import dataSource from 'ormconfig';


configDotenv()

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSource.options),
    UsersModule,
    AuthModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
