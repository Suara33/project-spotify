import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { IS_PUBLIC_KEY } from "../roles/roles.decorator";
import { Request } from "express";
import { UsersRepository } from "src/users/users.repository";



@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private  jwtService: JwtService, private reflector: Reflector , private readonly userRepository: UsersRepository) {}
    
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
       const payload = await this.jwtService.verifyAsync(token,
        {
            secret: process.env.jwtConstants
          }
    );
    request.user = payload;
    
    const user = await this.userRepository.findById(request.user.sub)
       
       if(!token) {
        throw new UnauthorizedException();
       }
     
       if(user.isBlocked === true){
        throw new UnauthorizedException('user is blocked')
    }


       try{
        const payload = await this.jwtService.verify(token)
        request.user = payload;
       }
      
       catch {
        throw new UnauthorizedException;
       }

       return true;

       
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;

    }
}