import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateUsersDto } from './dto/update-user.dto';
import { isBlockedStatus } from './isBlockedStatus.enum';


@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto): Promise<Omit<User, 'password'>> {
    const password = await bcrypt.hash(data.password, 10);
    const user = await this.usersRepository.save({ ...data, password });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async save(user: User) {
    return await this.usersRepository.save(user)
  }
  
  async findOneByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findById(userId: number) {
    return await this.usersRepository.findOne({ where: { id: userId } , relations: ['playlists' , 'playlists.music'] });
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
    return await this.usersRepository.softDelete(id)
  }


  
async findBlockedUsers() {
  return await this.usersRepository
    .createQueryBuilder('user')
    .where('user.isBlocked = :isBlocked', {isBlocked: true})
    .getMany()
    
}
  async findByName(name: string) {
    return await this.usersRepository
      .createQueryBuilder('user')
      .where('user.email Like :name', { name: `%${name}%` })
      .getMany();
  }
}
