import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumEntity } from '../entities/album.entity';
import { Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm'
import { AuthorEntity } from 'src/authors/entities/author.entity';
import { title } from 'process';

@Injectable()
export class AlbumRepository {
  
  constructor(@InjectRepository(AlbumEntity) 
  private readonly albumRepository: Repository<AlbumEntity>) {}
  
  async create(createAlbumDto: CreateAlbumDto, file:string, author:AuthorEntity) {

    const album = new AlbumEntity()
    album.title = createAlbumDto.title;
    album.author = author;
    album.artistName = author.fullName;
    album.coverImage = file;
    
    return await this.albumRepository.save(album)
    
  }

  async findAll() {
    return await this.albumRepository
      .createQueryBuilder('album')
      .getMany()
  }

  async findOne(id: number) {
    return await this.albumRepository
      .createQueryBuilder('album')
      .leftJoinAndSelect('album.musics', 'musics')
      .leftJoinAndSelect('album.author', 'author')
      .where('album.id = :id', {id})
      .getOne()
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
     await this.albumRepository
      .createQueryBuilder('album')
      .update('AlbumEntity')
      .set({
        title: updateAlbumDto.title,
        releaseDate: updateAlbumDto.releaseDate,
      })
      .where('id = :id', { id })
      .execute()

      const updatedAlbum = await this.albumRepository.findOne({where: {id}})

      return updatedAlbum
 }

 

   async save(album: AlbumEntity) {
    return await this.albumRepository.save(album)
   }

  async delete(id: number) {
    return await this.albumRepository.softDelete(id);
  }

  async findByName(name: string) {
    return  this.albumRepository
      .createQueryBuilder('album')
      .where('album.title Like :name', { name: '%${name}%'})
      .getMany()
  }
}
