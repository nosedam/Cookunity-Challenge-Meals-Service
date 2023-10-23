import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { Meal } from "src/meals/entities/meal.entity";
import { Role } from "src/roles/role.enum";
import { User } from "src/users/entities/user.entity";
import { ChildEntity, Entity, OneToMany } from "typeorm";

@ChildEntity(Role.Chef)
export class Chef extends User {

    @ApiProperty()
    @Expose()
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    @ApiHideProperty()
    @OneToMany(type => Meal, (meal) => meal.chef)
    meals: Meal

}
 