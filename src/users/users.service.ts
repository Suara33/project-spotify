import { ConflictException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUsersDto } from './dto/update-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserGuard } from 'src/auth/guards/user.guard';


@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService : JwtService

  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOneByEmail(createUserDto.email)

    if(existingUser) { 
      
      throw new ConflictException(`User with email ${createUserDto.email} already exists`) }

    const createUser = await this.usersRepository.create(createUserDto)

    const payload = { userId: createUser.id, userEmail: createUser.email,role: createUser.role };

    const jwtToken = await this.jwtService.signAsync(payload);

    return {access_token: jwtToken,user: createUser}
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findOne(id: number) {
    return this.usersRepository.findById(id);
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
