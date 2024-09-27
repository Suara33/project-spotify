import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './repository/album.repository';
import { S3Service } from 'src/files/services/s3.service';
import { AlbumEntity } from './entities/album.entity';
import { AuthorRepository } from 'src/authors/repository/author.repository';
import { AuthorEntity } from 'src/authors/entities/author.entity';
import { MusicsRepository } from 'src/musics/musics.repository';


@Injectable()
export class AlbumService {
  constructor(private readonly albumRepository: AlbumRepository,
              private readonly s3service: S3Service,
              private readonly authorRepository : AuthorRepository,
              private readonly musicsRepository: MusicsRepository,

  ) {}

  async create(createAlbumDto: CreateAlbumDto, file: Express.Multer.File) {

    const author = await this.authorRepository.findAuthorByName(createAlbumDto.artistName)

    if(!author) throw new NotFoundException('author not found')

    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }
    
    const image = await this.s3service.upload(file)
  
   
    return await this.albumRepository.create(createAlbumDto,image.Location,author)
  }

  async addMusicToAlbum(albumId:number,musicId:number) {
    const album = await this.albumRepository.findOne(albumId)
    if(!album) throw new NotFoundException(`playlist with given id ${albumId} not found`)

    const music = await this.musicsRepository.findOne(musicId)
    if(!music) throw new NotFoundException(`music with id ${musicId} not found`)

    if (!album.music.includes(music)) {
        album.count++;
        album.music.push(music);
        return this.albumRepository.save(album);
      } else {
        throw new HttpException('Music already exists in the album', HttpStatus.CONFLICT);
      }
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
    return await this.albumRepository.update(id, updateAlbumDto);
  }

 
  async remove(id: number) {
    const album = await this.albumRepository.findOne(id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    return await this.albumRepository.delete(id)
  }

}