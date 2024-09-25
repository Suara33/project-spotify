import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicsRepository } from './musics.repository';
import * as fs from 'fs/promises';
import { S3Service } from 'src/files/services/s3.service';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';


function getDurationFromBuffer(buffer: Buffer): number {
  return 90
  // return new Promise((resolve, reject) => {
  //   ffmpeg.ffprobe(buffer, (err: any, metadata: any) => {
  //     if (err) {
  //       reject(err);
  //       return 90;
  //     }
  //     resolve(metadata.format.duration);
  //   });
  // });
}
   
@Injectable()
export class MusicsService {
  private bucketName = 'spotify-general-bucket';

  constructor(
    private readonly musicsRepository: MusicsRepository,
    private readonly s3Service: S3Service,
  ) {}

  async upload(file: Express.Multer.File): Promise<string> {
    const fileKey = `uploads/music/${uuidv4()}${path.extname(file.originalname)}`;

    try {
      const fileUrl = await this.s3Service.upload(file);
      return fileUrl.Location;
    } catch (error) {
      throw new HttpException('Failed to upload file to S3', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(createMusicDto: CreateMusicDto, file: Express.Multer.File): Promise<any> {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    const filePath = await this.upload(file);
    createMusicDto.filePath = filePath;

    try {
      const duration = await getDurationFromBuffer(file.buffer);
      createMusicDto.duration = duration;
    } catch (error) {
      throw new HttpException('Error processing audio file', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return await this.musicsRepository.create(createMusicDto);
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
    return await this.musicsRepository.update(id, updateMusicDto);
  }

  async delete(id: number) {
    return await this.musicsRepository.remove(id);
  }
}


// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { CreateMusicDto } from './dto/create-music.dto';
// import { UpdateMusicDto } from './dto/update-music.dto';
// import { MusicsRepository } from './musics.repository';
// import { S3Service } from 'src/files/services/s3.service';
// import path from 'path';
// import { v4 as uuidv4 } from 'uuid';

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
//   private bucketName = 'spotify-general-bucket';
  
//   constructor(
//     private readonly musicsRepository: MusicsRepository,
//     private readonly s3Service: S3Service,
//   ) {}

//   async upload(file: Express.Multer.File): Promise<string> {
//     const fileKey = `uploads/music/${uuidv4()}${path.extname(file.originalname)}`;

//     try {
//       const fileUrl = await this.s3Service.upload(this.bucketName, fileKey, file.buffer, file.mimetype);
//       return fileUrl.Location;
//     } catch (error) {
//       throw new HttpException('Failed to upload file to S3', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   async create(createMusicDto: CreateMusicDto, file: Express.Multer.File): Promise<any> {
//     if (!file) {
//       throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
//     }

//     const filePath = await this.upload(file);
//     createMusicDto.filePath = filePath;

//     try {
//       const duration = await getDurationFromBuffer(file.buffer);
//       createMusicDto.duration = duration;
//     } catch (error) {
//       throw new HttpException('Error processing audio file', HttpStatus.INTERNAL_SERVER_ERROR);
//     }

//     return await this.musicsRepository.create(createMusicDto);
//   }

//   async topHits() {
//     return await this.musicsRepository.topHits();
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






// // import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// // import { CreateMusicDto } from './dto/create-music.dto';
// // import { UpdateMusicDto } from './dto/update-music.dto';
// // import { MusicsRepository } from './musics.repository';
// // import { S3Service } from 'src/files/services/s3.service';
// // import path from 'path';
// // import { v4 as uuidv4 } from 'uuid';

// // const ffmpeg = require('fluent-ffmpeg');


// // function getDurationFromBuffer(buffer: Buffer): Promise<number> {
// //   return new Promise((resolve, reject) => {
// //     ffmpeg.ffprobe(buffer, (err: any, metadata: any) => {
// //       if (err) {
// //         reject(err);
// //         return;
// //       }
// //       resolve(metadata.format.duration);
// //     });
// //   });
// // }

// // @Injectable()
// // export class MusicsService {
// //   private bucketName = 'spotify-general-bucket';
  
// //   constructor(
// //     private readonly musicsRepository: MusicsRepository,
// //     private readonly s3Service: S3Service,
// //   ) {}

// //   async upload(file: Express.Multer.File): Promise<string> {
// //     const fileKey = `uploads/music/${uuidv4()}${path.extname(file.originalname)}`;

// //     try {
// //       const fileUrl = await this.s3Service.upload(this.bucketName, fileKey, file.buffer, file.mimetype);
// //       return fileUrl.Location;
// //     } catch (error) {
// //       throw new HttpException('Failed to upload file to S3', HttpStatus.INTERNAL_SERVER_ERROR);
// //     }
// //   }

// //   async create(createMusicDto: CreateMusicDto, file: Express.Multer.File): Promise<any> {
// //     if (!file) {
// //       throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
// //     }

// //     const filePath = await this.upload(file);
// //     createMusicDto.filePath = filePath;

// //     try {
// //       const duration = await getDurationFromBuffer(file.buffer);
// //       createMusicDto.duration = duration;
// //     } catch (error) {
// //       throw new HttpException('Error processing audio file', HttpStatus.INTERNAL_SERVER_ERROR);
// //     }

// //     return await this.musicsRepository.create(createMusicDto);
// //   }

// //   async topHits() {
// //     return await this.musicsRepository.topHits();
// //   }

// //   async findAll() {
// //     return await this.musicsRepository.findAll();
// //   }

// //   findOne(id: number) {
// //     return this.musicsRepository.findOne(id);
// //   }

// //   async update(id: number, updateMusicDto: UpdateMusicDto) {
// //     return await this.musicsRepository.update(id, updateMusicDto);
// //   }

// //   async delete(id: number) {
// //     return await this.musicsRepository.remove(id);
// //   }
// // }




