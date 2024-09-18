import { Module } from '@nestjs/common';
import { ListenersService } from './listeners.service';
import { ListenersController } from './listeners.controller';
import { ListenersRepository } from './listeners.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listener } from './entities/listener.entity';
import { User } from 'src/users/entities/user.entity';
import { MusicEntity } from 'src/musics/entities/music.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Listener, User, MusicEntity])],
  controllers: [ListenersController],
  providers: [ListenersService, ListenersRepository],
  exports: [ListenersRepository]
})
export class ListenersModule {}
