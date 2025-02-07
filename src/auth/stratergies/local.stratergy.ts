import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../service/auth.service";



@Injectable()
export class LocalStratergy extends PassportStrategy(Strategy) {
    constructor(@Inject(AuthService) private readonly authService: AuthService) {
        super({
            "usernameField": "email"
        })
    }
    async validate(email: string, password: string) {
        const user = this.authService.validateUser({ email, password })
        if (user) return user
    }

}