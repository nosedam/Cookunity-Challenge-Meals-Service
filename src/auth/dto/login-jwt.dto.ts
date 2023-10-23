import { ApiProperty } from "@nestjs/swagger"
import { User } from "src/users/entities/user.entity"

export class LoginJWTDto extends User{
    
    @ApiProperty()
    accessToken: string
    
}