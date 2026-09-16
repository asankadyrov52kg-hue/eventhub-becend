import { Controller, Post, Get, Body, UseGuards, Req, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { RegistrationsService } from './registration.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { AccessTokenGuard } from 'src/auth/quard/acces-token.guard';

@Controller('registrations')
@UseGuards(AccessTokenGuard) 
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Req() req: any, @Body() dto: CreateRegistrationDto) {
    const userId = req.user.id; 
    return this.registrationsService.create(userId, dto);
  }

  @Get('my')
  async getMyRegistrations(@Req() req: any) {
    const userId = req.user.id;
    return this.registrationsService.findByUserId(userId);
  }

  @Get('check')
  async checkRegistration(@Req() req: any, @Query('eventId') eventId: string) {
    const userId = req.user.id;
    const isRegistered = await this.registrationsService.checkExists(userId, eventId);
    return { isRegistered };
  }
}
