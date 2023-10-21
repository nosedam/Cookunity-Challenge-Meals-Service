import { Chef } from "src/chefs/entities/chef.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Meal {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @Column({nullable: true})
    rating: number

    @ManyToOne(type => Chef, (chef) => chef.meals, {nullable: false})
    chef: Chef
    
}
