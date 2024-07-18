import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './album/album.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AlbumModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      database: 'done',
      password: '123456', 
      autoLoadEntities: true,
      synchronize: true,
    })

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

