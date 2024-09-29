import { Module } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { MusicsController } from './musics.controller';
import { MusicEntity } from './entities/music.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicsRepository } from './musics.repository';
import { S3Service } from 'src/files/services/s3.service';
import { AlbumRepository } from 'src/albums/repository/album.repository';
import { AlbumEntity } from 'src/albums/entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MusicEntity,AlbumEntity])],
  controllers: [MusicsController],
  providers: [MusicsService, MusicsRepository,S3Service,AlbumRepository],
  exports: [MusicsRepository],
})
export class MusicsModule {}
