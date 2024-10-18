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
    newMusic.duration = data.duration
    newMusic.trackImage = album.coverImage
    newMusic.authorFullName = author.fullName
  
    return await this.musicsRepository.save(newMusic);
  }


  async topHits() {
    return await this.musicsRepository
      .createQueryBuilder('music')
      .leftJoinAndSelect('music.album', 'album')
      .leftJoinAndSelect('music.author', 'author')
      .leftJoinAndSelect('album.file', 'file')
      .leftJoinAndSelect('music.listeners', 'listener')
      .addSelect('COUNT(DISTINCT listener.id)',  'totalListener')
      .groupBy('music.id')
      .addGroupBy('album.id')
      .orderBy('totalListener', 'DESC')
      .limit(10) 
      .getMany();
  }
  

  async deleteMusicByauthorId(authorId: number) {
  
    return await this.musicsRepository.softDelete({authorId:authorId})

  }

  async save(music: MusicEntity) {
    return await this.musicsRepository.save(music)
  }

  async findAll() {

    return  await this.musicsRepository

      .createQueryBuilder('music')
      .leftJoinAndSelect('music.album', 'album') 
      .leftJoinAndSelect('music.author','author')
      .select(['music', 'album.coverImage', 'album.title', 'author.fullName']) 
      .getMany();
  }

  async findOne(id: number) {
    return await this.musicsRepository
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
      .leftJoin('music.author', 'author')
      .leftJoin('music.album', 'album')
      .where('listener.createAt >= :startOfWeek', { startOfWeek })
      .groupBy('music.id')
      .addSelect('listener.id', 'listenerCount')
      .addSelect(['author.fullName', 'album.title'])
      .orderBy('listenerCount', 'DESC')
      .limit(10)
      .getMany();
  }
  

  async findByName(name: string) {
    return await this.musicsRepository
      .createQueryBuilder('music')
      .where('music.trackTitle Like :name', { name: `%${name}%` })
      .getMany();
  }
}
