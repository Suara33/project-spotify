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


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

   
  @Get()
  async findAll(
    @UserId() userId:number
  ) {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
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

  @Patch('block-user')
  async blockUser(@Param('id') id: number) {
    return await this.usersService.blockUser(id)

  }

  @Patch('unblock-user')
  async unblockUser(@Param('id') id: number) {
    return await this.usersService.unblockUser(id)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.delete(+id);
  }
}
