
import { IsNotEmpty, IsString, Length, IsEmail } from "class-validator"

export class SignupDTO {
    @IsEmail({}, { message: 'Введите корректный email адрес (например, user@mail.com)' })
    @IsString({ message: 'Email должен быть строкой' })
    @IsNotEmpty({ message: 'Поле email обязательно для заполнения' })
    @Length(2, 30, { message: 'Email должен содержать от 2 до 10 символов' })
    email!: string

    @IsString({ message: 'Имя должно быть строкой' })
    @IsNotEmpty({ message: 'Поле fullname обязательно для заполнения' })
    fullname!: string

    @IsString({ message: 'Пароль должен быть строкой' })
    @IsNotEmpty({ message: 'Поле пароль обязательно для заполнения' })
    @Length(8, 100, { message: 'Пароль должен быть от 8 до 100 символов' })
    password!: string
}
