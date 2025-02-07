import { HttpException, HttpStatus, Inject, Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from '../entity/User.entity';
import { Repository } from 'typeorm';
import { SignupDto } from '../dto/signup.dto';
import { hashPassword } from '../../util/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/service/mail.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService,
        @Inject(MailService) private readonly mailService: MailService
    ) { }


    // generate refresh token
    generateAccessToken = (payload: any) => {
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '20m'
        })
    }

    async signup({ email, password }: SignupDto) {
        // create new user
        const user = this.userRepository.create({ email, password })
        try {
            let userExists = await this.userRepository.findOneBy({ email })
            // check if user exists already or not
            if (userExists) throw new HttpException("User exists already", HttpStatus.BAD_GATEWAY)
            // hash password
            user.password = hashPassword(password)

            // generate token
            const token = this.generateAccessToken({ user })

            // save user in the database
            await this.userRepository.save(user)


            // send email
            await this.mailService.sendEmail(user.email, 'Thanks for signing up', "You are the best!")

            // return token
            return { access_token: token }
        } catch (error) {
            throw new HttpException("User was not created successfully", HttpStatus.BAD_GATEWAY)
        }

    }
}
