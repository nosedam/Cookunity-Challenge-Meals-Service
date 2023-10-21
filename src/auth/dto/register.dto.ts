import { PartialType } from "@nestjs/mapped-types"
import { Exclude } from "class-transformer"
import { IsEmail, IsEnum, IsString, IsStrongPassword, MinLength, ValidateIf } from "class-validator"
import { Role } from "src/roles/role.enum"
import { CreateUserDto } from "src/users/dto/create-user.dto"

export class RegisterDto extends PartialType(CreateUserDto) {

    @ValidateIf(registerDto => registerDto.password == registerDto.passwordConfirmation)
    passwordConfirmation: string

}