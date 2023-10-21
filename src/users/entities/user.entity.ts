import { Exclude, Expose } from "class-transformer";
import { Role } from "src/roles/role.enum";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
@TableInheritance({ column: { name: "role" } })
export class User {

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            const salt = await bcrypt.genSalt();
            this.password = await bcrypt.hash(this.password, salt);
        }
    }
  
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    email: string

    @Column()
    @Exclude()
    password: string

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    role: string

}