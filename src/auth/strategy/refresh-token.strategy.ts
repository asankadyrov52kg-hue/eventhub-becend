import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
            secretOrKey: configService.get<string>('JWT_REFRESH_SECRET') || 'JWT_REFRESH_SECRET',
            passReqToCallback: true
        })
    }

    validate(req: Request, payload: any) {
        const refresh_token = req.body.refresh_token
        if (!refresh_token) throw new ForbiddenException('Необходим refresh_token')
        return { ...payload, refresh_token }
    }
}