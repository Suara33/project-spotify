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
    newMusic.trackImage = album.coverImage
    // newMusic.album = album
   
    return await this.musicsRepository.save(newMusic);
  }


  async topHits() {
    return await this.musicsRepository
      .createQueryBuilder('music')
      .leftJoinAndSelect('music.album', 'album')
      .leftJoinAndSelect('album.file', 'file')
      .leftJoinAndSelect('music.listeners', 'listener')
      .addSelect('COUNT(listener.id)',  'totalListener')
      .groupBy('music.id')
      .addGroupBy('album.id')
      .addGroupBy('trackImage.id')
      .orderBy('totalListener', 'DESC')
      .limit(10) 
      .getMany();
  }
  
  // async topHits() {
  //   return await this.musicsRepository
  //     .createQueryBuilder('music')
  //     .leftJoinAndSelect('music.album', 'album')
  //     .leftJoinAndSelect('album.file', 'file')
  //     .leftJoinAndSelect('music.listener', 'listener')
  //     .addSelect('COUNT(listener.id) as totalListener')
  //     .groupBy('music.id')
  //     .addGroupBy('album.id')
  //     .orderBy('totalListener', 'DESC')
  //     .limit(10)
  //     .getMany()
  // }


  async deleteMusicByauthorId(authorId: number) {
  
    return await this.musicsRepository.softDelete({authorId:authorId})

  }

  async save(music: MusicEntity) {
    return await this.musicsRepository.save(music)
  }

  async findAll() {
    return await this.musicsRepository
      .createQueryBuilder('music')
      .leftJoinAndSelect('music.album', 'album') 
      .select(['music', 'album.coverImage', 'album.title']) 
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
  

      return await this.musicsRepository.save(music);
    }
    throw new Error('Music not found')
  }
  async delete(id: number){
    return await this.musicsRepository.softDelete(id);
  }

  async topHitsOfWeek(){
    const startOfWeek =  new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  
    return  await this.musicsRepository
      .createQueryBuilder('music')
      .leftJoin('music.listeners', 'listener')
      .where('listener.createAt >= :startOfWeek', { startOfWeek })
      .groupBy('music.id')
      .addSelect('listener.id', 'listenerCount')
      .orderBy('listenerCount', 'DESC')
      .limit(10)
      .getMany();
  }

  // async topHitsOfWeek() {
  //   return this.musicsRepository
  //     .createQueryBuilder('music')
  //     .leftJoin('music.music_listens', 'music_listen') // Join the correct table for listens
  //     .leftJoin('music_listen.listener', 'listener') // Join listeners through the pivot table
  //     .where('music_listen.listenedAt >= :startOfWeek', { startOfWeek: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) })
  //     .groupBy('music.id')
  //     .addSelect('COUNT(listener.id)', 'listenerCount') // Count the number of listeners
  //     .orderBy('listenerCount', 'DESC')
  //     .limit(10)
  //     .getMany();
  // }
  

  async findByName(name: string) {
    return await this.musicsRepository
      .createQueryBuilder('music')
      .where('music.trackTitle Like :name', { name: `%${name}%` })
      .getMany();
  }
}
