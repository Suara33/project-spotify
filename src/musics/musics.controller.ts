import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Put,
} from '@nestjs/common';
import { MusicsService } from './musics.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { FileInterceptor } from '@nestjs/platform-express'; 



@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}
  @Post(':albumId')
  @UseInterceptors(
    FileInterceptor('file'),
  )
  async create(
    @Param('albumId') albumId: number,
    @Body() createMusicDto: CreateMusicDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.musicsService.create(createMusicDto, file, albumId);
  }

  @Get('tophits')
  async topHits() {
    return await this.musicsService.topHits()
  }

  
  @Get()
  async findAll() {
    return await this.musicsService.findAll();
  }

  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.musicsService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateMusicDto: UpdateMusicDto,) {

    console.log(updateMusicDto)
    return await this.musicsService.update(id, updateMusicDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.musicsService.delete(+id);
  }
}
