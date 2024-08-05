import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from "bcryptjs";


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

    newUser.password = await bcrypt.hash(newUser.password, 10)
    return  this.usersRepository.save(newUser);


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

}
