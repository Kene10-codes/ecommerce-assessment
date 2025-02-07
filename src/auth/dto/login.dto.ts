import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

// signup dto
export class LoginDto {
    @ApiProperty({ example: "john@gmail.com", description: "Enter your email" })
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @ApiProperty({ example: "Strong Password only", description: "Enter your password" })
    @IsNotEmpty()
    password: string;
}