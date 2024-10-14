import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './repository/album.repository';
import { S3Service } from 'src/files/services/s3.service';
import { AuthorRepository } from 'src/authors/repository/author.repository';
import { MusicsRepository } from 'src/musics/musics.repository';
import { AlbumEntity } from './entities/album.entity';


@Injectable()
export class AlbumService {
  constructor(private readonly albumRepository: AlbumRepository,
              private readonly s3service: S3Service,
              private readonly authorRepository : AuthorRepository,
              private readonly musicsRepository: MusicsRepository,

  ) {}

  async create(createAlbumDto: CreateAlbumDto, file: Express.Multer.File, artistId: number) {

    const author = await this.authorRepository.findAuthorById(artistId)

    if(!author) throw new NotFoundException('author not found')
    

    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }
    
    const image = await this.s3service.upload(file)
  
   author.totalAlbumsOfAuthor++
   
   
   await this.authorRepository.save(author)

    return await this.albumRepository.create(createAlbumDto,image.Location,author)
  }



  async addMusicToAlbum(albumId:number,musicId:number) {
    const album = await this.albumRepository.findOne(albumId)
    if(!album) throw new NotFoundException(`playlist with given id ${albumId} not found`)

    const music = await this.musicsRepository.findOne(musicId)
    if(!music) throw new NotFoundException(`music with given id ${musicId} not found`)

    if (!album.musics.includes(music)) {
        album.count++;
        album.musics.push(music);
      
      } else {
        throw new HttpException('Music already exists in the album', HttpStatus.CONFLICT);
      }

      return this.albumRepository.save(album);
    }

    async topAlbumsOfArtist() {
      return await this.albumRepository.topAlbumsOfArtist();
    }


    async findAllAlbumsWithMusic() {
      return await this.albumRepository.findAllAlbumsWithMusic()
    }

  async topAlbums() {
    return await this.albumRepository.topAlbums()
  }
  async findOne(id: number) {
    const album = await this.albumRepository.findOne(id);
    
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto): Promise<AlbumEntity> {
    
    const existingAlbum = await this.albumRepository.findOne(id);
    if (!existingAlbum) {
      throw new NotFoundException(`Album with ID ${id} not found.`);
    }

   
    return await this.albumRepository.update(id, updateAlbumDto);
  }

  async deleteAlbumByauthorId(authorId: number) {

    return await this.albumRepository.deleteAlbumByauthorId(authorId)
  }
 
  async remove(id: number) {
    const album = await this.albumRepository.findOne(id);
    
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    const author = await this.authorRepository.findAuthorById(album.author.id)

    author.totalAlbumsOfAuthor-=1

    author.totalSongsOfAuthor-=1

    await this.authorRepository.save(author)

    return await this.albumRepository.delete(id)
  }

}