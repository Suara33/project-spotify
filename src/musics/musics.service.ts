import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicsRepository } from './musics.repository';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { S3Service } from 'src/files/services/s3.service';
import { PutObjectAclCommand } from '@aws-sdk/client-s3';
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
  private bucketName: string = 'spotify-general-bucket';

  constructor(
    private readonly musicsRepository: MusicsRepository,
    private readonly s3Service: S3Service,
  ) {}

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileKey = `uploads/music/${uuidv4()}${path.extname(file.originalname)}`;

    try {
      const fileUrl = await this.s3Service.uploadFile(this.bucketName, fileKey, file.buffer, file.mimetype);
      return fileUrl;
    } catch (error) {
      throw new HttpException('Failed to upload file to S3', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(createMusicDto: CreateMusicDto, file: Express.Multer.File): Promise<any> {
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

    return await this.musicsRepository.create(createMusicDto);
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


// import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
// import { PutObjectCommand } from '@aws-sdk/client-s3';
// import { CreateMusicDto } from './dto/create-music.dto';
// import { UpdateMusicDto } from './dto/update-music.dto';
// import { MusicsRepository } from './musics.repository';
// import { v4 as uuidv4 } from 'uuid';
// import * as path from 'path';
// import { S3Service } from 'src/files/services/s3.service';

// const ffmpeg = require('fluent-ffmpeg');

// function getDurationFromBuffer(buffer: Buffer): Promise<number> {
//   return new Promise((resolve, reject) => {
//     ffmpeg.ffprobe(buffer, (err: any, metadata: any) => {
//       if (err) {
//         reject(err);
//         return;
//       }
//       resolve(metadata.format.duration);
//     });
//   });
// }

// @Injectable()
// export class MusicsService {
  
//   private bucketName: string = 'spotify-general-bucket';

//   constructor (private readonly musicsRepository: MusicsRepository,
//               private readonly s3Service: S3Service,

//   ){}

//   async uploadFileToS3(file: Express.Multer.File): Promise<string> {
//     const fileKey = `uploads/music/${uuidv4()}${path.extname(file.originalname)}`;

//     try {
//       const command = new PutObjectCommand({
//         Bucket: this.bucketName,
//         Key: fileKey,
//         Body: file.buffer,
//         ContentType: file.mimetype,
//       });

//       await this.s3Service.send(command);

//       const fileUrl = `https://${this.bucketName}.s3.eu-north-1.amazonaws.com/${fileKey}`;
//       return fileUrl;
//     } catch (error) {
//       throw new HttpException('Failed to upload file to S3', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   async create(createMusicDto: CreateMusicDto, file: Express.Multer.File): Promise<any> {
//     if (!file) {
//       throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
//     }

//     const fileUrl = await this.uploadFileToS3(file);

//     createMusicDto.filePath = fileUrl;

//     try {
//       const duration = await getDurationFromBuffer(file.buffer);
//       createMusicDto.duration = duration;
//     } catch (error) {
//       throw new HttpException('Error processing audio file', HttpStatus.INTERNAL_SERVER_ERROR);
//     }

//     return await this.musicsRepository.create(createMusicDto);
//   }

//   async findAll() {
//     return await this.musicsRepository.findAll();
//   }

//   findOne(id: number) {
//     return this.musicsRepository.findOne(id);
//   }

//   async update(id: number, updateMusicDto: UpdateMusicDto) {
//     return await this.musicsRepository.update(id, updateMusicDto);
//   }

//   async delete(id: number) {
//     return await this.musicsRepository.remove(id);
//   }
// }



// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { CreateMusicDto } from './dto/create-music.dto';
// import { UpdateMusicDto } from './dto/update-music.dto';
// import { MusicsRepository } from './musics.repository';
// import * as fs from 'fs/promises';
// import { S3, S3Client } from '@aws-sdk/client-s3';
// import { S3Service } from 'src/files/services/s3.service';
// const ffmpeg = require('fluent-ffmpeg');

// function getDurationFromBuffer(buffer: Buffer): Promise<number> {
//   return new Promise((resolve, reject) => {
//     ffmpeg.ffprobe(buffer, (err: any, metadata: any) => {
//       if (err) {
//         reject(err);
//         return;
//       }
//       resolve(metadata.format.duration);
//     });
//   });
// }

// @Injectable()
// export class MusicsService {

//   private  s3Service: S3Service;
//   private  bucketName: string = 'spotify-general-bucket';

//   constructor(private readonly musicsRepository: MusicsRepository){
//     this.s3Service = new S3Service({ region: 'eu-north-1'});
//   }
  

//   async uploadFileToS3(createMusicDto: CreateMusicDto, file: Express.Multer.File): Promise<string> {
//     if (!file) {
//       throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
//     }

    
//     const filePath = `https://eu-north-1.console.aws.amazon.com/s3/buckets/spotify-general-bucket?region=eu-north-1&bucketType=general&tab=objects/uploads/music/${file.filename}`;
    
//     createMusicDto.filePath = filePath;

//     const fileBuffer = await fs.readFile(`https://eu-north-1.console.aws.amazon.com/s3/buckets/spotify-general-bucket?region=eu-north-1&bucketType=general&tab=objects/uploads/music/${file.filename}`);

//     try {
//       const duration = await getDurationFromBuffer(fileBuffer);
//       createMusicDto.duration = duration;
//     } catch (error) {
//       throw new HttpException('Error processing audio file', HttpStatus.INTERNAL_SERVER_ERROR);
//     }

//      return await this.musicsRepository.create(createMusicDto)
    
//   }


//   async findAll() {
//     return await this.musicsRepository.findAll();
//   }

//   findOne(id: number) {
//     return this.musicsRepository.findOne(id);
//   }

//   async update(id: number, updateMusicDto: UpdateMusicDto) {
//     return await this.musicsRepository.update(id, updateMusicDto);
//   }

//   async delete(id: number) {
//     return await this.musicsRepository.remove(id);
//   }
// }
