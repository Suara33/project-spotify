import { Injectable, NotFoundException} from '@nestjs/common';
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
        .leftJoin('album.musics', 'music')
        .where('author.id =:authorId',{authorId})
        .getOne() 
  
  }


  async save(author:AuthorEntity) {
    return await this.authorRepository.save(author)
  }

  async totalAlbumsOfAuthor(id: number) {
    const total = await this.authorRepository
      .createQueryBuilder('author')
      .leftJoin('author.albums', 'album')
      .select('COUNT(album.id)', 'totalAlbums')
      .where('author.id = :id', { id })
      .getRawOne();

    return total;
}

  async totalSongsOfAuthor(id: number) {

    return  await this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.musics', 'music')
      .leftJoinAndSelect('author.albums','album')
      .addSelect('COUNT(musics.id)', 'totalSongs')
      .where('author.id = :id', { id })
      .getOne()

      
  }

  async findAllMusicOfAuthors(authorId: number) { 

    return await this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.musics', 'music')
      .leftJoinAndSelect('music.album','album')
      .where('author.id = :authorId', {authorId})
      .orderBy('music.id', 'ASC')
      .getOne()
  }
  

  async findAllAlbumsOfAuthors(authorId: number){
   const  test =  await this.authorRepository
      .createQueryBuilder('author')
      .leftJoinAndSelect('author.albums', 'album')
      .where('author.id = :authorId', {authorId})
      .orderBy('album.id', 'ASC')
      .select(['author.id', 'author.fullName', 'album.id', 'album.title', 'album.coverImage'])
      .getOne()

      return test
  }

  async topArtists() {
    return await this.authorRepository
        .createQueryBuilder('author')
        .leftJoin('author.musics', 'musics') 
        .leftJoin('musics.listeners', 'listeners') 
        .select([
            'author.image AS authorImage',
            'author.id AS authorId',
            'author.fullName AS authorFullName',
            'musics.id AS musicId',
            'COUNT(listeners.id) AS totalListener'
        ])
        .groupBy('author.id')
        .addGroupBy('musics.id')
        .orderBy('totalListener', 'DESC')
        .limit(10)
        .getRawMany();
}


  async findAll() {
    return await this.authorRepository.find();
  }

  async findOne(id: number) {
    return await this.authorRepository
    .createQueryBuilder('author')
    .where('author.id = :id', {id: id})
    .leftJoinAndSelect('author.album', 'album')
    .leftJoin('albums.musics', 'music')
    .getOne()
  }

  

  async findOneAuthor(id:number) {
    return await this.authorRepository  
        .createQueryBuilder('author')
        .where('author.id = :id',{id})
        .getOne()
  }


  async deleteAuthorById(id: number) {
     return await this.authorRepository.softDelete({id})
 }

  async deleteAuthorWithAlbumsAndMusic(authorId: number) {
    return await this.authorRepository.softDelete(authorId)
  }

  async findAuthorById(id: number) {
    return await this.authorRepository
      .createQueryBuilder('author')
      .where('author.id = :id',{id})
      .getOne();
  }

  async findAuthorByFullName(fullName: string) {
    return await this.authorRepository
    .createQueryBuilder('author')
    .where('author.fullName = :fullName', { fullName})
    .getOne()
  }

  async findByName(name: string) {
    return await this.authorRepository
      .createQueryBuilder('author')
      .where('author.fullName Like :name', { name: `%${name}%` })
      .getMany();
  }

}
