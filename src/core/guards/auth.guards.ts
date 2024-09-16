import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (!authorization) {
      return false; // No token present
    }

    try {
      // Assuming checkToken returns the user object if the token is valid
      const user = await this.authService.checkToken(authorization);

      if (!user) {
        return false; // Token is invalid
      }

      // Attach the user object to the request
      request.user = user;

      return true;
    } catch (error) {
      return false;
    }
  }
}
