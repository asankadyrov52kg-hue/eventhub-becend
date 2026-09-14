
import { IsNotEmpty, IsString, Length } from "class-validator"

export class SignupDTO {
    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    email!: string

    @IsNotEmpty()
    @IsString()
    fullname!: string

    @IsString()
    @IsNotEmpty()
    @Length(8, 100)
    password!: string
}
