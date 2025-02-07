import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { LocalGuard } from '../guard/local-guard/local-guard.guard';
import { JWTGuard } from '../guard/jwt-guard/jwt-guard.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    // login controller
    @ApiOperation({ summary: 'Logs in user' })
    @ApiResponse({ status: 201, description: 'Logs in user' })
    @Post('login')
    @UseGuards(LocalGuard)
    login(@Req() req: Request) {
        return req.user
    }


    // get user info/email
    @ApiOperation({ summary: 'Get user info/email' })
    @ApiResponse({ status: 201, description: 'Gets users info/email' })
    @Get('status')
    @UseGuards(JWTGuard)
    getProfile(@Req() req: Request) {
        return req.user
    }
}
