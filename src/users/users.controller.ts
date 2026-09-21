import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { 
  ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags 
} from '@nestjs/swagger'; // Импортируем декораторы Swagger
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users (Пользователи)') // Группировка в Swagger UI
@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Административное создание нового пользователя' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Пользователь успешно создан.' })
  @ApiResponse({ status: 400, description: 'Ошибка валидации входных данных.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех пользователей' })
  @ApiResponse({ status: 200, description: 'Список пользователей успешно получен.' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить информацию о пользователе по ID' })
  @ApiParam({ name: 'id', description: 'UUID пользователя', example: '39d274e4-e3b8-4a1f-a717-a16df5ca8fe8' })
  @ApiResponse({ status: 200, description: 'Пользователь найден.' })
  @ApiResponse({ status: 404, description: 'Пользователь с таким ID не найден.' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить данные пользователя по ID' })
  @ApiParam({ name: 'id', description: 'UUID пользователя', example: '39d274e4-e3b8-4a1f-a717-a16df5ca8fe8' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Данные пользователя успешно обновлены.' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден.' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить пользователя по ID' })
  @ApiParam({ name: 'id', description: 'UUID пользователя', example: '39d274e4-e3b8-4a1f-a717-a16df5ca8fe8' })
  @ApiResponse({ status: 200, description: 'Пользователь успешно удален.' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден.' })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
