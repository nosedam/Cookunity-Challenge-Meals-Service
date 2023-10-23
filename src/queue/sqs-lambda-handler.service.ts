import { Injectable } from '@nestjs/common';
import { LoggingService } from 'src/logging/logging.service';
import { SqsEventHandler } from './sqs-event-handler.interface';
import { ReviewCreatedEventHandler } from 'src/meals/events/review-created.handler';
import { ModuleRef } from '@nestjs/core';
import { MealsService } from 'src/meals/meals.service';
import { BaseEvent } from './dto/base-event.dto';
import { UpdateRatingDto } from 'src/meals/dto/update-rating.dto';

@Injectable()
export class SqsLambdaEventHandlerService {

    private availableHandlers: Record<string, SqsEventHandler>

    constructor(private loggingService: LoggingService, private mealsService: MealsService) {

    }

    handleSqsEvent(message: BaseEvent) {
        this.loggingService.log(message)
        
        let updateRatingDto = new UpdateRatingDto()

        updateRatingDto.id = message.data.mealId
        updateRatingDto.rating = message.data.averageMealRating
        
        this.mealsService.updateRating(updateRatingDto)

    }
}
