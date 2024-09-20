import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorRepository } from './repository/author.repository';

@Injectable()
export class AuthorService {
  constructor (private readonly authorRepository: AuthorRepository) {}
  
  async create(createAuthorDto: CreateAuthorDto) {
    return await this.authorRepository.create(createAuthorDto) ;
  }

  async findAll() {
    return await this.authorRepository.findAll();
  }

  async findOne(id: number) {
    return await this.authorRepository.findOne( id )
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    await  this.authorRepository.update(id, updateAuthorDto);
    return this.authorRepository.findOne(id)
  }

  async remove(id: number) {
    await this.authorRepository.delete(id);
    return {deleted :true};
  }
}
