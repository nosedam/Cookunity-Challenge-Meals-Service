import { SqsEventHandler } from "src/queue/sqs-event-handler.interface";
import { ReviewCreatedEvent } from "./review-created.event";
import { MealsService } from "../meals.service";
import { UpdateRatingDto } from "../dto/update-rating.dto";
import { Injectable } from "@nestjs/common";
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class ReviewCreatedEventHandler implements SqsEventHandler{

    private mealsService: MealsService
    
    constructor(private moduleRef: ModuleRef){
        this.mealsService = moduleRef.get(MealsService, {strict: false})
    }

    process(message: ReviewCreatedEvent) {
        let updateRatingDto = new UpdateRatingDto()

        updateRatingDto.id = message.mealId
        updateRatingDto.rating = message.averageMealRating
        
        this.mealsService.updateRating(updateRatingDto)
    }
}