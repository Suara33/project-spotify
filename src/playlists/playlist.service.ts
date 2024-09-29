import { Injectable, NotFoundException} from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistRepository } from './playlist.repository';
import { UserId } from 'src/auth/decorators/userId.decorator';
import { S3Service } from 'src/files/services/s3.service';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { MusicsRepository } from 'src/musics/musics.repository';
import { count } from 'console';


@Injectable()
export class PlaylistService {
  constructor ( private readonly playlistRepository: PlaylistRepository,
                private readonly s3Service: S3Service,
                private musicsRepository: MusicsRepository,
   ) {}


  async create(createPlaylistDto: CreatePlaylistDto, file: Express.Multer.File) {
    let image: ManagedUpload.SendData = null
    if(file){
      
      image = await this.s3Service.upload(file)
    }
  
    return  await this.playlistRepository.create(createPlaylistDto, image);
  }


  async addMusicToPlaylist(playlistId:number,musicId:number) {
    const playlist = await this.playlistRepository.findOne(playlistId)
    if(!playlist) throw new NotFoundException(`playlist with given id ${playlistId} not found`)

    const music = await this.musicsRepository.findOne(musicId)
    if(!music) throw new NotFoundException(`music with id ${musicId} not found`)
    // playlist.count = count++
    // playlist.music.push(music)
    // playlist.count = playlist.music.length

    // return this.playlistRepository.save(playlist)
}

  async findAll(userId:number) {
    return await this.playlistRepository.findAll(userId);
  }

  async findOne(id: number) {
    return await this.playlistRepository.findOne(id);
  }

  async update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
     await this.playlistRepository.update(id, updatePlaylistDto);
     return this.playlistRepository.findOne(id)
  }

  async delete(id: number) {
    return await this.playlistRepository.remove(id);
  }

  
}
