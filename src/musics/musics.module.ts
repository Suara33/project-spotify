import { Module } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { MusicsController } from './musics.controller';
import { MusicEntity } from './entities/music.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicsRepository } from './musics.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MusicEntity])],
  controllers: [MusicsController],
  providers: [MusicsService, MusicsRepository],
  exports: [MusicsRepository]
})
export class MusicsModule {}
