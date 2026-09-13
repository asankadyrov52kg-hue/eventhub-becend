import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignupDTO } from "./dto/signup.dto";
import { SigninDTO } from "./dto/signin.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('signup')
    signup(@Body() dto: SignupDTO) {
        return this.authService.signup(dto)
    }

    @Post('signin')
    signin(@Body() dto: SigninDTO) {
        console.log(dto)
        return this.authService.signin(dto)
    }


}