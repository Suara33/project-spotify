import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BlockedUserGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;

   
    const isBlocked = await this.usersService.isUserBlocked(userId);
    if (isBlocked) {
      throw new UnauthorizedException('Your account has been blocked.');
    }
    return true; 
  }
}
