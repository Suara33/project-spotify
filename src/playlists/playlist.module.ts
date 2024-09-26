import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { PlaylistRepository } from './playlist.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { S3Service } from 'src/files/services/s3.service';
import { MusicsRepository } from 'src/musics/musics.repository';
import { MusicEntity } from 'src/musics/entities/music.entity';
import { MusicsModule } from 'src/musics/musics.module';


@Module({
  imports: [TypeOrmModule.forFeature([Playlist]), MusicsModule],
  controllers: [PlaylistController],
  providers: [PlaylistService, PlaylistRepository, S3Service,],
})
export class PlaylistModule {}
