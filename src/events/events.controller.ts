import { 
  Controller, Post, Body, UseInterceptors, UploadedFile, 
  UseGuards, Req, Get, Query, Param, Patch, Delete 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { 
  ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, 
  ApiParam, ApiQuery, ApiResponse, ApiTags 
} from '@nestjs/swagger'; 
import { EventsService } from './events.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AccessTokenGuard } from 'src/auth/quard/acces-token.guard';
@ApiTags('Events (Мероприятия)') 
@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  @UseGuards(AccessTokenGuard) 
  @ApiBearerAuth('JWT-auth') 
  @ApiOperation({ summary: 'Создать новое мероприятие с изображением' })
  @ApiConsumes('multipart/form-data') 
  @ApiBody({
    description: 'Данные мероприятия и файл изображения',
    type: CreateEventDto,
  })
  @ApiResponse({ status: 201, description: 'Мероприятие успешно создано.' })
  @ApiResponse({ status: 400, description: 'Некорректные входные данные (ошибка валидации).' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован.' })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createEventDto: CreateEventDto, 
    @Req() req: any,
    @UploadedFile() file: any, 
  ) {
    const userId = req.user.id; 
    let imageUrl: string | null = null;

    if (file) {
      const cloudResponse = await this.cloudinaryService.uploadFile(file);
      imageUrl = cloudResponse.secure_url;
    }

    return this.eventsService.create(createEventDto, userId, imageUrl);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех мероприятий' })
  @ApiQuery({ 
    name: 'categoryId', 
    required: false, 
    description: 'UUID категории для фильтрации мероприятий' 
  })
  @ApiResponse({ status: 200, description: 'Список мероприятий успешно получен.' })
  async findAll(@Query('categoryId') categoryId?: string) {
    return await this.eventsService.findAll(categoryId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить детальную информацию о мероприятии по ID' })
  @ApiParam({ name: 'id', description: 'UUID мероприятия' })
  @ApiResponse({ status: 200, description: 'Мероприятие найдено.' })
  @ApiResponse({ status: 404, description: 'Мероприятие с таким ID не найдено.' })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id); 
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard) 
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Обновить данные мероприятия по ID' })
  @ApiParam({ name: 'id', description: 'UUID мероприятия' })
  @ApiResponse({ status: 200, description: 'Мероприятие успешно обновлено.' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован.' })
  @ApiResponse({ status: 404, description: 'Мероприятие не найдено.' })
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto); 
  }

  @Delete(':id')
  @UseGuards(AccessTokenGuard) 
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Удалить мероприятие по ID' })
  @ApiParam({ name: 'id', description: 'UUID мероприятия' })
  @ApiResponse({ status: 200, description: 'Мероприятие успешно удалено.' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован.' })
  @ApiResponse({ status: 404, description: 'Мероприятие не найдено.' })
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id); 
  }
}
