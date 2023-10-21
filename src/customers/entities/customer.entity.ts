import { Role } from "src/roles/role.enum";
import { User } from "src/users/entities/user.entity";
import { ChildEntity, Entity } from "typeorm";

@ChildEntity(Role.Customer)
export class Customer extends User {

}
