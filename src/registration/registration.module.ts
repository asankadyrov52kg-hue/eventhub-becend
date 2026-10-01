import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationsController } from './registration.controller';
import { RegistrationsService } from './registration.service';
import { Registration } from './entities/registration.entity';
import { EventsModule } from '../events/events.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Registration]),
    forwardRef(() => EventsModule),
  ],
  controllers: [RegistrationsController],
  providers: [RegistrationsService],
  exports: [RegistrationsService],
})
export class RegistrationsModule {}

