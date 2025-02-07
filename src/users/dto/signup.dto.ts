import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

// signup dto
export class SignupDto {
    @ApiProperty({ example: "john@gmail.com" , description: "Enter your email" })
    @IsNotEmpty()
    @IsEmail()
    email:  string;
    @ApiProperty({ example: "Strong Password" , description: "Enter your password" })
    @IsNotEmpty()
    @Exclude()
    password: string;
}