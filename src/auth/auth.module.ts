import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entity/User.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStratergy } from './stratergies/local.stratergy';
import { JWTStratergy } from './stratergies/jwt.stratergy';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '20m' }
    })],
  providers: [AuthService, LocalStratergy, JWTStratergy],
  controllers: [AuthController]
})
export class AuthModule { }
