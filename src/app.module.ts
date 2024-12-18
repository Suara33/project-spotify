import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
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
import { LikesongsModule } from './favorites/favorites.module';
import { FilesModule } from './files/files.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guard';





@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
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
    FilesModule,
  ],
  controllers: [AppController, SearchController],
  providers: [AppService, SearchService,
    {
   provide: APP_GUARD,
   useClass: AuthGuard,
  
    },
  
],
})
export class AppModule {}
