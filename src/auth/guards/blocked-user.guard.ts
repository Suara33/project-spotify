import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { IS_PUBLIC_KEY } from '../roles/roles.decorator';
import { Request } from 'express';

@Injectable()
export class BlockedUserGuard implements CanActivate {
  constructor(
              private readonly usersService: UsersService,
              private readonly jwtService: JwtService, 
              private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
     ]);

     if(isPublic) {
         return true
     }
  

     const request = context.switchToHttp().getRequest();
     const token = this.extractTokenFromHeader(request);
     
     if(!token) {
      throw new UnauthorizedException();
     }

     try{
      const payload = await this.jwtService.verify(token)
      request.user = payload;
     }
    
     catch {
      throw new UnauthorizedException;
     }
     const userId = request.user.id
     const blockedUser = await this.usersService.blockUser(userId)
     if(blockedUser) {
      throw new ForbiddenException('user is blocked')
     }

     return true;

     
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;

}
}

