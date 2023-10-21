import { Body, Controller, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local-auth.guard';
import { Request } from 'express';
import { Public } from './public.decorator';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalGuard)
  @Post("login")
  login(@Req() req: Request) {
      const user = req.user
      return this.authService.generateJWT(user)
  }

}
