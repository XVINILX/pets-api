import {
  Body,
  Get,
  Post,
  UseGuards,
  Request,
  Response,
  Res,
  ValidationPipe,
  Param,
  Patch,
} from '@nestjs/common';
import { AuthLoginDTO } from '../domain/dto/auth-login.dto';
import { ControllerApp } from 'src/core/decorators/controller-apitag.decorators';
import { CreateUserDto } from 'src/user/domain/dtos/create-user.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterUserCommand } from '../domain/commands/register-user.command';
import { LoginUserCommand } from '../domain/commands/login-user.command';
import { GoogleOAuthGuard } from 'src/core/guards/google-oauth.guard';
import { AuthService } from '../auth.service';

import { User } from 'src/core/decorators/user.decorators';
import { AuthJwtDto } from 'src/core/auth/domain/dto/auth-jwt.dto';
import { AuthGuard } from 'src/core/guards/auth.guards';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';

@ControllerApp('auth', 'Auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDTO) {
    return await this.commandBus.execute(new LoginUserCommand(authLoginDto));
  }

  //TODO criar endpoint de recupreação de senha
  // https://medium.com/@iago.maiasilva/construindo-uma-api-com-nestjs-postgresql-e-docker-parte-5-enviando-emails-de-confirma%C3%A7%C3%A3o-e-54cb977c3fad

  @Patch('/reset-password/:token')
  async resetPassword(
    @Param('token') token: string,
    @Body(ValidationPipe) changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    await this.authService.resetPassword(token, changePasswordDto);

    return {
      message: 'Senha alterada com sucesso',
    };
  }

  @Post('/send-recover-email')
  async sendRecoverPasswordEmail(
    @Body('email') email: string,
  ): Promise<{ message: string }> {
    await this.authService.sendRecoverPasswordEmail(email);
    return {
      message: 'Foi enviado um email com instruções para resetar sua senha',
    };
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('jwt')
  @Get('/me')
  async authMe(@User() user: AuthJwtDto) {
    return user;
  }

  @Get()
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req: any) {}

  @Get('google-redirect')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Request() req: any, @Res() response: any) {
    const authentication = await this.authService.googleLogin(req);
    //TODO only makes the redirect if already has an account and it has verified (?)
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
