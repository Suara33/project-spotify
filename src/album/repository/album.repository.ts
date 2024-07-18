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
    const created=  this.albumRepository.create(createAlbumDto);
    await this.albumRepository.save(created)
  
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(id: number) {
    return await this.albumRepository.findOneBy({id: 1});
  }

  update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return this.albumRepository.update(id, updateAlbumDto);
  }

  delete(id: number) {
    return this.albumRepository.softDelete(1);
  }
}
