import { Exclude, Expose } from "class-transformer";
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

    @Expose()
    get chefName(): string {
        return `${this.chef?.firstName} ${this.chef?.lastName}`;
    }

    @Exclude()
    @ManyToOne(type => Chef, (chef) => chef.meals, {nullable: false})
    chef: Chef
    
}
