import { PartialType } from "@nestjs/mapped-types";
import { RegisterDto } from "src/auth/dto/register.dto";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class CreateCustomerDto extends PartialType(RegisterDto) {}
