import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorRepository } from './repository/author.repository';
import { S3Service } from 'src/files/services/s3.service';
import { AlbumRepository } from 'src/albums/repository/album.repository';
import { MusicsRepository } from 'src/musics/musics.repository';
import { fileURLToPath } from 'url';
import { FilesRepository } from 'src/files/files.repository';


@Injectable()
export class AuthorService {

  constructor (
              private readonly authorRepository: AuthorRepository,
              private readonly s3Service: S3Service,
              private readonly albumRepository: AlbumRepository,
              private readonly musicsRepository: MusicsRepository,
              private readonly fileRepo: FilesRepository,

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

  async findAllMusicOfAuthors(authorId: number){
    return await this.authorRepository.findAllMusicOfAuthors(authorId)
  }


  async findAllAlbumsOfAuthors(authorId: number){
    return await this.authorRepository.findAllAlbumsOfAuthors(authorId)
  }

  async findAll() {
    return await this.authorRepository.findAll();
  }

  async findOne(id: number) {
    return await this.authorRepository.findOne( id )
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto, file: Express.Multer.File) {
    const author = await this.authorRepository.findOneAuthor(id)
     if(!author) throw new NotFoundException(`author with id ${id} not found`)

    const uploadFile = await this.s3Service.upload(file)
    const savedFile = await this.fileRepo.save(file.filename,uploadFile.Location,uploadFile.Key,uploadFile.Bucket)

    author.fullName = updateAuthorDto.fullName
    author.biography = updateAuthorDto.biography
    author.image = savedFile.url
    
    return  await this.authorRepository.save(author);
  }
  
  async findAuthorWithAlbums(id: number) {
    return await this.authorRepository.findAuthorWithAlbums(id)
  }

  async findAuthorById(id: number){
    return await this.authorRepository.findAuthorById(id)
  }  

  async deleteAuthorById(id: number) {
  
   return await this.authorRepository.deleteAuthorById(id)
}

  async deleteAuthorWithAlbumsAndMusic(authorId: number) {

    const findauthor = await this.authorRepository.findOneAuthor(authorId)


    if(!findauthor){
      throw new NotFoundException('Author doesnot exist')
    }

    await this.albumRepository.deleteAlbumByauthorId(authorId)

    await this.musicsRepository.deleteMusicByauthorId(authorId)

    await this.authorRepository.deleteAuthorById(authorId)

    findauthor.totalSongsOfAuthor = 0


    findauthor.totalAlbumsOfAuthor = 0

    return await this.authorRepository.save(findauthor)
    
  }

  

}
