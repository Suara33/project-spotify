import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AdminGuard} from './guards/admin.guard';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('login')
    async create(@Body() createAuthDto: CreateAuthDto) {
        return await this.authService.login(createAuthDto.email,createAuthDto.password)  
    }


}





