import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumEntity } from '../entities/album.entity';
import { Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm'
import { AuthorEntity } from 'src/authors/entities/author.entity';

@Injectable()
export class AlbumRepository {
  
  constructor(@InjectRepository(AlbumEntity) 
  private readonly albumRepository: Repository<AlbumEntity>) {}
  
  async create(createAlbumDto: CreateAlbumDto,file:string,author:AuthorEntity) {

    const album = new AlbumEntity()
    album.title = createAlbumDto.albumTitle;
    album.author = author;
    album.artistName =createAlbumDto.artistName;
    album.coverImage = file;
    

    return await this.albumRepository.save(album)
  
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(id: number) {
    return await this.albumRepository.findOneBy({id});
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return await this.albumRepository.update(id, updateAlbumDto);
 }


   async save(album: AlbumEntity) {
    return await this.albumRepository.save(album)
   }

  async delete(id: number) {
    return await this.albumRepository.delete(id);
  }

  async findByName(name: string) {
    return  this.albumRepository
      .createQueryBuilder('album')
      .where('album.title Like :name', { name: '%${name}%'})
      .getMany()
  }
}
