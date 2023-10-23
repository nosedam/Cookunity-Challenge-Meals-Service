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

    

    constructor(private eventHandlers: Record<string, SqsEventHandler>) {

    }

    async handleSqsEvent(message: BaseEvent) {

        let handler = this.eventHandlers[message.event]

        if (handler) {
            await handler.process(message.data)
        }      

    }
}
