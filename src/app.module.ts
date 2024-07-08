import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './album/album.module';
import { MusicModule } from './music/music.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AlbumModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'test',
      password: 'mainstreetcoders33',
      database: 'test',
      autoLoadEntities: true,
      synchronize: true,
    }), 
    MusicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
