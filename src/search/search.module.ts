import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { MusicsService } from 'src/musics/musics.service';
import { MusicsModule } from 'src/musics/musics.module';
import { AlbumModule } from 'src/album/album.module';
import { AuthorModule } from 'src/author/author.module';

@Module({
    imports: [MusicsModule, AlbumModule,AuthorModule],
    controllers: [SearchController],
    providers: [SearchService]
})


export class SearchModule {}