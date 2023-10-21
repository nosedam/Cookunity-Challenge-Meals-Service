import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class PaginationDto {

    @IsPositive()
    @IsOptional()
    public page: number = 1;
    
    @IsPositive()
    @IsOptional()
    public limit: number= 10;

}