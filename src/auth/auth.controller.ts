import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Public } from './decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateAdminAuthDto } from './dto/create-admin.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ 
    description: 'User login credentials',
    type: CreateAuthDto,
    schema: {
      example: {
        email: 'user@example.com',
        password: 'strongpassword'
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Login successful. Returns a JWT token.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid email or password.' })
  async create(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.login(createAuthDto.email, createAuthDto.password);
  }

  @Public()
  @Post('admin/login')
  @ApiOperation({ summary: 'Admin login' })
  @ApiBody({ 
    description: 'Admin login credentials',
    type: CreateAdminAuthDto,
    schema: {
      example: {
        email: 'admin@example.com',
        password: 'adminpassword'
      }
    }
  })
  @ApiResponse({ status: 200, description: 'Admin login successful. Returns a JWT token.' })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid email or password.' })
  async adminLogin(@Body() createAdminAuthDto: CreateAdminAuthDto) {
    return await this.authService.adminLogin(createAdminAuthDto.email, createAdminAuthDto.password);
  }
}





