import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { Chef } from "src/chefs/entities/chef.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Meal {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({nullable: false})
    name: string

    @Column("decimal", {precision: 3, scale: 2, nullable: true})
    rating: number

    @Expose()
    @ApiProperty({type: "string"})
    get chefName(): string {
        return `${this.chef.firstName} ${this.chef.lastName}`;
    }

    @Exclude()
    @ApiHideProperty()
    @ManyToOne(type => Chef, (chef) => chef.meals, {nullable: false})
    chef: Chef
    
}
