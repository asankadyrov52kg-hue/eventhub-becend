import { IsString, IsNotEmpty, IsOptional, IsInt, Min, IsDateString, IsUUID } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty({ message: 'Название мероприятия не может быть пустым' })
  title!: string;

  @IsString()
  @IsNotEmpty({ message: 'Описание не может быть пустым' })
  description!: string;

  @IsDateString({}, { message: 'Некорректный формат даты' })
  date!: string; 

  @IsString()
  @IsNotEmpty({ message: 'Адрес не может быть пустым' })
  address!: string;

  @IsInt()
  @Min(0, { message: 'Цена не может быть отрицательной' })
  @IsOptional() 
  price?: number;

  @IsInt({ message: 'Вместимость должна быть целым числом' })
  @Min(1, { message: 'Вместимость должна быть минимум 1 человек' })
  capacity!: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsUUID('4', { message: 'Некорректный ID категории' })
  @IsNotEmpty({ message: 'Категория обязательна' })
  categoryId!: string;
}

