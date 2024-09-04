import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistRepository } from './playlist.repository';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/users.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlaylistService {
  constructor ( private readonly playlistRepository: PlaylistRepository ) {}


  async create(createPlaylistDto: CreatePlaylistDto) {
    return  this.playlistRepository.create(createPlaylistDto);
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
