import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Chef } from "./chefs/entities/chef.entity";
import { User } from "./users/entities/user.entity";
import { Meal } from "./meals/entities/meal.entity";
import { Customer } from "./customers/entities/customer.entity";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {

    constructor(private configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: "mysql",
            host: this.configService.get<string>("DB_HOST"),
            port: this.configService.get<number>("DB_PORT"),
            username: this.configService.get<string>("DB_USERNAME"),
            password: this.configService.get<string>("DB_PASSWORD"),
            database: this.configService.get<string>("DB_DATABASE"),
            entities: [Chef, User, Meal, Customer],
            synchronize: true,
        };
    }
}