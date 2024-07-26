import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicsModule } from './musics/musics.module';
import { UsersModule } from './users/users.module';

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
    

    UsersModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

