import { Injectable} from '@nestjs/common';
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
    author.biography = data.biography
    author.image = image

    return await this.authorRepository.save(author)
  }

  async findAuthorWithAlbums(authorId:number) {
    return await this.authorRepository
        .createQueryBuilder('author')
        .leftJoinAndSelect('author.albums','album')
        .where('author.id =:authorId',{authorId})
        .getOne() 
  
  }


  async save(author:AuthorEntity) {
    return await this.authorRepository.save(author)
  }

  async totalAlbumsOfAuthor(id: number) {
    const total =  await this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.albums', 'album')
      .leftJoinAndSelect('album.musics', 'music')
      .addSelect('COUNT(music.id)', 'totalMusics')
      .groupBy('author.id')
      .addGroupBy('album.id')
      .addGroupBy('music.id')
      .getOne()
console.log(total)
return total
  }

  async totalSongsOfAuthor(id: number) {
    const songs =  await this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.musics', 'musics')
      .addSelect('COUNT(music.id)', 'totalSongs')
      .getOne()

      console.log(songs)
      return songs
  }
  

  async topArtist() {
    return await this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.music', 'music')
      .leftJoinAndSelect('music.listener', 'listener')
      .addSelect('COUNT(listener.id)', 'totalListener')
      .groupBy('author.id') 
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
   const author = await this.authorRepository.findOne({ where: {id}})

   if(!author) {
    throw new Error('Author not found')
   }
 
  await this.authorRepository
    .createQueryBuilder('author')
    .update(AuthorEntity)
    .set({
      fullName: updateAuthorDto.fullName,
      biography: updateAuthorDto.biography
    });

    const updatedAuthor = this.authorRepository.update(id, updateAuthorDto)

    return  updatedAuthor;
  }

  async delete(id: number) { 
    return await this.authorRepository.delete(id);
  }

  async findAuthorById(id: number) {
    return await this.authorRepository
      .createQueryBuilder('author')
      .where('author.id = :id',{id})
      .getOne();
  }

  async findByName(name: string) {
    return await this.authorRepository
      .createQueryBuilder('author')
      .where('author.fullName Like :name', { name: '%${name}%' })
      .getMany();
  }
}
