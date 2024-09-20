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

  async create(data: CreateMusicDto) {
    const newMusic = this.musicsRepository.create(data);
    return await this.musicsRepository.save(newMusic);
  }

  async topHits() {
    return await this.musicsRepository
      .createQueryBuilder('music')
      .leftJoinAndSelect('music.image', 'image')
      .leftJoinAndSelect('music.listener', 'listener')
      .addSelect('COUNT(listener.id)', 'totalListener')
      .groupBy('music.id')
      .addGroupBy('photo.id') 
      .orderBy('totalListener', 'DESC')
      .limit(10)
      .getMany()
  }

  async findAll() {
    return await this.musicsRepository.find();
  }

  async findOne(id: number) {
    return await this.musicsRepository.findOneBy({ id });
  }

  async update(id: number, updateMusicDto: UpdateMusicDto) {
     await this.update(id, updateMusicDto)
     return this.musicsRepository.findOne({where: {id}})
  }

  async remove(id: number) {
    return await this.musicsRepository.softDelete(id);
  }

  async findByName(name: string) {
    return await this.musicsRepository
      .createQueryBuilder('music')
      .where('music.name Like :name', { name: `%${name}%` })
      .getMany();
  }
}
