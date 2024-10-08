import { JwtService } from '@nestjs/jwt';

import { AuthLoginDTO } from './domain/dto/auth-login.dto';
import { UserService } from 'src/user/user.service';
import { AuthRegisterDTO } from './domain/dto/auth-register.dto';
import { CreateUserDto } from 'src/user/domain/dtos/create-user.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthAuthenticateDTO } from './domain/dto/auth-authenticate.dto';
import { AuthResetDto } from './domain/dto/auth-reset.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { UserEntity } from 'src/entities/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private mailerService: MailerService,
  ) {}

  async createToken(email: string, id: string) {
    return {
      access_token: this.jwtService.sign(
        {
          sub: id,
          email: email,
        },
        {
          expiresIn: '7 days',
        },
      ),
    };
  }

  async googleLogin(req: any): Promise<AuthAuthenticateDTO> {
    if (!req.user) {
      throw new HttpException('E-mail not found', HttpStatus.BAD_REQUEST);
    }

    return await this.loginGoogle(req.user.email);
  }

  async checkToken(token: string) {
    try {
      const finalToken = token.split(' ');

      const user = this.jwtService.decode(finalToken[1]);

      return user;
    } catch (error) {
      return false;
    }
  }

  async loginGoogle(email: string) {
    try {
      const user = await this.userService.findUserByEmail(email);

      if (!user) {
        throw new HttpException('E-mail not found', HttpStatus.BAD_REQUEST);
      }

      const authToken = await this.createToken(email, user.id);

      return <AuthAuthenticateDTO>{
        email: email,
        accessToken: authToken.access_token,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async login(authLoginDTO: AuthLoginDTO) {
    try {
      const { email, password } = authLoginDTO;

      const user = await this.userService.findUserByEmail(email);

      if (!user) {
        throw new HttpException('E-mail not found', HttpStatus.BAD_REQUEST);
      }

      if (!(await bcrypt.compare(password, user.password))) {
        throw new HttpException(`Invalid password`, HttpStatus.BAD_REQUEST);
      }

      const authToken = await this.createToken(authLoginDTO.email, user.id);

      return <AuthAuthenticateDTO>{
        email: authLoginDTO.email,
        accessToken: authToken.access_token,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async register(data: CreateUserDto) {
    try {
      const newUser = await this.userService.createUser(data);

      const authToken = await this.createToken(data.email, newUser.id);

      return <AuthRegisterDTO>{
        email: newUser.email,
        accessToken: authToken.access_token,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async resetPassword(token: string, updateAuthDto: AuthResetDto) {
    try {
      const userByToken = await this.userService.findUserByToken(token);

      if (!userByToken) return;

      if (updateAuthDto.confirmationPassword !== updateAuthDto.password) return;

      const newPassword = await bcrypt.hash(
        updateAuthDto.confirmationPassword,
        await bcrypt.genSalt(),
      );

      const newUser = await this.userService.patchUser(
        { password: newPassword },
        userByToken.id,
      );

      const authToken = await this.createToken(newUser.email, newUser.id);

      return <AuthRegisterDTO>{
        email: newUser.email,
        accessToken: authToken.access_token,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async sendRecoverPasswordEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.userService.findUserByEmail(email);

      if (!user) {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      }

      const recoverToken = await this.createToken(user.email, user.id);

      await this.userService.patchUser(
        { recoverToken: recoverToken.access_token },
        user.id,
      );

      const mail = {
        to: user.email,
        from: 'umlaramigo@gmail.com',
        subject: 'Recuperação de senha',
        template: 'reset-password',
        context: {
          token: recoverToken,
        },
      };

      await this.mailerService.sendMail(mail);

      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
