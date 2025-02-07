import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { SignupDto } from '../dto/signup.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(@Inject(UsersService) private readonly userService: UsersService) { }


    @ApiOperation({ summary: 'Signs up' })
    @ApiResponse({ status: 201, description: 'Signs up user' })
    @Post('/signup')
    async signupUser(@Body() { email, password }: SignupDto) {
        return this.userService.signup({ email, password })
    }
}
