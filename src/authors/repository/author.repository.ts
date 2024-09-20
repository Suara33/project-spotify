import { Injectable, Search } from '@nestjs/common';
import { CreateAuthorDto } from '../dto/create-author.dto';
import { UpdateAuthorDto } from '../dto/update-author.dto';
import { AuthorEntity } from '../entities/author.entity';
import {InjectRepository} from '@nestjs/typeorm'
import {Repository } from 'typeorm';
import { S3Service } from 'src/files/services/s3.service';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(AuthorEntity) 
    private readonly authorRepository: Repository<AuthorEntity>,
    private readonly s3Service: S3Service
  ) {}
  async create(data: CreateAuthorDto, image: string) {

    const author = new AuthorEntity()
    author.firstName = data.firstName
    author.lastName = data.lastName
    author.image = image

    return await this.authorRepository.save(data)
  }

  async findAll() {
    return await this.authorRepository.find();
  }

  async findOne(id: number) {
    return await this.authorRepository.findOneBy({id});
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return await this.authorRepository.update(id, updateAuthorDto);
  }

  async delete(id: number) { 
    return await this.authorRepository.softDelete(id);
  }

  async findAuthorByName(name: string) {
    return await this.authorRepository
      .createQueryBuilder('author')
      .where('author.firstName = :name',{name})
      .getOne();
  }

  async findByName(name: string) {
    return await this.authorRepository
      .createQueryBuilder('author')
      .where('author.firstName Like :name', { name: '%${name}%' })
      .getMany();
  }
}
