import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto) {
    const newUser = new User();
    newUser.email = data.email;
    newUser.password = data.password;
    newUser.name = data.name;

    return this.usersRepository.save(newUser);

    // try {
    //     const result = await this.usersRepository.save(newUser)

    //     return result

    // } catch (err)  {
    //     if(err.errno == 1062) {
    //         return 'mail already exist'
    //         }
    //     }
  }

  async findOne(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findAll() {
    return await this.usersRepository
      .createQueryBuilder('users')
      .select(['users.id', 'users.name', 'users.email'])
      .getMany();
  }

  // async findAll() {
  //     return await this.usersRepository
  //     .createQueryBuilder('users')
  //     .select('users.id', ':user')
  //     .getMany()

  // }
}
