import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('login')
    async create(@Body() createAuthDto: CreateAuthDto) {
        console.log(createAuthDto )
        return await this.authService.login(createAuthDto.email,createAuthDto.password)  
    }

    

    
}





