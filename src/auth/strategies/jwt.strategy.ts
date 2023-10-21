import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RequestService } from 'src/request/request.service';
import { User } from 'src/users/entities/user.entity';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    private usersService: UsersService,
    private moduleRef: ModuleRef,
    private configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_KEY"),
      passReqToCallback: true 
    });
  }

  async validate(
    request: Request,
    user: User
  ) {
    const contextId = ContextIdFactory.getByRequest(request);
    const requestService = await this.moduleRef.resolve(RequestService, contextId)
    const { password, ...result} = await this.usersService.findByEmail( user.email )
    requestService.setSignedUser(result as User)
    return result
  }

}