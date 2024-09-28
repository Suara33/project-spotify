
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicsRepository } from './musics.repository';
import { S3Service } from 'src/files/services/s3.service';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';
import * as os from 'os';
import { error } from 'console';

const { getAudioDurationInSeconds } = require('get-audio-duration')



@Injectable()
export class MusicsService {
  // private bucketName = 'our-general-spotify-bucket';

  constructor(
    private readonly musicsRepository: MusicsRepository,
    private readonly s3Service: S3Service,
  ) {}

  async upload(file: Express.Multer.File): Promise<string> {


    try {
      const fileUrl = await this.s3Service.upload(file);
      return fileUrl.Location;
    } catch (error) {
      throw new HttpException('Failed to upload file to S3', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async getDurationFromBuffer(buffer: Buffer): Promise<number> {
    const tempFilePath = `./${uuidv4()}.mp3`;

    try {
      await fs.writeFile(tempFilePath, buffer);

      return getAudioDurationInSeconds(tempFilePath).then((duration) => {

        const minutes =  Math.round((duration.toFixed()/60))
        const seconds = duration.toFixed()%60
        

        return `${minutes}:${seconds}`
       
      })
    } catch (error) {
      throw new Error(`Failed to process buffer: ${error.durationFailed}`);
      
    } 
    
  }

  async create(createMusicDto: CreateMusicDto, file: Express.Multer.File): Promise<any> {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    const filePath = await this.upload(file);
    const duration = await this.getDurationFromBuffer(file.buffer)
    createMusicDto.duration = duration;

    return await this.musicsRepository.create(createMusicDto,filePath);
  }

  async topHits() {
    return await this.musicsRepository.topHits();
  }

  async findAll() {
    return await this.musicsRepository.findAll();
  }

  findOne(id: number) {
    return this.musicsRepository.findOne(id);
  }

  async update(id: number, updateMusicDto: UpdateMusicDto) {
    const music = await this.musicsRepository.findOne(id)
    if(!music) {
      throw new NotFoundException(`Music with ID ${id} not found`)
    }

  }

  async delete(id: number) {
    return await this.musicsRepository.remove(id);
  }

}



