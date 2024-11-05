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
import { Public } from 'src/auth/roles/roles.decorator';
import { ChangePasswordDto } from './dto/change-password-for-admin.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@Controller('user')
@ApiTags('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Creates a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. Validation failed or invalid data',
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of all users retrieved successfully',
    type: [User],
  })
  async findAll() {
    return await this.usersService.findAll();
  }

  @UseGuards(AdminGuard)
  @Get('blocked')
  @ApiOperation({ summary: 'Get all blocked users' })
  @ApiResponse({
    status: 200,
    description: 'List of blocked users retrieved successfully',
    type: [User],
  })
  async findBlockedUsers() {
    return await this.usersService.findBlockedUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the user to retrieve' })
  @ApiResponse({
    status: 200,
    description: 'User retrieved successfully',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the user to update' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async update(
    @Param('id') id: string,
    @Body() updateUsersDto: UpdateUsersDto,
  ) {
    return await this.usersService.update(id, updateUsersDto);
  }

  @UseGuards(AdminGuard)
  @Patch('change-password/:userId')
  @ApiOperation({ summary: 'Change user password by admin' })
  @ApiParam({ name: 'userId', description: 'The ID of the user to change password for' })
  @ApiResponse({
    status: 200,
    description: 'Password changed successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async changePassword(
    @Param('userId') userId: number,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return await this.usersService.changePassword(userId, changePasswordDto);
  }

  @UseGuards(AdminGuard)
  @Patch('block/:id')
  @ApiOperation({ summary: 'Block a user by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the user to block' })
  @ApiResponse({
    status: 200,
    description: 'User blocked successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async blockUser(@Param('id') id: number) {
    return await this.usersService.blockUser(id);
  }

  @UseGuards(AdminGuard)
  @Patch('unblock/:id')
  @ApiOperation({ summary: 'Unblock a user by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the user to unblock' })
  @ApiResponse({
    status: 200,
    description: 'User unblocked successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async unblockUser(@Param('id') id: number) {
    return await this.usersService.unblockUser(id);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the user to delete' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async remove(@Param('id') id: string) {
    return await this.usersService.delete(+id);
  }
}
