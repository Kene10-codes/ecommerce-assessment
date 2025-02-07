import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from 'src/users/entity/User.entity';
import { Repository } from 'typeorm';
import { LoginDto } from '../dto/login.dto';
import { comparePassword } from 'src/util/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService) { }

    // generate refresh token
    generateAccessToken = (payload: any) => {
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '20m'
        })
    }

    async validateUser({ email, password }: LoginDto) {
        try {
            // check if credentials exists
            const user = await this.userRepository.findOneBy({ email })
            if (!user) {
                throw new HttpException("Invalid credentials", HttpStatus.BAD_REQUEST)
            }
            // compare password
            const verifiedUser = comparePassword(password, user.password)
            if (!verifiedUser) {
                throw new HttpException("Invalid credentials", HttpStatus.BAD_REQUEST)
            }
            // generate token
            const token = this.generateAccessToken({ user })
            return { access_token: token }
        } catch (error) {
            throw new HttpException("User was not logged in successfully", HttpStatus.BAD_GATEWAY)
        }
    }
}
