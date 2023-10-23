import { ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Transform } from "class-transformer";
import { IsInt, IsNumberString, IsOptional, Min } from "class-validator";

export class PaginationDto {
    
    @IsOptional()
    @Min(1)
    @ApiPropertyOptional()
    page: number = 1;
    
    @IsOptional()
    @Min(1)
    @ApiPropertyOptional()
    limit: number= 10;

    @Exclude()
    get skip() {
        return (this.page - 1) * this.limit
    }

}