import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserId } from 'src/auth/decorators/userId.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('authors')
@ApiTags('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

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
  @Get('total-albums')
  async totalAlbumsOfAuthor(@Param('id') id: number) {
    return await this.authorService.totalAlbumsOfAuthor(id)
  }

  @Get('total-songs-of-authors')
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

  @Get('findAuthorFullName/:fullName')
  async findAuthorByFullName(@Param('fullName') fullName: string) {
    return this.authorService.findAuthorByFullName(fullName)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return await this.authorService.update(+id, updateAuthorDto);
  }

  @Get(':id')
  async findAuthorById(@Param('id') id: number) {
    return await this.authorService.findAuthorById(id)
  }

  @Delete('deleteAuthor/:id')
  async deleteAuthorWithAlbumsAndMusic(@Param('id') id: number) {
    return await this.authorService.deleteAuthorWithAlbumsAndMusic(id);
  }

  @Delete(':authorId')
  async deleteAuthorById(@Param('authorId') id: number) {
    return await this.authorService.deleteAuthorById(id)
 }
}
