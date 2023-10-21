import { Injectable, Scope } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { User } from 'src/users/entities/user.entity';

@Injectable( {scope: Scope.REQUEST } )
export class RequestService {

    private traceId = randomUUID()
    private user: User;

    public getTraceId(): string {
        return this.traceId
    }

    public setSignedUser(user: User) {
        this.user = user
    }

    public getSignedUser(): User {
        return this.user
    }

}
