import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicsModule } from './musics/musics.module';
import { SearchController } from './search/search.controller';
import { SearchService } from './search/search.service';
import { SearchModule } from './search/search.module';
import { AuthorModule } from './author/author.module';

@Module({
  imports: [AlbumModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      database: 'spotifyproject',
      password: 'mainstreetcoders33', 
      autoLoadEntities: true,
      synchronize: true,
    }),
    

    MusicsModule,

    AuthorModule,
    

    SearchModule

  ],
  controllers: [AppController, SearchController],
  providers: [AppService, SearchService],
})
export class AppModule {}

