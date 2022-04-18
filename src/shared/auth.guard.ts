import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
  handleRequest<User>(
    err: any,
    user: any,
    info,
    context: ExecutionContext,
  ): User {
    if (err) {
      throw new ForbiddenException();
    }
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return user;
    }
    if (!roles.includes(user.role)) {
      throw new ForbiddenException();
    }
    return user;
  }
}
