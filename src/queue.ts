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
import { SqsEventHandler } from './queue/sqs-event-handler.interface';
import { ReviewCreatedEventHandler } from './meals/events/review-created.handler';

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
    
    let eventHandlers: Record<string, SqsEventHandler> = {
        "reviewCreated": await cachedServer.resolve(ReviewCreatedEventHandler)
    }

    let handler = new SqsLambdaEventHandlerService(eventHandlers)

    let sqsBody = event.Records[0].body;

    const job = JSON.parse(sqsBody) as SqsMessageDto;
    const message = JSON.parse(job.Message) as BaseEvent

    await handler.handleSqsEvent(message);
};