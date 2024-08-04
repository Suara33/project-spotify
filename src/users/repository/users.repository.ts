import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../entities/user.entity';



@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UsersEntity) 
    private readonly usersRepository: Repository<UsersEntity>
  ) {}
  async create(createUserDto: CreateUserDto) {
  this.usersRepository.create(createUserDto)
  return await this.usersRepository.save(createUserDto)

  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOneBy({id: 1});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    this.usersRepository.update(1, updateUserDto)
    await this.usersRepository.save(updateUserDto);
  }

  async remove(id: number) {
    return await this.usersRepository.softDelete(id);
  }
}



