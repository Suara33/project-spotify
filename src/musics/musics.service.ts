import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicsRepository } from './musics.repository';

@Injectable()
export class MusicsService {
  constructor(private readonly musicsRepository: MusicsRepository) {}

  async create(createMusicDto: CreateMusicDto) {
    return await this.musicsRepository.create(createMusicDto);
  }

  async findAll() {
    return await this.musicsRepository.findAll();
  }

  findOne(id: number) {
    return this.musicsRepository.findOne(id);
  }

  async update(id: number, updateMusicDto: UpdateMusicDto) {
    return await this.musicsRepository.update(id, updateMusicDto);
  }

  async delete(id: number) {
    return await this.musicsRepository.remove(id);
  }
}
