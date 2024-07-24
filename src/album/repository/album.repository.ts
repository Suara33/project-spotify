import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { Album } from '../entities/album.entity';
import { Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm'

@Injectable()
export class AlbumRepository {
  
  constructor(@InjectRepository(Album) private readonly albumRepository: Repository<Album>) {}
   
 
  
  async create(createAlbumDto: CreateAlbumDto) {
    const album=  this.albumRepository.create();
    album.artistName = createAlbumDto.artistName;
    album.releaseDate = createAlbumDto.releaseDate
    await this.albumRepository.save(album)
  
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(id: number) {
    return await this.albumRepository.findOneBy({id: 1});
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    const album=  this.albumRepository.create();
    album.artistName = updateAlbumDto.artistName;
    album.releaseDate = updateAlbumDto.releaseDate
    return this.albumRepository.update(id, album);
  }

  delete(id: number) {
    return this.albumRepository.softDelete(id);
  }
}
