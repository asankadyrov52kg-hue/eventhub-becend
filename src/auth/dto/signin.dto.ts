 import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; 

export class SigninDTO {
    @ApiProperty({ 
        example: 'Asa@mail.com', 
        description: 'Электронная почта зарегистрированного пользователя' 
    })
    @IsEmail({}, { message: 'Введите корректный email адрес' })
    @IsNotEmpty({ message: 'Поле email обязательно для заполнения' })
    @IsString({ message: 'email должен быть строкой' })
    email!: string;
    
    @ApiProperty({ 
        example: 'password123', 
        description: 'Пароль от аккаунта (минимум 8 символов)' 
    })
    @IsNotEmpty({ message: 'Поле пароль обязательно для заполнения' })
    @IsString({ message: 'Пароль должен быть строкой' })
    password!: string;
}
