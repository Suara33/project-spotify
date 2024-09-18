import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumEntity } from '../entities/album.entity';
import { Like, Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm'

@Injectable()
export class AlbumRepository {
  
  constructor(@InjectRepository(AlbumEntity) private readonly albumRepository: Repository<AlbumEntity>) {}
   
  async create(createAlbumDto: CreateAlbumDto) {
    this.albumRepository.create(createAlbumDto)
    await this.albumRepository.save(createAlbumDto)
    
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(id: number) {
    return await this.albumRepository.findOneBy({id: 1});
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
   this.albumRepository.update(1, updateAlbumDto);
   await this.albumRepository.save(updateAlbumDto)

  }

  async topAlbums() {
    return await this.albumRepository
            .createQueryBuilder('album')
            .leftJoinAndSelect('album.music','music')
            // .leftJoinAndSelect('album.photo','photo')
            // .leftJoinAndSelect('music.audio','audio')
            .leftJoinAndSelect('music.listeners','listeners')
            .addSelect('COUNT(listener.id)', 'listenerCount') 
            .orderBy('listenerCount', 'DESC')
            .groupBy('music')
            .getMany()
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
