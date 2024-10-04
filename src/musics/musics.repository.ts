import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MusicEntity } from './entities/music.entity';
import { CreateMusicDto } from './dto/create-music.dto';
import { AuthorEntity } from 'src/authors/entities/author.entity';
import { UpdateMusicDto } from './dto/update-music.dto';

@Injectable()
export class MusicsRepository {
  constructor(
    @InjectRepository(MusicEntity)
    private musicsRepository: Repository<MusicEntity>,
  ) {}

  async create(data: CreateMusicDto, url: string, author: AuthorEntity): Promise<MusicEntity> {
  
    const newMusic = new MusicEntity ()
    newMusic.title = data.trackTitle
    newMusic.filePath = url
    newMusic.authorId = author.id
    newMusic.authorName = author.fullName
    newMusic.duration = data.duration

  

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
//   async topHits() {
//     return await this.musicsRepository
//       .createQueryBuilder('music')
//       .leftJoinAndSelect('music.album', 'album') 
//       .leftJoinAndSelect('album.title', 'title')
//       .leftJoinAndSelect('album.coverImage', 'coverImage')
//       .leftJoinAndSelect('music.listeners', 'listener')
//       .select('album.title as title') 
//       .addSelect('album.coverImage as coverImage')
//       .addSelect('COUNT(listener.id)', 'totalListener') 
//       .groupBy('music.id')
//       .addGroupBy('album.id')
//       .addGroupBy('file.id')
//       .orderBy('totalListener', 'DESC') 
//       .limit(10)
//       .getMany(); 
// }
// async topHits() {
//   return await this.musicsRepository
//     .createQueryBuilder('music')
//     .leftJoinAndSelect('music.album', 'album') // Join the album entity
//     .leftJoinAndSelect('music.listeners', 'listener') // Join the listeners
//     .select('music') // Select music entity
//     .addSelect('album.title', 'albumTitle') // Select the album title
//     .addSelect('album.coverImage', 'albumCoverImage') // Select the album cover image
//     .addSelect('COUNT(listener.id)', 'totalListener') // Count the listeners
//     .groupBy('music.id') // Group by music ID
//     .addGroupBy('album.id') // Group by album ID
//     .orderBy('totalListener', 'DESC') // Order by the total listeners
//     .limit(10) // Limit to top 10 results
//     .getMany(); // Execute and return results
// }
// async topHits() {
//   return await this.musicsRepository
//     .createQueryBuilder('music')
//     .leftJoinAndSelect('music.album', 'album') // Join the album entity
//     .leftJoinAndSelect('music.listeners', 'listener')
//     .select('music') // Select the entire music entity
//     .addSelect('album.title', 'albumTitle') // Select the album title
//     .addSelect('album.coverImage', 'albumCoverImage') // Select the album cover image
//     .addSelect('COUNT(listener.id)', 'totalListener')
//     .groupBy('music.id') // Group by music ID
//     .addGroupBy('album.id') // Group by album ID
//     .orderBy('totalListener', 'DESC') // Order by the total listeners
//     .limit(10) // Limit to top 10 results
//     .getMany(); // Execute and return results
// }


  async save(music: MusicEntity) {
    return await this.musicsRepository.save(music)
  }

  async findAll(): Promise<MusicEntity[]> {

    return await this.musicsRepository.find();
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
    const music = await this.findOne(id)
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
