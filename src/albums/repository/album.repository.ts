import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumEntity } from '../entities/album.entity';
import { Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm'
import { AuthorEntity } from 'src/authors/entities/author.entity';

@Injectable()
export class AlbumRepository {
  
  constructor(@InjectRepository(AlbumEntity) private readonly albumRepository: Repository<AlbumEntity>) {}
  
  async create(createAlbumDto: CreateAlbumDto,file:string,author:AuthorEntity) {

    const album = new AlbumEntity()
    album.title = createAlbumDto.title
    album.author = author
    album.artistName =createAlbumDto.artistName
    // album.file = file

    return await this.albumRepository.save(album)
  
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(id: number) {
    return await this.albumRepository.findOneBy({id});
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
   this.albumRepository.update(id, updateAlbumDto);
   await this.albumRepository.save(updateAlbumDto)

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
