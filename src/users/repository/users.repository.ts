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

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}



//controleri da service gasworebulia .. entityc da dtoc ase tu ise da repo darcha/.......