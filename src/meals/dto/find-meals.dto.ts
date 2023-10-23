import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsOptional, IsString, IsUUID } from "class-validator"
import { Chef } from "src/chefs/entities/chef.entity"

export class FindMealsDto {

    @ApiPropertyOptional()
    @IsUUID()
    @IsOptional()
    chefId: string

}