import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUsersDto } from './dto/update-user.dto';
import { Role } from 'src/auth/roles/roles.enum';
import { ChangePasswordDto } from './dto/change-password-for-admin.dto';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    // private readonly jwtService : JwtService

  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.findOneByEmail(createUserDto.email)

    if(user) { throw new NotFoundException(`user with email already exist`) }
    const createUser = await this.usersRepository.create(createUserDto)
    const payload = { userId: createUser.id, userEmail: createUser.email, role: Role.User};

    
    return payload
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findOne(userId: number) {
    return this.usersRepository.findById(userId);
  }

  async changePassword(userId: number, changePasswordDto: ChangePasswordDto) {
      
    const user = await this.usersRepository.findById(userId)

    if(!user) {
        throw new NotFoundException(`User with ID ${userId} does not exist`)
      }

    const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10)

    user.password = hashedPassword

    return await this.usersRepository.save(user)

  }

  async blockUser(userId: number) {
    const user = await this.usersRepository.findById(userId)
    console.log(user)

    if(!user) {
      throw new NotFoundException('User not found');
    }
    user.isBlocked = true;
    console.log(user.isBlocked)
    return await this.usersRepository.save(user)
  }

  async unblockUser(userId: number) {
    const user = await this.usersRepository.findById(userId)

    if(!user) {
      throw new NotFoundException('User not found')
    }
    user.isBlocked = false
    return this.usersRepository.save(user)
  }

  async isUserBlocked(userId: number) {
    const user = await this.usersRepository.findById(userId)

    if(!user) {
      throw new NotFoundException('User not found')
    }

    return user.isBlocked
  }

  async findBlockedUsers() {
    return await this.usersRepository.findBlockedUsers()
  }

  async update(id: string, updateUsersDto: UpdateUsersDto) {
    await this.usersRepository.update(id, updateUsersDto);

    const user = await this.usersRepository.findById(+id);

    delete user.password;

    return user;
  }

  async delete(id: number) {
    return await this.usersRepository.remove(id);
  }
}
