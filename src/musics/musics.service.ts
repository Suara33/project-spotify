import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicsRepository } from './musics.repository';
import { S3Service } from 'src/files/services/s3.service';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import ffmpeg from 'fluent-ffmpeg';

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
  private bucketName: string = 'spotify-general-bucket';

  constructor(
    private readonly musicsRepository: MusicsRepository,
    private readonly s3Service: S3Service,
  ) {}

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileKey = `uploads/music/${uuidv4()}-${file.originalname}`;

    try {
      const fileUrl = await this.s3Service.uploadFile(this.bucketName, fileKey, file.buffer, file.mimetype);
      return fileUrl;
    } catch (error) {
      throw new HttpException('Failed to upload file to S3', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async addMusic(createMusicDto: CreateMusicDto, file: Express.Multer.File): Promise<any> {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    const fileUrl = await this.uploadFile(file);
    createMusicDto.filePath = fileUrl;

    try {
      const duration = await getDurationFromBuffer(file.buffer);
      createMusicDto.duration = duration;
    } catch (error) {
      throw new HttpException('Error processing audio file', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return await this.musicsRepository.addMusic(createMusicDto);
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