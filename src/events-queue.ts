import { Handler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { SqsLambdaEventHandlerService } from './events/sqs-lambda-handler.service';
import { BaseEvent } from './events/dto/base-event.dto';
import { SqsMessageDto } from './events/dto/sqs.dto';
import { SqsEventHandler } from './events/sqs-event-handler.interface';
import { ReviewCreatedEventHandler } from './meals/events/review-created.handler';
import { LoggingService } from './logging/logging.service';

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

    let loggingService = await cachedServer.resolve(LoggingService)
    loggingService.log(message)

    await handler.handleSqsEvent(message);
};