import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorRepository } from './repository/author.repository';
import { S3Service } from 'src/files/services/s3.service';


@Injectable()
export class AuthorService {

  constructor (
    private readonly authorRepository: AuthorRepository,
              private readonly s3Service: S3Service,

  ) {}

  async create(createAuthorDto: CreateAuthorDto, file: Express.Multer.File) {

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

  async remove(id: number) {
    return await this.authorRepository.delete(id);
   }
}
