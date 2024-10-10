import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorRepository } from './repository/author.repository';
import { S3Service } from 'src/files/services/s3.service';
import { AlbumRepository } from 'src/albums/repository/album.repository';
import { MusicsRepository } from 'src/musics/musics.repository';


@Injectable()
export class AuthorService {

  constructor (
              private readonly authorRepository: AuthorRepository,
              private readonly s3Service: S3Service,
              private readonly albumRepository: AlbumRepository,
              private readonly musicsRepository: MusicsRepository

  ) {}

  async findAuthorByFullName(fullName: string) {
    return await this.authorRepository.findAuthorByFullName(fullName)
  }
  async create(createAuthorDto: CreateAuthorDto, file: Express.Multer.File) {
    
    const author = await this.authorRepository.findAuthorByFullName(createAuthorDto.fullName)

    if(author) {
      throw new ConflictException('Author already exist')
    }

    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    
    const image = await this.s3Service.upload(file)
   
    return await this.authorRepository.create(createAuthorDto, image.Location)

  }

  async totalAlbumsOfAuthor(id: number){
    return this.authorRepository.totalAlbumsOfAuthor(id)
  }

  async totalSongsOfAuthor(id: number) {
    return await this.authorRepository.totalSongsOfAuthor(id)
  }

  async topArtists(){
    return await this.authorRepository.topArtists();
  }

  async findAll() {
    return await this.authorRepository.findAll();
  }

  async findOne(id: number) {
    return await this.authorRepository.findOne( id )
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto){
    
    return await this.authorRepository.update(id, updateAuthorDto)
    
  }
  

  async findAuthorById(id: number){
    return await this.authorRepository.findAuthorById(id)
  }  

  async deleteAuthorById(id: number) {
  
   return await this.authorRepository.deleteAuthorById(id)
}

  async deleteAuthorWithAlbumsAndMusic(authorId: number) {
    // const author = await this.authorRepository.findOne(authorId)

   const album = await this.albumRepository.deleteAlbumByauthorId(authorId)

   const music = await this.musicsRepository.deleteMusicByauthorId(authorId)

   const author = await this.authorRepository.deleteAuthorById(authorId)

   return {
    album,
    music,
    author
   }



  }

}
