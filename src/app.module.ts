import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './albums/album.module';
import { MusicsModule } from './musics/musics.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SearchController } from './search/search.controller';
import { SearchService } from './search/search.service';
import { SearchModule } from './search/search.module';
import { AuthorModule } from './authors/author.module';
import { PlaylistModule } from './playlists/playlist.module';
import { ListenersModule } from './listeners/listeners.module';
import { LikesongsModule } from './likesongs/likesongs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: "localhost",
      port: 3306,
      username: "root",
      password: "123456",
      database: "done",
      autoLoadEntities: true,
      synchronize: true,
    }),
    
    AlbumModule,
    MusicsModule,
    UsersModule,
    AuthModule,
    AuthorModule,
    SearchModule,
    PlaylistModule,
    ListenersModule,
    LikesongsModule,
  ],
  controllers: [AppController, SearchController],
  providers: [AppService, SearchService],
})
export class AppModule {}
