import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './repository/album.repository';

@Injectable()
export class AlbumService {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.albumRepository.create(createAlbumDto);
  }

  async findAll() {
    return await this.albumRepository.findAll();
  }

  async findOne(id: number) {
    return await this.albumRepository.findOne(id);
  }

  async topAlbums() {
    return await this.albumRepository.topAlbums()
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    await this.albumRepository.update(id, updateAlbumDto);
    return this.albumRepository.findOne(id);
  }

  async remove(id: number) {
    await this.albumRepository.delete(id);
    return { deleted: true };
  }
}
