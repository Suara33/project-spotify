import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUsersDto } from './dto/update-user.dto';
import { Public} from 'src/auth/roles/roles.decorator';
import { UserId } from 'src/auth/decorators/userId.decorator';
import { ChangePasswordDto } from './dto/change-password-for-admin.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';


@Controller('user')
@ApiTags('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Creates an users'})
  async create(@Body() createUserDto: CreateUserDto) {

    return await this.usersService.create(createUserDto);
  }

  
  @Get()
  @ApiOperation({ summary: 'Get all users'})
  @ApiResponse({ type: [User], example: User})
  async findAll(

  ) {
    
    return await this.usersService.findAll();
  }
  @UseGuards(AdminGuard)
  @Get('blocked')
  async findBlockedUsers() {
    return await this.usersService.findBlockedUsers()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates user when id is provided'})
  async update(
    @Param('id') id: string,
    @Body() updateUsersDto: UpdateUsersDto,
  ) {
    return await this.usersService.update(id, updateUsersDto);
  }

  @UseGuards(AdminGuard)
  @Patch('change-password/:userId') 
  async changePassword(
    @Param('userId') userId: number, 
    @Body() changePasswordDto: ChangePasswordDto)  {
    
      return await this.usersService.changePassword(userId, changePasswordDto)
  }

  @UseGuards(AdminGuard)
  @Patch('block/:id')
  async blockUser(@Param('id') id: number) {
    return await this.usersService.blockUser(id)

  }

  @UseGuards(AdminGuard)
  @Patch('unblock/:id')
  async unblockUser(@Param('id') id: number) {
    return await this.usersService.unblockUser(id)
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Deletes users by id'})
  async remove(@Param('id') id: string) {
    return await this.usersService.delete(+id);
  }
}
