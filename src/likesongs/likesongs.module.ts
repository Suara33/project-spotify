import { Module } from '@nestjs/common';
import { LikesongsService } from './likesongs.service';
import { LikesongsController } from './likesongs.controller';
import { likesongsRepository } from './likesongs.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Likesong } from './entities/likesong.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Likesong])],
  controllers: [LikesongsController],
  providers: [LikesongsService,likesongsRepository],
})
export class LikesongsModule {}
