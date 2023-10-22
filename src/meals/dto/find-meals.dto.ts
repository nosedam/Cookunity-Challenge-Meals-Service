import { Chef } from "src/chefs/entities/chef.entity"

export class FindMealsDto {

    constructor(chefId?: number) {
        this.chefId = chefId
    }

    chefId: number

}