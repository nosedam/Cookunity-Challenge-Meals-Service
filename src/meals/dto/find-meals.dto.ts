export class FindMealsDto {

    constructor(chefId?: number) {
        this.chefId = chefId
    }

    chefId: number
}