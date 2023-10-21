import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LoggingService } from 'src/logging/logging.service';
import { RequestService } from 'src/request/request.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s'},
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, LoggingService, RequestService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
