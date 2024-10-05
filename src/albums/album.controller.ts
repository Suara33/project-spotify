import { Controller, Post, UseInterceptors, UploadedFile, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Express } from 'express';


@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post(':id')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Param('id') artistId: number, 
    @UploadedFile() file: Express.Multer.File,
    @Body() createAlbumDto: CreateAlbumDto,
  ) {
    return this.albumService.create(createAlbumDto, file, artistId);
  }

  @Get('topAlbumsOfArtists')
  async topAlbumsOfArtists() {
    return await this.albumService.topAlbumsOfArtist()
  }

  @Get('top-albums')
  async getTopAlbums() {
    return await this.albumService.topAlbums();
  }
  @Get()
  async findAllAlbumsWithMusic(){
    return await this.albumService.findAllAlbumsWithMusic()
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.albumService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return await this.albumService.update(+id, updateAlbumDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.albumService.remove(+id);
  }
}

