import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('Categories (Категории мероприятий)') 
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Получить список всех категорий' })
  @ApiResponse({ 
    status: 200, 
    description: 'Список категорий успешно получен (отсортирован по алфавиту).' 
  })
  async findAll() {
    return await this.categoriesService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Создать новую категорию' })
  @ApiResponse({ status: 201, description: 'Категория успешно создана.' })
  @ApiResponse({ status: 400, description: 'Ошибка валидации (например, имя слишком короткое или пустое).' })
  async create(@Body() createCategoryDto: CreateCategoryDto) { 
    return await this.categoriesService.create(createCategoryDto.name);
  }
}
