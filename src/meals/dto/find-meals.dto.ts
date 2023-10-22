import { Chef } from "src/chefs/entities/chef.entity"

export class FindMealsDto {

    constructor(chefId?: string) {
        this.chefId = chefId
    }

    chefId: string

}