import { ApiHideProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
var bcrypt = require('bcryptjs');

@Entity()
@TableInheritance({ column: { name: "role" } })
export class User {

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            const salt = bcrypt.genSaltSync();
            this.password = bcrypt.hashSync(this.password, salt);
        }
    }
  
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({unique: true})
    email: string

    @Column()
    @ApiHideProperty()
    @Exclude()
    password: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @ApiHideProperty()
    @Exclude()
    @Column()
    role: string

    @CreateDateColumn()
    createdAt: Date;

}