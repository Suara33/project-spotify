import { Body, Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from './decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { CreateAdminAuthDto } from './dto/create-admin.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('login')
    async create(@Body() createAuthDto: CreateAuthDto) {
        return await this.authService.login(createAuthDto.email,createAuthDto.password)  
    }

    @Public()
    @Post('admin/login') 
    async adminLogin(@Body() createAdminAuthDto: CreateAdminAuthDto) {
        return await this.authService.adminLogin(createAdminAuthDto.email, createAdminAuthDto.password);
    }

}





