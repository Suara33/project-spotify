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

  async create(data: CreateMusicDto, url: string): Promise<MusicEntity> {
    const newMusic = this.musicsRepository.create({...data, url});
    return await this.musicsRepository.save(newMusic);
  }


  async topHits() {
    return await this.musicsRepository
      .createQueryBuilder('music')
      .leftJoinAndSelect('music.image', 'image')
      .leftJoinAndSelect('music.listener', 'listener')
      .addSelect('COUNT(listener.id)', 'totalListener')
      .groupBy('music.id')
      .addGroupBy('image.id') 
      .orderBy('totalListener', 'DESC')
      .limit(10)
      .getMany()
  }

  async findAll(): Promise<MusicEntity[]> {

    return await this.musicsRepository.find();
  }

  async findOne(id: number): Promise<MusicEntity> {
    return await this.musicsRepository.findOneBy({ id });
  }

  async update(id: number, updateMusicDto: UpdateMusicDto) {
    const updateMusic =  await this.update(id, updateMusicDto)
     return this.musicsRepository.save(updateMusic)
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
