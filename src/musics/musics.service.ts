
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { MusicsRepository } from './musics.repository';
import { S3Service } from 'src/files/services/s3.service';
import { v4 as uuidv4 } from 'uuid';
import { MusicEntity } from './entities/music.entity';
import { AlbumRepository } from 'src/albums/repository/album.repository';
import { ListenersRepository } from 'src/listeners/listeners.repository';
import { AuthorRepository } from 'src/authors/repository/author.repository';

import * as fs from 'fs';
import * as path from 'path';
import { UpdateMusicDto } from './dto/update-music.dto';

const { getAudioDurationInSeconds } = require('get-audio-duration');

@Injectable()
export class MusicsService {
  constructor(
    private readonly musicsRepository: MusicsRepository,
    private readonly s3Service: S3Service,
    private readonly albumRepository: AlbumRepository,
    private readonly listenersRepository: ListenersRepository,
    private readonly authorRepository: AuthorRepository,
  ) {}

  async upload(file: Express.Multer.File): Promise<string> {
    try {
      // const duration = await this.getDurationFromBuffer(file.buffer);
      const fileUrl = await this.s3Service.upload(file);
      
      return fileUrl.Location;
    } catch (error) {
      throw new HttpException('Failed to upload file to S3', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async getDurationFromBuffer(buffer: Buffer): Promise<string> {
    
    const tempFilePath = path.join(__dirname, `${uuidv4()}.mp3`);
    
    
    fs.writeFileSync(tempFilePath, buffer);

    try {
      
      const duration = await getAudioDurationInSeconds(tempFilePath);
      
      
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);

      
      fs.unlinkSync(tempFilePath);

      return `${minutes}:${seconds}`;
    } catch (error) {
      
      fs.unlinkSync(tempFilePath);
      throw new Error(`Failed to process buffer: ${error.message}`);
    }
  }

  async create(createMusicDto: CreateMusicDto, file: Express.Multer.File): Promise<MusicEntity> {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }
    
    const album = await this.albumRepository.findOne(createMusicDto.albumId);
    
    if (!album) {
      throw new NotFoundException(`Album with ID ${createMusicDto.albumId} not found`);
    }

    const filePath = await this.upload(file);

    
    const duration = await this.getDurationFromBuffer(file.buffer);

    
    createMusicDto.duration = duration;


    createMusicDto.trackImage = album.coverImage
    
    const music = await this.musicsRepository.create(createMusicDto, filePath, album.author, album);

    
    album.musics.push(music);

    album.count++;

    album.author.totalSongsOfAuthor++;

    await this.authorRepository.save(album.author);

    await this.albumRepository.save(album);

    return music;
  }

  async topHits() {
    return await this.musicsRepository.topHits();
  }

  async topHitsOfWeek(){
    return await this.musicsRepository.topHitsOfWeek()
  }

  async findAll() {
    return await this.musicsRepository.findAll();
  }

  async update(id: number, updateMusicDto: UpdateMusicDto) {
    const music = await this.musicsRepository.findOne(id)
    if(!music) {
      throw new NotFoundException(`Music with ID ${id} not found`)
    }

    music.trackTitle = updateMusicDto.trackTitle

    const updateMusic = await this.musicsRepository.update(id,updateMusicDto)

    return updateMusic
  }

  async delete(id: number) {
    const music = await this.musicsRepository.findOne(id)
    
    if(!music){
      throw new HttpException('Music not found', HttpStatus.NOT_FOUND)
    }

    const author = await this.authorRepository.findAuthorById(music.author.id);

    author.totalSongsOfAuthor-= 1

    await this.authorRepository.save(author)


    return await this.musicsRepository.delete(id);
  }

  async deleteMusicByauthorId(authorId: number) {
    await this.musicsRepository.deleteMusicByauthorId(authorId)
    
  }


  async findOne(id: number, userId: number){
    const music = await this.musicsRepository.findOne(id);

    if (!music) {
      throw new NotFoundException(`Music with ID ${id} not found`);
    }

    await this.listenersRepository.create(music.id, userId);

    music.listenerCount++;

    await this.musicsRepository.save(music);

    return music;
  }
}
