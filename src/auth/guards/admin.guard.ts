import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from 'express';
import { JwtService } from "@nestjs/jwt";
import { Role } from "../role.enum";

@Injectable()

export class AdminGuard implements CanActivate {
    constructor(private  jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)

        if(!token) {
            throw new UnauthorizedException('token is required')
        }
        

        if(request.user.isBlocked === true){
            throw new UnauthorizedException('user is blocked')
        }
    
        try {
            const payload = await this.jwtService.verifyAsync(token);
            request.user = payload;


            if(request.user.role !== Role.Admin) {
                throw new UnauthorizedException('You do not have admin privileges')
            }

            return true;
            
        }catch (err){
            throw new UnauthorizedException('ooops! something went wrong');
        }
        
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
       
        
        return type === 'Bearer' ? token : undefined;
    
        }
    }
