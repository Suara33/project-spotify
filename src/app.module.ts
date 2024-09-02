import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './albums/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicsModule } from './musics/musics.module'
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SearchController } from './search/search.controller';
import { SearchService } from './search/search.service';
import { SearchModule } from './search/search.module';
import { AuthorModule } from './authors/author.module';
import { PlaylistModule } from './playlists/playlist.module';
import { ListenersModule } from './listeners/listeners.module';


@Module({
  imports: [AlbumModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database-1.chkge6ee4krk.eu-north-1.rds.amazonaws.com',
      port: 3306,
      username: 'admin',
      database: 'mainstreetcoders',
      password: 'Mainstreetcoders33', 
      autoLoadEntities: true,
      synchronize: true,
    }),
    
    MusicsModule,
    UsersModule,
    AuthModule,
    MusicsModule,
    AuthorModule,
    SearchModule,
    PlaylistModule,
    ListenersModule
  ],
  controllers: [AppController, SearchController],
  providers: [AppService, SearchService],
})
export class AppModule {}

