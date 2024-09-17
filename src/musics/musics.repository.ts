import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MusicEntity } from './entities/music.entity';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';

@Injectable()
export class MusicsRepository {
  constructor(
    @InjectRepository(MusicEntity)
    private musicsRepository: Repository<MusicEntity>,
  ) {}

  async create(data: CreateMusicDto): Promise<MusicEntity> {
    const newMusic = this.musicsRepository.create(data);
    return await this.musicsRepository.save(newMusic);
  }

  async findAll(): Promise<MusicEntity[]> {
    return await this.musicsRepository.find();
  }

  async findOne(id: number): Promise<MusicEntity> {
    return await this.musicsRepository.findOneBy({ id });
  }

  async update(id: number, data: UpdateMusicDto): Promise<MusicEntity> {
    await this.update(id, data) 
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
     await this.musicsRepository.softDelete(id);
  }

  async findByName(name: string) {
    return await this.musicsRepository
      .createQueryBuilder('music')
      .where('music.name Like :name', { name: `%${name}%` })
      .getMany();
  }
}
