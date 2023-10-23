import { Handler } from 'aws-lambda';
import { ModuleRef, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { SqsLambdaEventHandlerService } from './queue/sqs-lambda-handler.service';
import { LoggingService } from './logging/logging.service';
import { RequestService } from './request/request.service';
import { BaseEvent } from './queue/dto/base-event.dto';
import { SqsMessageDto } from './queue/dto/sqs.dto';
import { MealsService } from './meals/meals.service';
import { UpdateRatingDto } from './meals/dto/update-rating.dto';

let cachedServer: INestApplication;

async function bootstrapServer(): Promise<INestApplication> {
    if (!cachedServer) {
        const nestApp = await NestFactory.create(AppModule);

        await nestApp.init();
        cachedServer = nestApp;
    }
    return cachedServer;
}

export const handler: Handler = async (event: any) => {
    cachedServer = await bootstrapServer();
    
    let mealsService = await cachedServer.resolve(MealsService)

    let requestService = new RequestService()
    let loggingService = new LoggingService(requestService)

    // let handler = new SqsLambdaEventHandlerService(loggingService, mealsService)

    let sqsBody = event.Records[0].body;

    const job = JSON.parse(sqsBody) as SqsMessageDto;
    const message = JSON.parse(job.Message) as BaseEvent

    // A
    let updateRatingDto = new UpdateRatingDto()

    updateRatingDto.id = message.data.mealId
    updateRatingDto.rating = message.data.averageMealRating
    
    loggingService.log(updateRatingDto)

    await mealsService.updateRating(updateRatingDto)
    // A
    // await handler.handleSqsEvent(message);
};