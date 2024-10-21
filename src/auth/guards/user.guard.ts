import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class UserGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        
        
        if(!token) {
            throw new UnauthorizedException('Authorization token is missing');
        }
        try{
            const payload = await this.jwtService.verifyAsync(token)
            request.user = payload
            
        return true;

    } catch (err) { 
        throw new UnauthorizedException('Invalid or expired token');
    }
        
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined; 
    }
  
    
}