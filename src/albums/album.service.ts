import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './repository/album.repository';
import * as fs from 'fs/promises';
const ffmpeg = require('fluent-ffmpeg');

@Injectable()
export class AlbumService {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async create(createAlbumDto: CreateAlbumDto, file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    const filePath = `/uploads/music/${file.filename}`;
    createAlbumDto.filePath = filePath; 

    const fileBuffer = await fs.readFile(`./uploads/music/${file.filename}`);

    try {
      
      const duration = await this.getDurationFromBuffer(fileBuffer);
      createAlbumDto.duration = duration; 
    } catch (error) {
      throw new HttpException('Error processing audio file', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    
    return await this.albumRepository.create(createAlbumDto);
  }

  private getDurationFromBuffer(buffer: Buffer): Promise<number> {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(buffer, (err: any, metadata: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(metadata.format.duration);
        }
      });
    });
  }
  async findAll() {
    return await this.albumRepository.findAll();
  }

  
  async findOne(id: number) {
    const album = await this.albumRepository.findOne(id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  
  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumRepository.findOne(id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    await this.albumRepository.update(id, updateAlbumDto);
    return this.albumRepository.findOne(id);
  }

 
  async remove(id: number) {
    const album = await this.albumRepository.findOne(id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

    await this.albumRepository.delete(id);
    return { deleted: true }; 
  }
}

