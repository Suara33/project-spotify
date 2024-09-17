import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicsRepository } from './musics.repository';
import * as fs from 'fs/promises';
const ffmpeg = require('fluent-ffmpeg');

function getDurationFromBuffer(buffer: Buffer): Promise<number> {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(buffer, (err: any, metadata: any) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(metadata.format.duration);
    });
  });
}

@Injectable()
export class MusicsService {
  constructor(private readonly musicsRepository: MusicsRepository) {}

  async create(createMusicDto: CreateMusicDto, file: Express.Multer.File): Promise<any> {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    const filePath = `/uploads/music/${file.filename}`;
    createMusicDto.filePath = filePath;

    const fileBuffer = await fs.readFile(`./uploads/music/${file.filename}`);

    try {
      const duration = await getDurationFromBuffer(fileBuffer);
      createMusicDto.duration = duration;
    } catch (error) {
      throw new HttpException('Error processing audio file', HttpStatus.INTERNAL_SERVER_ERROR);
    }

     return await this.musicsRepository.create(createMusicDto)
    
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
