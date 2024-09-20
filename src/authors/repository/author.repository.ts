import { Injectable, Search } from '@nestjs/common';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { AuthorEntity } from '../entities/author.entity';
import { InjectRepository} from '@nestjs/typeorm'
import { Repository } from 'typeorm';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(AuthorEntity) 
    private readonly authorRepository: Repository<AuthorEntity>
  ) {}
  async create(createAuthorDto: CreateAuthorDto) {
    const created = this.authorRepository.create(createAuthorDto);
     return await this.authorRepository.save(created)
  }

  async findAll() {
    return await this.authorRepository.find();
  }

  async findOne(id: number) {
    return await this.authorRepository.findOneBy({id: 1});
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
     await this.update(id, updateAuthorDto)
     return this.authorRepository.findOneBy({id})
  }

  async delete(id: number) { 
    return await this.authorRepository.softDelete(id);
  }

  async findByName(name: string) {
    return await this.authorRepository
      .createQueryBuilder('author')
      .where('author.firstName Like :name', { name: '%${name}%' })
      .getMany();
  }
}
