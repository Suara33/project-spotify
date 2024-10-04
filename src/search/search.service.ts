import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'aws-sdk/clients/appstream';
import { AlbumRepository } from 'src/albums/repository/album.repository';
import { AuthorRepository } from 'src/authors/repository/author.repository';
import { MusicsRepository } from 'src/musics/musics.repository';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class SearchService {
  constructor(
    private readonly musicsRepository: MusicsRepository,
    private readonly albumRepository: AlbumRepository,
    private readonly authorRepository: AuthorRepository,
    private readonly usersRepository: UsersRepository,
  ) {}


    async search(name: string) {
      if (!name) {
        throw new NotFoundException('there is no search result');
      }

      const music = await this.musicsRepository.findByName(name);
      const albums = await this.albumRepository.findByName(name);
      const author = await this.authorRepository.findByName(name);

      if (!music || !albums || !author) {
        return 'there is no search result';
      }

      return { 
        music,
        albums,
        author,
      };
    }

    async searchUser(name:string){
      const users = await this.usersRepository.searchUser(name)

      return users
      
    }
  }



