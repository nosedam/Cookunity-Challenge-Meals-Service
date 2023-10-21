import { Chef } from "src/chefs/entities/chef.entity"

export class FindMealsDto {

    constructor(chef?: Chef) {
        this.chef = chef
    }

    chef: Chef

}