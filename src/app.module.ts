import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './confiq/typeorm.config';
import { RegistrationModule } from './registration/registration.module';

@Module({
  imports: [EventsModule, UsersModule, CategoriesModule, AuthModule,  ConfigModule.forRoot({
      isGlobal: true,
    }),TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig
    }), RegistrationModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
