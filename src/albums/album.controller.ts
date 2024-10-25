import { Controller, Post, UseInterceptors, UploadedFile, Body, Get, Param, Patch, Delete, UseGuards, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Express } from 'express';
import { AdminGuard } from 'src/auth/guards/admin.guard'; 
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiConsumes, ApiParam } from '@nestjs/swagger';

@Controller('album')
@ApiTags('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @UseGuards(AdminGuard)
  @Post(':id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Create a new album' })
  @ApiParam({ name: 'id', description: 'The ID of the artist creating the album' })
  @ApiBody({ type: CreateAlbumDto, description: 'Details for creating a new album' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'The album has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Invalid data.' })
  async create(
    @Param('id') artistId: number, 
    @UploadedFile() file: Express.Multer.File,
    @Body() createAlbumDto: CreateAlbumDto,
  ) {
    return this.albumService.create(createAlbumDto, file, artistId);
  }

  @Get('topAlbumsOfArtists')
  @ApiOperation({ summary: 'Get top albums of artists' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved the top albums of artists.' })
  async topAlbumsOfArtists() {
    return await this.albumService.topAlbumsOfArtist();
  }

  @Get()
  async findAllAlbums(){
    return await this.albumService.findAllAlbums()
  }

  async addMusicToAlbum(
  @Param('albumId') albumId: number, 
  @Param('musicId') musicId: number,
  @UploadedFile() file: Express.Multer.File,
 ){
    return await this.albumService.addMusicToAlbum(albumId,musicId)
  }

  @Get('top-albums')
  @ApiOperation({ summary: 'Get top albums' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved the top albums.' })
  async getTopAlbums() {
    return await this.albumService.topAlbums();
  }

  @Get('albumsWithMusic')
  @ApiOperation({ summary: 'Get all albums with their music tracks' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved all albums with music tracks.' })
  async findAllAlbumsWithMusic() {
    return await this.albumService.findAllAlbumsWithMusic();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get album by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the album to retrieve' })
  @ApiResponse({ status: 200, description: 'Successfully retrieved the album.' })
  @ApiResponse({ status: 404, description: 'Album not found.' })
  async findOne(@Param('id') id: string) {
    return await this.albumService.findOne(+id);
  }
  
  @UseGuards(AdminGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Update an album by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the album to update' })
  @ApiBody({ type: UpdateAlbumDto, description: 'Details for updating the album' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'The album has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Album not found.' })
  async update(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return await this.albumService.update(id, updateAlbumDto, file);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an album by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the album to delete' })
  @ApiResponse({ status: 200, description: 'The album has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Album not found.' })
  async remove(@Param('id') id: string) {
    return await this.albumService.remove(+id);
  }

  @UseGuards(AdminGuard)
  @Delete('author/:authorId')
  @ApiOperation({ summary: 'Delete all albums by author ID' })
  @ApiParam({ name: 'authorId', description: 'The ID of the author whose albums will be deleted' })
  @ApiResponse({ status: 200, description: 'All albums of the author have been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Author not found.' })
  async deleteAlbumByauthorId(@Param('authorId') authorId: number) {
    return this.albumService.deleteAlbumByauthorId(authorId);
  }
}
