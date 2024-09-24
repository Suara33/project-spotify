import { BadRequestException, Injectable } from '@nestjs/common';
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
    const newUser = new User();
    newUser.email = data.email;
    newUser.password = data.password;
   
    
    
    newUser.password = await bcrypt.hash(newUser.password, 10);

    

    
    return this.usersRepository.save(newUser);
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
      .select(['users.id', 'users.name', 'users.email'])
      .getMany();
  }

  async update(id: string, updateUsersDto: UpdateUsersDto) {
    await this.usersRepository.update(id, updateUsersDto);
  }

  async remove(id: number) {
    return await this.usersRepository
      .createQueryBuilder('users')
      .softDelete()
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
