import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';


import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async create(@Body() createAuthDto: CreateAuthDto) {
        return await this.authService.login(createAuthDto.email,createAuthDto.password)  
    }
    
}





