import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Импортируем декоратор Swagger

export class CreateRegistrationDto {
  @ApiProperty({ 
    example: 'c9ac8142-36bf-4d6c-b030-0fe25f7506ce', 
    description: 'UUID мероприятия, на которое регистрируется пользователь' 
  })
  @IsUUID('4', { message: 'Некорректный ID мероприятия (должен быть UUID)' })
  @IsNotEmpty({ message: 'ID мероприятия обязательно для заполнения' })
  eventId!: string;
}
