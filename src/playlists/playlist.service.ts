import { BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistRepository } from './playlist.repository';
import { S3Service } from 'src/files/services/s3.service';
import { MusicsRepository } from 'src/musics/musics.repository';
import { UsersRepository } from 'src/users/users.repository';



@Injectable()
export class PlaylistService {
  constructor ( private readonly playlistRepository: PlaylistRepository,
                private readonly s3Service: S3Service,
                private readonly usersRepository: UsersRepository,
                private musicsRepository: MusicsRepository,
   ) {}


   async create(createPlaylistDto: CreatePlaylistDto, file: Express.Multer.File, userId: number) {
    if (!file) {
      throw new NotFoundException('File is required for creating a playlist');
    }
  
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

  
    const image = await this.s3Service.upload(file);

    return await this.playlistRepository.create(createPlaylistDto, image, user);
  }


  async addMusicToPlaylist(playlistId:number,musicId:number) {
    const playlist = await this.playlistRepository.findOne(playlistId) 
    
    
    if(!playlist) throw new NotFoundException(`playlist with given id ${playlistId} not found`)

    const music = await this.musicsRepository.findOne(musicId)
    if(!music) throw new NotFoundException(`music with id ${musicId} not found`)
    

    const musicExist = playlist.music.some(m => m.id === music.id) 
    if(musicExist){
      throw new BadRequestException('Music already exist in playlist');
    }
    
    playlist.music.push(music)
   

   playlist.count++
   
    return this.playlistRepository.save(playlist)
}

  async findAll(userId:number) {
    return await this.playlistRepository.findAll(userId);
  }

  async findOne(id: number) {
    return await this.playlistRepository.findOne(id);
  }

 async updatePlaylist(id: number, updatePlaylistDto: UpdatePlaylistDto) {
  const playlist = await this.playlistRepository.findOne(id)

  if(!playlist) throw new NotFoundException('playlist not found')
  
  
  const image = await this.s3Service.upload(updatePlaylistDto.file); 

  playlist.name = updatePlaylistDto.name
  playlist.image = image.Location

  return await this.playlistRepository.save(playlist)
 }

  async delete(id: number) {
    const playlist = await this.playlistRepository.findOne(id)

    if(!playlist) {
      throw new NotFoundException(`Playlist with ID ${id} not found`)
    }
    return await this.playlistRepository.remove(id)
  }
}
