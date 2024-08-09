import { Body, Injectable, Param } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUsersDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    

    constructor(private readonly usersRepository: UsersRepository) {}

    async create(createUserDto: CreateUserDto) {
        return await this.usersRepository.create(createUserDto);
    }

    async findAll() {
        return await this.usersRepository.findAll();
    }

    async findOne(id: number) {
        return this.usersRepository.findById(id);
    }

    async update(id: string, updateUsersDto: UpdateUsersDto) {
        await this.usersRepository.update(id, updateUsersDto);
        

        const user = await this.usersRepository.findById(+id)

        delete user.password

        return user;
    }


    async delete(id: number) {
        return await this.usersRepository.remove(id);
    }



    

}
