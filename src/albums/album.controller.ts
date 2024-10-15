import { Controller, Post, UseInterceptors, UploadedFile, Body, Get, Param, Patch, Delete, UseGuards, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Express } from 'express';
import { AdminGuard } from 'src/auth/guards/admin.guard'; 
import { ApiTags } from '@nestjs/swagger';


@Controller('album')
@ApiTags('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @UseGuards(AdminGuard)
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

  @UseGuards(AdminGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: number,
    @UploadedFile() file:Express.Multer.File,
    @Body() updateAlbumDto: UpdateAlbumDto,) {
    return await this.albumService.update(id, updateAlbumDto,file);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.albumService.remove(+id);
  }


  @UseGuards(AdminGuard)
  @Delete('author/:authorId')
  async deleteAlbumByauthorId(@Param('authorId') authorId: number) {
    return this.albumService.deleteAlbumByauthorId(authorId)
  }
}

