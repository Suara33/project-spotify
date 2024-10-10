import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserId } from 'src/auth/decorators/userId.decorator';

@Controller('authors')
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

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return await this.authorService.findOne(+id);
  // }

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
  async deleteAuthorWithAlbumsAndMusic(id: number) {
    return await this.authorService.deleteAuthorWithAlbumsAndMusic(id);
  }

  @Delete(':authorId')
  async deleteAuthorById(id: number) {
    return await this.authorService.deleteAuthorById(id)
 }
}
