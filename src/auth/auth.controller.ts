import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AdminGuard} from './guards/admin.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async create(@Body() createAuthDto: CreateAuthDto) {
        return await this.authService.login(createAuthDto.email,createAuthDto.password)  
    }


    // @UseGuards(AdminGuard)
    // @Get('profile')
    // getProfile(@Request() req) {
    //     return req.user
    // }
}





