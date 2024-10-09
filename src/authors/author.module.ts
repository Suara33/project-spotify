import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { AuthorRepository } from './repository/author.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from './entities/author.entity';
import { S3Service } from 'src/files/services/s3.service';
import { AlbumRepository } from 'src/albums/repository/album.repository';
import { MusicsRepository } from 'src/musics/musics.repository';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { MusicEntity } from 'src/musics/entities/music.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity, AlbumEntity, MusicEntity])],
  controllers: [AuthorController],
  providers: [AuthorService, AuthorRepository,S3Service, AlbumRepository, MusicsRepository],
  exports: [AuthorRepository]
})
export class AuthorModule {}
