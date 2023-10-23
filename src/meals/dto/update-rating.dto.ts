import { ApiProperty } from "@nestjs/swagger"
import { IsString } from "class-validator"
import { Chef } from "src/chefs/entities/chef.entity"

export class UpdateRatingDto {
    
    @ApiProperty()
    id: string

    @ApiProperty()
    rating: number

}
