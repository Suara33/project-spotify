import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { FavoritesRepository} from './favorites.repository';

@Injectable()
export class FavoritesService {
  constructor(private readonly favoritesRepository: FavoritesRepository) {}

  async create(createFavoriteDto: CreateFavoriteDto) {
    return await this.favoritesRepository.create(createFavoriteDto);
  }

  async findAll() {
    return await this.favoritesRepository.findall();
  }

  findOne(id: number) {
    return this.favoritesRepository.findOne(id);
  }

  update(id: number, UpdateFavoriteDto: UpdateFavoriteDto) {
    return this.favoritesRepository.update(id, UpdateFavoriteDto);
  }

  delete(id: number) {
    return this.favoritesRepository.remove(id);
  }
}
