
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicsRepository } from './musics.repository';
import { S3Service } from 'src/files/services/s3.service';
import { v4 as uuidv4 } from 'uuid';
import { MusicEntity } from './entities/music.entity';
import { AlbumRepository } from 'src/albums/repository/album.repository';
import { ListenersRepository } from 'src/listeners/listeners.repository';

const { getAudioDurationInSeconds } = require('get-audio-duration')



@Injectable()
export class MusicsService {
  // private bucketName = 'our-general-spotify-bucket';

  constructor(
    private readonly musicsRepository: MusicsRepository,
    private readonly s3Service: S3Service,
    private readonly albumRepository: AlbumRepository,
    private readonly listenersRepository: ListenersRepository
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

      return getAudioDurationInSeconds(tempFilePath).then((duration) => {

        const minutes =  Math.round((duration.toFixed()/60))
        const seconds = duration.toFixed()%60
        

        return `${minutes}:${seconds}`
       
      })
    } catch (error) {
      throw new Error(`Failed to process buffer: ${error.durationFailed}`);
      
    } 
    
  }

  async create(createMusicDto: CreateMusicDto, file: Express.Multer.File): Promise<MusicEntity> {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }
    const album = await this.albumRepository.findOne(+createMusicDto.albumId)

    const filePath = await this.upload(file);

    const duration = await this.getDurationFromBuffer(file.buffer)

    createMusicDto.duration = duration;
    console.log(album , 'albummm')

    const music =  await this.musicsRepository.create(createMusicDto,filePath, album.author);

    album.musics.push(music)
    
    album.count++

    await  this.albumRepository.save(album)

    return music
  }

  async topHits() {
    return await this.musicsRepository.topHits();
  }

  async findAll() {
    return await this.musicsRepository.findAll();
  }

  async findOne(id: number,userId:number) {
   const mus = await this.musicsRepository.findOne(id);
  if(mus) {
    await this.listenersRepository.create(id,userId)
  }
  return mus
  }

  async update(id: number, updateMusicDto: UpdateMusicDto) {
    const music = await this.musicsRepository.findOne(id)
    if(!music) {
      throw new NotFoundException(`Music with ID ${id} not found`)
    }

    music.title = updateMusicDto.trackTitle
    const updateMusic = await this.musicsRepository.update(music)
   
    return updateMusic
  }

  async delete(id: number) {
    return await this.musicsRepository.remove(id);
  }

}



