
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicsRepository } from './musics.repository';
import { S3Service } from 'src/files/services/s3.service';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';
import * as os from 'os';

const { getAudioDurationInSeconds } = require('get-audio-duration')



@Injectable()
export class MusicsService {
  private bucketName = 'our-general-spotify-bucket';

  constructor(
    private readonly musicsRepository: MusicsRepository,
    private readonly s3Service: S3Service,
  ) {}



  // private async getDurationFromBuffer(buffer: string): Promise<number> {

  //   duration = await new Promise<number>((resolve, reject) => {
  //     ffmpeg.ffprobe(tempFilePath, (err, metadata) => {
  //       if (err) {
  //         return reject(err);
  //       }
  //       resolve(metadata.format.duration);
  //     });
  //   });
  
  //   console.log(buffer , 'buffer')
  //   try {


  //   return await  new Promise((resolve, reject) => {
  //       ffmpeg.ffprobe(buffer, (err, metadata) => {
  //           if (err) {
  //               reject(err);
  //               return;
  //           }
  //           resolve(metadata.format.duration);
  //       });
  //   });

  //   } catch (error) {
  //     throw new Error(`Failed to process buffer: ${error.message}`);
  //   } finally {
  //     try {
    
  //     } catch (cleanupError) {
  //       console.error(`Failed to delete temp file: ${cleanupError.message}`);
  //     }
  //   }
  // }

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
      // Write buffer to a temporary file
      await fs.writeFile(tempFilePath, buffer);

      console.log(tempFilePath)


      return getAudioDurationInSeconds(tempFilePath).then((duration) => {
        return duration.toFixed(0.00)
      })
    } catch (error) {
      throw new Error(`Failed to process buffer: ${error.message}`);
    } 
  }

  async create(createMusicDto: CreateMusicDto, file: Express.Multer.File): Promise<any> {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    const filePath = await this.upload(file);
    const duration = await this.getDurationFromBuffer(file.buffer)
    createMusicDto.duration = duration;

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
// import { promises as fs } from 'fs';
// import * as os from 'os';
// import ffmpeg from 'fluent-ffmpeg';

// @Injectable()
// export class MusicsService {
//   private bucketName = 'spotify-general-bucket';

//   constructor(
//     private readonly musicsRepository: MusicsRepository,
//     private readonly s3Service: S3Service,
//   ) {}

//   // Function to get the duration of the audio file from the buffer
//   private async getDurationFromBuffer(buffer: Buffer): Promise<number> {
//     const tempFilePath = path.join(os.tmpdir(), `${uuidv4()}.mp3`);

//     try {
//       await fs.writeFile(tempFilePath, buffer);

//       return new Promise((resolve, reject) => {
//         ffmpeg.ffprobe(tempFilePath, (err: any, metadata: any) => {
//           if (err) {
//             reject(new Error(`ffmpeg.ffprobe error: ${err.message}`));
//             return;
//           }
//           resolve(metadata.format.duration);
//         });
//       });
//     } catch (error) {
//       throw new Error(`Failed to process buffer: ${error.message}`);
//     } finally {
//       try {
//         await fs.unlink(tempFilePath); // Ensure temporary file is cleaned up
//       } catch (cleanupError) {
//         console.error(`Failed to delete temp file: ${cleanupError.message}`);
//       }
//     }
//   }

//   // Method to upload the file to S3 and return the file URL
//   async upload(file: Express.Multer.File): Promise<string> {
//     const fileKey = `uploads/music/${uuidv4()}${path.extname(file.originalname)}`;

//     try {
//       const fileUrl = await this.s3Service.upload(file);
//       return fileUrl.Location;
//     } catch (error) {
//       throw new HttpException('Failed to upload file to S3', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }

//   // Method to create a new music record
//   async create(createMusicDto: CreateMusicDto, file: Express.Multer.File): Promise<any> {
//     if (!file) {
//       throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
//     }

//     const filePath = await this.upload(file);
//     createMusicDto.filePath = filePath;

//     try {
//       const duration = await this.getDurationFromBuffer(file.buffer); // Call the duration function here
//       createMusicDto.duration = duration;
//     } catch (error) {
//       throw new HttpException('Error processing audio file', HttpStatus.INTERNAL_SERVER_ERROR);
//     }

//     return await this.musicsRepository.create(createMusicDto);
//   }

//   // Other service methods remain unchanged
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





// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { CreateMusicDto } from './dto/create-music.dto';
// import { UpdateMusicDto } from './dto/update-music.dto';
// import { MusicsRepository } from './musics.repository';
// import { S3Service } from 'src/files/services/s3.service';
// import path from 'path';
// import { v4 as uuidv4 } from 'uuid';
// import { promises as fs } from 'fs';
// import ffmpeg from 'fluent-ffmpeg';
// import * as os from 'os';

// async function getDurationFromBuffer(tempFilePath: any): Promise<number> {
//   //const tempFilePath = path.join(os.tmpdir(), `${uuidv4()}.mp3`);

//   try {
//     //await fs.writeFile(tempFilePath, buffer);

//     return await new Promise((resolve, reject) => {
//       ffmpeg.ffprobe(tempFilePath, (err: any, metadata: any) => {
//         if (err) {
//           reject(err);
//           return;
//         }
//         console.log(metadata , 'metadataa')
//         resolve(metadata.format.duration);
//       });
//     });
//   } finally {
//     await fs.unlink(tempFilePath);
//   }
// }

   
// @Injectable()
// export class MusicsService {
//   private bucketName = 'our-general-spotify-bucket';

//   constructor(
//     private readonly musicsRepository: MusicsRepository,
//     private readonly s3Service: S3Service,
//   ) {}

//   async upload(file: Express.Multer.File): Promise<string> {
//     //const fileKey = `uploads/music/${uuidv4()}${path.extname(file.originalname)}`;

//     try {
//       const fileUrl = await this.s3Service.upload(file);
//       console.log(fileUrl , 'ulrrr')
//       return fileUrl.Location;
//     } catch (error) {
//       throw new HttpException('Failed to upload file to S3', HttpStatus.INTERNAL_SERVER_ERROR);
//     }
//   }



  
//   // async create(createMusicDto: CreateMusicDto, file: Express.Multer.File): Promise<any> {
//   //   if (!file) {
//   //     throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
//   //   }

//   //   const filePath = await this.upload(file);
//   //   console.log(filePath , 'filepath')
//   //   // createMusicDto.filePath = filePath;

//   //   try {
//   //     const duration = await getDurationFromBuffer(filePath);
//   //     console.log(duration , 'duration')
//   //     // createMusicDto.duration = duration;
//   //   } catch (error) {
//   //     throw new HttpException('Error processing audio file', HttpStatus.INTERNAL_SERVER_ERROR);
//   //   }

//   //   return await this.musicsRepository.create(createMusicDto);
//   // }

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



