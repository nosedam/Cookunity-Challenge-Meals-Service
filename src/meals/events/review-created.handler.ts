import { SqsEventHandler } from "src/events/sqs-event-handler.interface";
import { ReviewCreatedEvent } from "./review-created.event";
import { MealsService } from "../meals.service";
import { UpdateRatingDto } from "../dto/update-rating.dto";
import { Injectable } from "@nestjs/common";
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class ReviewCreatedEventHandler implements SqsEventHandler{

    constructor(private mealsService: MealsService){}

    async process(message: ReviewCreatedEvent) {
        let updateRatingDto = new UpdateRatingDto()

        updateRatingDto.id = message.mealId
        updateRatingDto.rating = message.averageMealRating
        
        await this.mealsService.updateRating(updateRatingDto)
    }
}