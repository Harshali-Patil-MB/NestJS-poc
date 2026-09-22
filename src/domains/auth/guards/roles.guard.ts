import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../enums/user-role.enum';

type AuthenticatedRequest = Request & {
  user: { userId: string; role: UserRole };
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(), //role on method in controller
      context.getClass(), //role on controller
    ]);

    if (!roles) return true;

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    return roles.includes(request.user.role); //[LAB_TECHNICIAN].includes(PHYSICIAN)=>TRUE/FALSE
  }
}
