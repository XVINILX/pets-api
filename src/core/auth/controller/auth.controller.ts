import {
  Body,
  Get,
  Post,
  UseGuards,
  Request,
  Response,
  Res,
} from '@nestjs/common';
import { AuthLoginDTO } from '../domain/dto/auth-login.dto';
import { ControllerApp } from 'src/core/decorators/controller-apitag.decorators';
import { CreateUserDto } from 'src/user/domain/dtos/create-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterUserCommand } from '../domain/commands/register-user.command';
import { LoginUserCommand } from '../domain/commands/login-user.command';
import { GoogleOAuthGuard } from 'src/core/guards/google-oauth.guard';
import { AuthService } from '../auth.service';
import { response } from 'express';

@ControllerApp('auth', 'Auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDTO) {
    return await this.commandBus.execute(new LoginUserCommand(authLoginDto));
  }

  @Get()
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req: any) {}

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Request() req: any, @Res() response: any) {
    const authentication = await this.authService.googleLogin(req);

    response.redirect(
      `${process.env.FRONTEND_URL}/google?accessToken=${authentication.accessToken}`,
    );
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.commandBus.execute(
      new RegisterUserCommand(createUserDto),
    );
  }
}
