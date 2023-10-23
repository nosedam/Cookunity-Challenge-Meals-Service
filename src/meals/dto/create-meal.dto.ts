import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"
import { Chef } from "src/chefs/entities/chef.entity"

export class CreateMealDto {
    
    @ApiProperty()
    @IsString()
    name: string

    chef: Chef = new Chef()

}
