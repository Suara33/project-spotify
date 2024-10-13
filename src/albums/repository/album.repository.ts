import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumEntity } from '../entities/album.entity';
import { Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm'
import { AuthorEntity } from 'src/authors/entities/author.entity';


@Injectable()
export class AlbumRepository {
  
  constructor(
    @InjectRepository(AlbumEntity) 
  private readonly albumRepository: Repository<AlbumEntity>
) {}

async deleteAlbumByauthorId(authorId: number) { 
  return await this.albumRepository.softDelete({authorId})
}
  
  async create(createAlbumDto: CreateAlbumDto, file:string, author:AuthorEntity) {

    const album = new AlbumEntity()
    album.title = createAlbumDto.title;
    album.author = author
    album.coverImage = file;
    album.releaseDate = createAlbumDto.releaseDate

    return await this.albumRepository.save(album)
    
  }



  async topAlbumsOfArtist() {
    return await this.albumRepository
      .createQueryBuilder('album')
      .leftJoinAndSelect('album.image', "image")
      .leftJoinAndSelect('album.author', 'author')
      .leftJoinAndSelect('album.music', 'music')
      .leftJoinAndSelect('music.listener', 'listener')
      .addSelect('COUNT(listener.id)', 'totalListener')
      .groupBy('album.id')
      .addGroupBy('image.id') 
      .addGroupBy('music.id')
      .orderBy('totalListener', 'DESC')
      .limit(10)
      .getMany()
  }

  async findAllAlbumsWithMusic() {
    return await this.albumRepository
      .createQueryBuilder('album')
      .leftJoinAndSelect('album.musics', 'music')
      .leftJoinAndSelect('album.author', 'author') 
      .select([
        'album', 
        'music.id', 'music.trackTitle', 'music.duration', 'music.trackImage',
        'author.id', 'author.fullName', 
      ])
      .getMany();
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

 async topAlbums() {
  console.log('shemovida')
  return await this.albumRepository
    .createQueryBuilder('album')
    .leftJoinAndSelect('album.author', 'author')
    .leftJoinAndSelect('album.musics', 'musics') 
    .leftJoinAndSelect('musics.listeners', 'listeners') 
    .addSelect('COUNT(listeners.id)', 'totalListeners') 
    .groupBy('album.id') 
    .addGroupBy('musics.id') 
    .orderBy('totalListeners', 'DESC')  
    .limit(10) 
    .getMany();
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
