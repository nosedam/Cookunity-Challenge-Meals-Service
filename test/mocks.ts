import { randomUUID } from "crypto";
import { LoginDto } from "src/auth/dto/login.dto";
import { CreateChefDto } from "src/chefs/dto/create-chef.dto";
import { Chef } from "src/chefs/entities/chef.entity";
import { CreateCustomerDto } from "src/customers/dto/create-customer.dto";
import { CreateMealDto } from "src/meals/dto/create-meal.dto";

export class MockLoggingService {
      log(obj: Record<string, any>){}
      info(message: string){}
}

export const mockCreateChefDto: CreateChefDto = {
      email: "email+test@mnoseda.com",
      password: "3TsdGGirpSy3gpqC",
      passwordConfirmation: "3TsdGGirpSy3gpqC",
      firstName: "Maximiliano",
      lastName: "Noseda"
}

export const mockCreateRandomChefDto: CreateChefDto = {
      email: `${randomUUID()}@mnoseda.com`,
      password: "3TsdGGirpSy3gpqC",
      passwordConfirmation: "3TsdGGirpSy3gpqC",
      firstName: "Maximiliano",
      lastName: "Noseda"
}

export const mockCreateCustomerDto: CreateCustomerDto = {
      email: "customer+test@mnoseda.com",
      password: "3TsdGGirpSy3dpqC",
      passwordConfirmation: "3TsdGGirpSy3dpqC",
      firstName: "Maximiliano",
      lastName: "Noseda"
}

export const mockLoginChefDto: LoginDto = {
      email: "email+test@mnoseda.com",
      password: "3TsdGGirpSy3gpqC",
}

export const mockLoginCustomerDto: LoginDto = {
      email: "customer+test@mnoseda.com",
      password: "3TsdGGirpSy3dpqC",
}

export const mockCreateMealDto: CreateMealDto = {
      name: "Pizza",
      chef: new Chef()
}