import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoggingService } from 'src/logging/logging.service';
import { UsersService } from 'src/users/users.service';
var bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
    
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private loggingService: LoggingService,
    ){}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email)
        if (user && await bcrypt.compareSync(password, user.password)) {
            const { password, ...result } = user
            return result
        }

        return null

    }

    async generateJWT(user: any) {
        const { password, ...result } = user;
        this.loggingService.info(`user ${user.id} logged in`)
        result["access_token"] = this.jwtService.sign(result)
        return result;
      }

}
