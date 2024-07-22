import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { Author } from '../entities/author.entity';
import {InjectRepository} from '@nestjs/typeorm'
import { Repository } from 'typeorm';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(Author) 
    private readonly authorRepository: Repository<Author>
  ) {}
  async create(createAuthorDto: CreateAuthorDto) {
    const created = this.authorRepository.create(createAuthorDto);
    await this.authorRepository.save(created)
  }

  async findAll() {
    return await this.authorRepository.find();
  }

  async findOne(id: number) {
    return await this.authorRepository.findOneBy({id: 1});
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return this.authorRepository.update(id, updateAuthorDto);
  }

  delete(id: number) { 
    return this.authorRepository.softDelete(1);
  }
}
