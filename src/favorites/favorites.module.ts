import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { favoritesController } from './favorites.controller';
import { FavoritesRepository } from './favorites.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite])],
  controllers: [favoritesController],
  providers: [FavoritesService,FavoritesRepository],
})
export class LikesongsModule {}
