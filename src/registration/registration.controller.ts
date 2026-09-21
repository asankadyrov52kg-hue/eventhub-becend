import { Controller, Post, Get, Body, UseGuards, Req, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { 
  ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags 
} from '@nestjs/swagger'; 
import { RegistrationsService } from './registration.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { AccessTokenGuard } from 'src/auth/quard/acces-token.guard';

@ApiTags('Registrations (Регистрации на мероприятия)') 
@ApiBearerAuth('JWT-auth') 
@Controller('registrations')
@UseGuards(AccessTokenGuard) 
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Зарегистрироваться на мероприятие (купить билет/забронировать место)' })
  @ApiResponse({ status: 201, description: 'Пользователь успешно зарегистрирован на мероприятие.' })
  @ApiResponse({ status: 400, description: 'Ошибка валидации или мест больше нет (билеты закончились).' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован.' })
  async create(@Req() req: any, @Body() dto: CreateRegistrationDto) {
    const userId = req.user.id; 
    return this.registrationsService.create(userId, dto);
  }

  @Get('my')
  @ApiOperation({ summary: 'Получить список всех мероприятий, на которые записан текущий пользователь' })
  @ApiResponse({ status: 200, description: 'Список ваших регистраций успешно получен.' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован.' })
  async getMyRegistrations(@Req() req: any) {
    const userId = req.user.id;
    return this.registrationsService.findByUserId(userId);
  }

  @Get('check')
  @ApiOperation({ summary: 'Проверить, зарегистрирован ли текущий пользователь на конкретное мероприятие' })
  @ApiQuery({ 
    name: 'eventId', 
    description: 'UUID интересующего мероприятия', 
    example: 'c9ac8142-36bf-4d6c-b030-0fe25f7506ce' 
  })
  @ApiResponse({ status: 200, description: 'Проверка успешно пройдена (возвращает true или false).' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован.' })
  async checkRegistration(@Req() req: any, @Query('eventId') eventId: string) {
    const userId = req.user.id;
    const isRegistered = await this.registrationsService.checkExists(userId, eventId);
    return { isRegistered };
  }
}
