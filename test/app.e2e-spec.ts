import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from 'src/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { MockLoggingService, mockCreateChefDto, mockCreateCustomerDto, mockCreateMealDto, mockCreateRandomChefDto, mockLoginChefDto, mockLoginCustomerDto } from './mocks';
import { LoggingService } from 'src/logging/logging.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { Meal } from 'src/meals/entities/meal.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let mealsRepository: Repository<Meal>
  
  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useClass: TypeOrmConfigService
        })
      ],
    }).overrideProvider(LoggingService).useClass(MockLoggingService).compile();

    app = moduleFixture.createNestApplication();
    mealsRepository = await app.get<Repository<Meal>>(getRepositoryToken(Meal))
    await app.init();
  });

  it('create a chef, login and create a meal', async () => {
    const createChefResponse = await request(app.getHttpServer()).post("/chefs").send(mockCreateChefDto)
    expect(createChefResponse.status).toEqual(201)
    expect(createChefResponse.body).toBeDefined()
    expect(createChefResponse.body.fullName).toBeDefined()
    expect(createChefResponse.body.id).toBeDefined()

    const loginChefResponse = await request(app.getHttpServer()).post("/auth/login").send(mockLoginChefDto)
    expect(loginChefResponse.status).toEqual(200)
    expect(loginChefResponse.body).toBeDefined()
    expect(loginChefResponse.body.accessToken).toBeDefined()

    const accessToken = loginChefResponse.body.accessToken
    const createMealResponse = await request(
      app.getHttpServer()).post("/meals").set('Authorization', 'Bearer ' + accessToken).send(mockCreateMealDto)
    expect(createMealResponse.status).toEqual(201)
    expect(createMealResponse.body.id).toBeDefined()
    expect(createMealResponse.body.rating).toBeNull()
    expect(createMealResponse.body.name).toEqual(mockCreateMealDto.name)
  });

  it('create a customer, login and view meals', async () => {
    const createCustomerResponse = await request(app.getHttpServer()).post("/customers").send(mockCreateCustomerDto)
    expect(createCustomerResponse.status).toEqual(201)
    expect(createCustomerResponse.body).toBeDefined()
    expect(createCustomerResponse.body.fullName).toBeUndefined()
    expect(createCustomerResponse.body.id).toBeDefined()

    const loginCustomerResponse = await request(app.getHttpServer()).post("/auth/login").send(mockLoginCustomerDto)
    expect(loginCustomerResponse.status).toEqual(200)
    expect(loginCustomerResponse.body).toBeDefined()
    expect(loginCustomerResponse.body.accessToken).toBeDefined()

    const accessToken = loginCustomerResponse.body.accessToken
    const viewMealsResponse = await request(
      app.getHttpServer()).get("/meals").set('Authorization', 'Bearer ' + accessToken)
    expect(viewMealsResponse.status).toEqual(200)
    expect(viewMealsResponse.body).toBeDefined()

  });

  it('login as chef and reject viewing all meals', async () => {
    const loginChefResponse = await request(app.getHttpServer()).post("/auth/login").send(mockLoginChefDto)
    expect(loginChefResponse.status).toEqual(200)
    expect(loginChefResponse.body).toBeDefined()
    expect(loginChefResponse.body.accessToken).toBeDefined()


    const accessToken = loginChefResponse.body.accessToken
    const createMealResponse = await request(
      app.getHttpServer()).get("/meals").set('Authorization', 'Bearer ' + accessToken)
    expect(createMealResponse.status).toEqual(403)
  });

  it('login as customer and reject creating meals', async () => {
    const loginCustomerResponse = await request(app.getHttpServer()).post("/auth/login").send(mockLoginCustomerDto)
    expect(loginCustomerResponse.status).toEqual(200)
    expect(loginCustomerResponse.body).toBeDefined()
    expect(loginCustomerResponse.body.accessToken).toBeDefined()

    const accessToken = loginCustomerResponse.body.accessToken
    const createMealResponse = await request(
      app.getHttpServer()).post("/meals").set('Authorization', 'Bearer ' + accessToken).send(mockCreateMealDto)
    expect(createMealResponse.status).toEqual(403)
  });

  it('login as chef and only allow viewing own meals', async () => {
    const loginChefResponse = await request(app.getHttpServer()).post("/auth/login").send(mockLoginChefDto)
    expect(loginChefResponse.status).toEqual(200)
    expect(loginChefResponse.body).toBeDefined()
    expect(loginChefResponse.body.accessToken).toBeDefined()

    // Register another chef that creates another meal
    const createChefResponse = await request(app.getHttpServer()).post("/chefs").send(mockCreateRandomChefDto)
    expect(createChefResponse.status).toEqual(201)
    expect(createChefResponse.body).toBeDefined()
    expect(createChefResponse.body.fullName).toBeDefined()
    expect(createChefResponse.body.id).toBeDefined()


    await mealsRepository.save({
      name: "Ravioli",
      chef: {
        id: createChefResponse.body.id
      }
    })

    const accessToken = loginChefResponse.body.accessToken
    const createMealResponse = await request(
      app.getHttpServer()).get("/chefs/meals").set('Authorization', 'Bearer ' + accessToken)
    expect(createMealResponse.status).toEqual(200)
    expect(createMealResponse.body).toBeDefined()
    expect(createMealResponse.body).toHaveLength(1)

  });

});
