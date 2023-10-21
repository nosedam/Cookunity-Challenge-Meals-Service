import { Exclude, Expose } from "class-transformer";
import { Role } from "src/roles/role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Exclude()
    @Column()
    password: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    role: string

    @Expose()
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

}