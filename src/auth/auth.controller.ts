import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"; // Импортируем декораторы Swagger
import { AuthService } from "./auth.service";
import { SignupDTO } from "./dto/signup.dto";
import { SigninDTO } from "./dto/signin.dto";

@ApiTags('Auth (Авторизация)') 
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('signup')
    @ApiOperation({ summary: 'Регистрация нового пользователя' })
    @ApiResponse({ status: 201, description: 'Пользователь успешно зарегистрирован, токены выданы.' })
    @ApiResponse({ status: 400, description: 'Ошибка валидации входных данных (например, пароль слишком короткий).' })
    signup(@Body() dto: SignupDTO) {
        return this.authService.signup(dto)
    }

    @Post('signin')
    @ApiOperation({ summary: 'Авторизация (вход) пользователя' })
    @ApiResponse({ status: 200, description: 'Успешный вход, возвращены accessToken и refreshToken.' })
    @ApiResponse({ status: 400, description: 'Некорректный формат email или пароля.' })
    @ApiResponse({ status: 401, description: 'Неверный email или пароль.' })
    signin(@Body() dto: SigninDTO) {
        console.log(dto)
        return this.authService.signin(dto)
    }
}
