import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignupDto } from 'src/users/dto/signup.dto';
import { User as UserEntity } from 'src/users/entity/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeederService {
    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>){}

    user : SignupDto = {
        email: "ken@gmail.com",
        password: "ken5050505"
    }


    async signup() {
        const user = this.userRepository.create(this.user) 
        if(user) {
            await this.userRepository.save(user)
            console.log(`User ${user} added.`);
        }
    }


}
