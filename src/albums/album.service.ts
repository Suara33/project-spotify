import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './repository/album.repository';
import { S3Service } from 'src/files/services/s3.service';
import { AuthorRepository } from 'src/authors/repository/author.repository';


@Injectable()
export class AlbumService {
  constructor(private readonly albumRepository: AlbumRepository,
              private readonly s3service: S3Service,
              private readonly authorRepo : AuthorRepository
  ) {}

  async create(createAlbumDto: CreateAlbumDto, file: Express.Multer.File) {

    const author = await this.authorRepo.findAuthorByName(createAlbumDto.artistName)
    if(!author) throw new NotFoundException('author not found')

    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }
    
    const image = await this.s3service.uploadImage(file)


   
    return await this.albumRepository.create(createAlbumDto,image.location,author)
  }

  async findAll() {
    return await this.albumRepository.findAll();
  }

  
  async findOne(id: number) {
    const album = await this.albumRepository.findOne(id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumRepository.findOne(id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    await this.albumRepository.update(id, updateAlbumDto);
    return this.albumRepository.findOne(id);
  }

 
  async remove(id: number) {
    const album = await this.albumRepository.findOne(id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return await this.albumRepository.delete(id);
    
  }
}

