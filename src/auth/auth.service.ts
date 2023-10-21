import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoggingService } from 'src/logging/logging.service';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { instanceToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
    
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private loggingService: LoggingService,
    ){}

    async registerUser(registerDto: RegisterDto) {
        const exists = await this.usersService.findByEmail(registerDto.email)
        if (exists) {
            throw new HttpException("User already exists", HttpStatus.CONFLICT)
        }
        this.loggingService.info(JSON.stringify(registerDto))
        const salt = await bcrypt.genSalt();
        registerDto.password = await bcrypt.hash(registerDto.password, salt);

        return await this.usersService.create(registerDto)
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email)
        this.loggingService.log(user)
        this.loggingService.info(email)
        if (user && await bcrypt.compare(password, user.password)) {
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
