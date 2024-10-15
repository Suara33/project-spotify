import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumEntity } from './entities/album.entity';
import { AlbumRepository } from './repository/album.repository';
import { S3Service } from 'src/files/services/s3.service';
import { AuthorRepository } from 'src/authors/repository/author.repository';
import { AuthorEntity } from 'src/authors/entities/author.entity';
import { MusicEntity } from 'src/musics/entities/music.entity';
import { MusicsRepository } from 'src/musics/musics.repository';
import { FilesRepository } from 'src/files/files.repository';
import { FileEntity } from 'src/files/entities/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity,AuthorEntity,MusicEntity,FileEntity])],
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository,S3Service,AuthorRepository,MusicsRepository,FilesRepository],
  exports: [AlbumRepository],
})
export class AlbumModule {} 
