import { ConfigService } from "@nestjs/config"
import { TypeOrmModuleOptions } from "@nestjs/typeorm"
export const getTypeOrmConfig = (
    configService: ConfigService,
): TypeOrmModuleOptions => ({
    type: "postgres",
    host: configService.get<string>("DB_HOST"),
    port: configService.get<number>("DB_PORT"),
    username: configService.get<string>("DB_USERNAME"),
    password: configService.get<string>("DB_PASSWORD"),
    database: configService.get<string>("DB_DATABASE"),
    entities: [__dirname + '/../**/*.entity{.js,.ts}'],
    synchronize: Boolean(configService.get<string>("DB_SYNCHRONIZE")),
    extra: {
        createDatabase: true, 
    }
})