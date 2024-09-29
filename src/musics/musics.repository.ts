import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MusicEntity } from './entities/music.entity';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { AuthorEntity } from 'src/authors/entities/author.entity';

@Injectable()
export class MusicsRepository {
  constructor(
    @InjectRepository(MusicEntity)
    private musicsRepository: Repository<MusicEntity>,
  ) {}

  async create(data: CreateMusicDto, url: string, author: AuthorEntity): Promise<MusicEntity> {
    console.log(author)
    const newMusic = new MusicEntity ()
    newMusic.title = data.trackTitle
    newMusic.filePath = url
    newMusic.authorId = author.id
    newMusic.authorName = author.fullName
    newMusic.duration = data.duration

    

    return await this.musicsRepository.save(newMusic);
  }

  async update(music: MusicEntity) {
    return await this.musicsRepository.save(music)
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

  async findOne(id: number) {
    
    return await this.musicsRepository
      .createQueryBuilder('music')
      .leftJoinAndSelect('music.author', 'author')
      .leftJoinAndSelect('music.albums', 'albums')
      .where('music.id = :id',{ id })
      .getOne()
   
  }

  // async update(id: number, updateMusicDto: UpdateMusicDto) {
  //  return 
  // }

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
