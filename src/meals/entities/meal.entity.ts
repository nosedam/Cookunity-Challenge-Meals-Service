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
    get chefName(): string {
        return `${this.chef.firstName} ${this.chef.lastName}`;
    }

    @Exclude()
    @ManyToOne(type => Chef, (chef) => chef.meals, {nullable: false})
    chef: Chef
    
}
