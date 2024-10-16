import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesRepository } from './favorites.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { UsersRepository } from 'src/users/users.repository';
import { MusicsRepository } from 'src/musics/musics.repository';
import { User } from 'src/users/entities/user.entity';
import { MusicEntity } from 'src/musics/entities/music.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Favorite, User, MusicEntity])],
  controllers:[FavoritesController],
  providers: [FavoritesService,FavoritesRepository, UsersRepository, MusicsRepository],
})
export class LikesongsModule {}
