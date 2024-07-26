import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class UsersService {
  constructor (private readonly usersRepository: UsersRepository) {}


  async create(createUserDto: CreateUserDto) {
    if(createUserDto.password !== createUserDto.confirmPassword) {
      throw new BadRequestException ( "Passwords do not match" )
    }
    return await this.usersRepository.create(createUserDto);
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto)
    return this.usersRepository.findOne(id);
  }

  async remove(id: number) {
    await this.usersRepository.remove(id)
    return {deleted: true};
  }
}
