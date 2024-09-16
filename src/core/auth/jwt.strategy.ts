import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY || 'yourSecretKey', // Make sure this matches your configuration
    });
  }

  async validate(payload: any) {
    // This will inject the user information into the request
    return {
      userId: payload.sub,
      username: payload.username,
      roles: payload.roles,
    };
  }
}
