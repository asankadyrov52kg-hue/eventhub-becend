import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { SignupDTO } from "./dto/signup.dto";
import * as bcrypt from "bcrypt"
import { SigninDTO } from "./dto/signin.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async signup(dto: SignupDTO) {
        const password_hash = await bcrypt.hash(dto.password, 10)
        const createdUser = await this.userService.create({...dto, password_hash})
        
        const tokens = await this.getTokens(createdUser.id, createdUser.email)

        await this.updateRefreshToken(createdUser.id, tokens.refreshToken)

        return tokens
    }

    async signin(dto: SigninDTO) {
        const existUser = await this.userService.findUserByEmail(dto.email)
        console.log("TEST", existUser)
        if (!existUser) throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND)
        
        const passwordMatches = await bcrypt.compare(dto.password, existUser.password_hash)
        console.log("TEST2", passwordMatches)
        if (!passwordMatches) throw new HttpException("Неверный пароль", HttpStatus.UNAUTHORIZED)

        const tokens = await this.getTokens(existUser.id, existUser.email)
        console.log("TEST3", tokens)

        await this.updateRefreshToken(existUser.id, tokens.refreshToken)

        return tokens
    }

    async logout(userId: string) {
        await this.updateRefreshToken(userId)
    }

    async updateRefreshToken(userId: string, refresh_token?: string) {
        const token =  refresh_token ? await bcrypt.hash(refresh_token, 10) : undefined
        console.log("Test5", token)
        await this.userService.updateRefreshToken(userId, token)
    }

    async getTokens(userId: string, email: string) {
        const jwtPayload = { sub: userId, email }

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: "SDFerwfcw@3423WFw3ghbo!",
                expiresIn: '15m'
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: "KJGNSkcdvhsSDHnsdv@123!",
                expiresIn: '7d'
            })
        ])

        return { accessToken, refreshToken }
    }
}


