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
    
    const image = await this.s3Service.uploadImage(file)

   
    return await this.authorRepository.create(createAuthorDto, image.location)

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
