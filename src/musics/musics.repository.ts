import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MusicEntity } from './entities/music.entity';
import { CreateMusicDto } from './dto/create-music.dto';
import { AuthorEntity } from 'src/authors/entities/author.entity';
import { UpdateMusicDto } from './dto/update-music.dto';
import { AlbumEntity } from 'src/albums/entities/album.entity';

@Injectable()
export class MusicsRepository {
  constructor(
    @InjectRepository(MusicEntity)
    private musicsRepository: Repository<MusicEntity>
  ) {}

  async create(data: CreateMusicDto, url: string, author: AuthorEntity, album: AlbumEntity): Promise<MusicEntity> {
  
    const newMusic = new MusicEntity ()
    newMusic.trackTitle = data.trackTitle
    newMusic.filePath = url
    newMusic.authorId = author.id
    newMusic.authorName = author.fullName
    newMusic.duration = data.duration
    newMusic.album = album
    
    

  

    return await this.musicsRepository.save(newMusic);
  }

  async topHits() {
    return await this.musicsRepository
      .createQueryBuilder('music')
      .leftJoinAndSelect('music.album', 'album')
      .leftJoinAndSelect('album.file', 'file')
      .leftJoinAndSelect('music.listeners', 'listener')
      .addSelect('COUNT(listener.id) as totalListener')
      .groupBy('music.id')
      .addGroupBy('album.id')
      .orderBy('totalListener', 'DESC')
      .limit(10)
      .getMany()
  }


  async save(music: MusicEntity) {
    return await this.musicsRepository.save(music)
  }

  async findAll() {
    return await this.musicsRepository
      .createQueryBuilder('music')
      // .leftJoinAndSelect('music.album', 'album') 
      // .select(['music', 'album.coverImage', 'album.title']) 
      .getMany();
  }

  async findOne(id: number) {
    return  await this.musicsRepository
      .createQueryBuilder('music')
      .leftJoinAndSelect('music.author', 'author')
      .leftJoinAndSelect('music.album', 'albums')
      .where('music.id = :id',{ id })
      .getOne()
      
  }


  async update(id: number, updateMusicDto: UpdateMusicDto) {
    const music = await this.findOne(id);

    if (music) {
      
      music.trackTitle = updateMusicDto.trackTitle ?? music.trackTitle;
  

      await this.musicsRepository.save(music);
    }
  }
  async remove(id: number){
     await this.musicsRepository.softDelete(id);
  }

  async findByName(name: string) {
    return await this.musicsRepository
      .createQueryBuilder('music')
      .where('music.title Like :name', { name: `%${name}%` })
      .getMany();
  }
}
