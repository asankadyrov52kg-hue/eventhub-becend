import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ 
    example: 'Выставки', 
    description: 'Уникальное название категории мероприятий' 
  })
  @IsString({ message: 'Название категории должно быть строкой' })
  @IsNotEmpty({ message: 'Название категории не может быть пустым' })
  @Length(2, 30, { message: 'Название должно содержать от 2 до 30 символов' })
  name!: string;
}

