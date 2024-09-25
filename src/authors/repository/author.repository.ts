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
    author.fullName = data.fullName
    
    author.image = image

    return await this.authorRepository.save(data)
  }

  async findAuthorWithAlbums(authorId:number) {
    return await this.authorRepository
        .createQueryBuilder('author')
        .leftJoinAndSelect('author.albums','album')
        .where('author.id =:authorId',{authorId})
        .getOne()

  }

  async topSongsOfArtist() {
    return await this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.image', "image")
      .leftJoinAndSelect('author.music', 'music')
      .leftJoinAndSelect('music.listener', 'listener')
      .addSelect('COUNT(listener.id)', 'totalListener')
      .groupBy('author.id')
      .addGroupBy('image.id') 
      .addGroupBy('music.id')
      .orderBy('totalListener', 'DESC')
      .limit(10)
      .getMany()
  }

  async findAll() {
    return await this.authorRepository.find();
  }

  async findOne(id: number) {
    return await this.authorRepository.findOneBy({id});
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
     await this.update(id, updateAuthorDto)
     return this.authorRepository.findOneBy({id})
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
