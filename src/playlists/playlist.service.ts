import { Injectable} from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistRepository } from './playlist.repository';


@Injectable()
export class PlaylistService {
  constructor ( private readonly playlistRepository: PlaylistRepository ) {}


  async create(createPlaylistDto: CreatePlaylistDto, file: Express.Multer.File) {
    return  await this.playlistRepository.create(createPlaylistDto, file);
  }

  findAll() {
    return this.playlistRepository.findAll();
  }

  findOne(id: number) {
    return this.playlistRepository.findOne(id);
  }

  async update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
     await this.playlistRepository.update(id, updatePlaylistDto);
     return this.playlistRepository.findOne(id)
  }

  async delete(id: number) {
    return await this.playlistRepository.remove(id);
  }

  
}
