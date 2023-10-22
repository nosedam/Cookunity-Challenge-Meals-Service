import { IsNumber, IsString } from "class-validator"
import { Chef } from "src/chefs/entities/chef.entity"

export class CreateMealDto {
    
    @IsString()
    name: string

    chefId: number

}
