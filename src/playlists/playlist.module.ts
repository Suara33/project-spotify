import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { PlaylistRepository } from './playlist.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { S3Service } from 'src/files/services/s3.service';


@Module({
  imports: [TypeOrmModule.forFeature([Playlist])],
  controllers: [PlaylistController],
  providers: [PlaylistService, PlaylistRepository, S3Service],
})
export class PlaylistModule {}
