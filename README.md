# Cookunity-Challenge-Meals-Service

This repository contains the information about the Meals Service

- It can create meals
- It can create and login chefs
- It can create and login customers

## Architecture

The following diagram describes the architecture for this service

![](https://github.com/nosedam/Cookunity-Challenge/blob/main/img/meals-service.drawio.png)

The services are deployed serverlessly with AWS Lambda and the database is an RDS instance.
The meals service expose an HTTP Rest Api accesible by the public.
A Lambda with an SQS handler receive events from this service SNS subscriptions.

## Demo

There are instances available to try the service. These instances are hosted by Amazon with the resources specified in the serverless.yml files of each repository.

- Swagger documentation: https://309bbef9eb.execute-api.us-west-2.amazonaws.com/api
- Service endpoint: https://309bbef9eb.execute-api.us-west-2.amazonaws.com

### Installation

Development dependencies:

- Node 18
- NestJS
- AWS Cli
- Serverless

#### Install node packages

```bash
$ npm install
```

#### Source development variables

Environment variables are loaded directly from the environment of the user.
You can define them in a file and source them.

```bash
$ cp .example.env .env.dev
$ vi .env.dev
$ source .env.dev
```


#### Running the app locally with the NestJS server

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

### Deployment

1. Configure your AWS credentials

```bash
$ aws configure
```

2. Define production variables

```bash
$ cp .example.env .env
$ vi .env
$ source .env
```

3. Deploy to AWS

```bash
$ serverless deploy
```

### Tests

Run the tests
```bash
# e2e tests
$ npm run test:e2e
```

### Migrations

Run migrations

```bash
$ nest build
$ npm run typeorm:run-migrations
```

Generate migrations

```bash
$ npm run typeorm:generate-migration
```
