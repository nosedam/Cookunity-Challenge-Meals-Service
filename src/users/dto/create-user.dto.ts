import { ApiProperty, ApiHideProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsString, IsStrongPassword, MinLength } from "class-validator";
import { Role } from "src/roles/role.enum";

export class CreateUserDto {

    @ApiProperty()
    @IsString()
    @IsStrongPassword({minLength:8, minLowercase:1, minNumbers:1, minSymbols:0, minUppercase:0})
    password: string

    @ApiProperty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsString()
    @MinLength(3)
    firstName: string

    @ApiProperty()
    @IsString()
    @MinLength(3)
    lastName: string

    @ApiHideProperty()
    @IsEnum(Role)
    role: string
    
}
