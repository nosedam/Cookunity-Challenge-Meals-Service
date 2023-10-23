import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { LoggingService } from 'src/logging/logging.service';
import { UsersService } from 'src/users/users.service';
import { LoginJWTDto } from './dto/login-jwt.dto';
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

    async generateJWT(user: any): Promise<LoginJWTDto> {
        const { password, ...result } = user;
        this.loggingService.info(`user ${user.id} logged in`)
        result["accessToken"] = this.jwtService.sign(result)
        const loginJWTDto = plainToInstance(LoginJWTDto, result)
        return loginJWTDto;
      }

}
