import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateUsersDto } from './dto/update-user.dto';


@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    const password = await bcrypt.hash(data.password, 10);
    return await this.usersRepository.create({...data , password})
    
  }

  async save(user: User) {
    return await this.usersRepository.save(user)
  }
  
  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findById(id: number) {
    return await this.usersRepository.findOne({ where: { id } });
  }
  
  async findAll() {
    return await this.usersRepository
      .createQueryBuilder('users')
      .select(['users.id', 'users.email', 'users.createAt', 'users.password'])
      .getMany();
  }

  async update(id: string, updateUsersDto: UpdateUsersDto) {
    await this.usersRepository.update(id, updateUsersDto);
  }

  async remove(id: number) {
    return await this.usersRepository
      .createQueryBuilder('users')
      .delete()
      .where('user.id = :id', { id })
      .execute();
  }

  async findByName(name: string) {
    return await this.usersRepository
      .createQueryBuilder('user')
      .where('user.name Like :name', { name: `%${name}%` })
      .getMany();
  }
}
