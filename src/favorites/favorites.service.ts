import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { FavoritesRepository} from './favorites.repository';
import { MusicsRepository } from 'src/musics/musics.repository';
import { UsersRepository } from 'src/users/users.repository';
import { identity } from 'rxjs';

@Injectable()
export class FavoritesService {
  constructor(private readonly favoritesRepository: FavoritesRepository,
              private readonly musicsRepository: MusicsRepository,
              private readonly usersRepository: UsersRepository,
  ) {}

  // async create( userId: number) {
  //   const user = this.usersRepository.findById(userId)
  //   if(!user){
  //     throw new NotFoundException(`User with Id ${userId} not found`)
  //   }
  //   return await this.favoritesRepository.create(userId);
  // }

   

  async findAll() {
    return await this.favoritesRepository.findall();
  }

  findOne(id: number) {
    return this.favoritesRepository.findOne(id);
  }

  async addMusicToFavorites(musicId: number) {
    
  }
  update(id: number, UpdateFavoriteDto: UpdateFavoriteDto) {
    return this.favoritesRepository.update(id, UpdateFavoriteDto);
  }

  delete(id: number) {
    return this.favoritesRepository.remove(id);
  }
}
