import { IsNotEmpty, IsString, IsInt, Min, IsOptional, IsUUID, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger'; 

export class CreateEventDto {
  @ApiProperty({ 
    example: 'Рок-фестиваль "Живой Звук"', 
    description: 'Название проводимого мероприятия' 
  })
  @IsString({ message: 'Название мероприятия должно быть строкой' })
  @IsNotEmpty({ message: 'Название мероприятия не может быть пустым' })
  title!: string;

  @ApiProperty({ 
    example: 'Большой концерт с участием местных рок-групп. Живой звук и мощное световое шоу.', 
    description: 'Детальное описание мероприятия' 
  })
  @IsString({ message: 'Описание должно быть строкой' })
  @IsNotEmpty({ message: 'Описание не может быть пустым' })
  description!: string;

  @ApiProperty({ 
    example: '2026-10-25T18:00:00.000Z', 
    description: 'Дата и время проведения в формате ISO 8601' 
  })
  @Type(() => Date)
  @IsDate({ message: 'Некорректный формат даты и времени' })
  @IsNotEmpty({ message: 'Дата обязательна для заполнения' })
  date!: Date; 

  @ApiProperty({ 
    example: 'г. Бишкек, ул. Чуй 123', 
    description: 'Физический адрес проведения мероприятия' 
  })
  @IsString({ message: 'Адрес должен быть строкой' })
  @IsNotEmpty({ message: 'Адрес не может быть пустым' })
  address!: string;

  @ApiProperty({ 
    example: 300, 
    description: 'Стоимость входного билета. Если мероприятие бесплатное, укажите 0.', 
    required: false,
    default: 0
  })
  @Type(() => Number)
  @IsInt({ message: 'Цена должна быть целым числом' })
  @Min(0, { message: 'Цена не может быть отрицательной' })
  @IsOptional() 
  price?: number;

  @ApiProperty({ 
    example: 100, 
    description: 'Максимальное количество участников (вместимость площадки)' 
  })
  @Type(() => Number)
  @IsInt({ message: 'Вместимость должна быть целым числом' })
  @Min(1, { message: 'Вместимость должна быть минимум 1 человек' })
  capacity!: number;

  @ApiProperty({ 
    type: 'string', 
    format: 'binary',
    description: 'Файл изображения для афиши мероприятия (.jpg, .png)', 
    required: false 
  })
  @IsOptional()
  image?: any; 

  @ApiProperty({ 
    example: '9a2494c4-2392-49de-893b-f46ed410e0b1', 
    description: 'UUID существующей категории из базы данных' 
  })
  @IsUUID('4', { message: 'Некорректный ID категории' })
  @IsNotEmpty({ message: 'Категория обязательна' })
  categoryId!: string;
}
