import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

import { IS_PUBLIC_KEY } from './public.decorator';
import { UsersService } from '../users/users.service';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class WarroomAuthGuard extends AuthGuard('supabase') {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
  ) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const canActivateResult = await super.canActivate(context);

    // End early since the user is not allowed to access this route
    if (!canActivateResult) {
      return false;
    }

    const supabaseUser = this.getRequest(context).user;
    const authUser = await this.usersService.findOne(supabaseUser.id);

    // Override the supabase user with our user
    this.getRequest(context).user = authUser || supabaseUser;

    return true;
  }
}
