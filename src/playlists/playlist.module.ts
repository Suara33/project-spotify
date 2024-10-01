import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { PlaylistRepository } from './playlist.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './entities/playlist.entity';
import { S3Service } from 'src/files/services/s3.service';
import { MusicsModule } from 'src/musics/musics.module';
import { UsersRepository } from 'src/users/users.repository';
import { User } from 'src/users/entities/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Playlist,User]), MusicsModule],
  controllers: [PlaylistController],
  providers: [PlaylistService, PlaylistRepository, S3Service,UsersRepository],
})
export class PlaylistModule {}
