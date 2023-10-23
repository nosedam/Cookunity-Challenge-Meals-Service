import { ClassSerializerInterceptor, Controller, HttpCode, HttpException, HttpStatus, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local-auth.guard';
import { Request } from 'express';
import { Public } from './public.decorator';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LoginJWTDto } from './dto/login-jwt.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Login using email and password' })
  @ApiBody({type: LoginDto})
  @Post("login")
  login(@Req() req: Request): Promise<LoginJWTDto> {
      const user = req.user
      return this.authService.generateJWT(user)
  }

}
