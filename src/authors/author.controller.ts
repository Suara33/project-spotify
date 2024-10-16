import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('author')
@ApiTags('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @UseGuards(AdminGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createAuthorDto: CreateAuthorDto, 
    @UploadedFile() file: Express.Multer.File
  ) {

    return await this.authorService.create(createAuthorDto, file);
  } 

  @Get('withAlbums/:id')
  async findAuthorWithAlbums(@Param('id') id: number) {
    return await this.authorService.findAuthorWithAlbums(id)
  }
  @Get('total-albums/:id')
  async totalAlbumsOfAuthor(@Param('id') id: number) {
    return await this.authorService.totalAlbumsOfAuthor(id)
  }

  @Get('total-songs-of-authors/:id')
  async totalSongsOfAuthor(@Param('id') id: number) {
    return await this.authorService.totalSongsOfAuthor(id)
  }

  @Get('topArtists')
  async topArtists() {
    return await this.authorService.topArtists();
  }

  @Get()
  async findAll() {
    return await this.authorService.findAll();
  }

  @Get('find-all-music-of-authors/:authorId')
  async findAllMusicOfAuthors(@Param('authorId') authorId: number){
    return await this.authorService.findAllMusicOfAuthors(authorId)
  }

  @Get('find-all-album-of-author/:authorId')
  async findAllAlbumsOfAuthors(@Param('authorId') authorId: number){
    return await this.authorService.findAllAlbumsOfAuthors(authorId)
  }

  @Get('findAuthor/:fullName')
  async findAuthorByFullName(@Param('fullName') fullName: string) {
    return this.authorService.findAuthorByFullName(fullName)
  }

  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return await this.authorService.update(+id, updateAuthorDto);
  }

  @Get(':id')
  async findAuthorById(@Param('id') id: number) {
    return await this.authorService.findAuthorById(id)
  }

  @UseGuards(AdminGuard)
  @Delete('deleteAuthor/:id')
  async deleteAuthorWithAlbumsAndMusic(@Param('id') id: number) {
    return await this.authorService.deleteAuthorWithAlbumsAndMusic(id);
  }

  @UseGuards(AdminGuard)
  @Delete(':authorId')
  async deleteAuthorById(@Param('authorId') id: number) {
    return await this.authorService.deleteAuthorById(id)
 }
}
