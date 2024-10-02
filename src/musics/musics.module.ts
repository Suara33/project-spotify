import { Module } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { MusicsController } from './musics.controller';
import { MusicEntity } from './entities/music.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicsRepository } from './musics.repository';
import { S3Service } from 'src/files/services/s3.service';
import { AlbumRepository } from 'src/albums/repository/album.repository';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ListenersRepository } from 'src/listeners/listeners.repository';
import { Listener } from 'src/listeners/entities/listener.entity';
import { AuthorRepository } from 'src/authors/repository/author.repository';
import { AuthorEntity } from 'src/authors/entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MusicEntity,AlbumEntity,Listener,AuthorEntity])],
  controllers: [MusicsController],
  providers: [MusicsService, MusicsRepository,S3Service,AlbumRepository,ListenersRepository,AuthorRepository],
  exports: [MusicsRepository],
})
export class MusicsModule {}
