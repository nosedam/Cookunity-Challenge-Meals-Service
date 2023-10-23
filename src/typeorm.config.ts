import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Chef } from "./chefs/entities/chef.entity";
import { User } from "./users/entities/user.entity";
import { Meal } from "./meals/entities/meal.entity";
import { Customer } from "./customers/entities/customer.entity";
import { DataSource, DataSourceOptions } from "typeorm";

let dataSource = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.{ts,js}'],
}

export default new DataSource(
    dataSource as DataSourceOptions
)


@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {

    constructor(private configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: "mysql",
            host: dataSource.host,
            port: dataSource.port,
            username: dataSource.username,
            password: dataSource.password,
            database: dataSource.database,
            entities: [Chef, User, Meal, Customer],
        };
    }
}