import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MusicsService } from './musics.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';



@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  
  @Post()
  async create(@Body() createMusicDto: CreateMusicDto) {
    return await this.musicsService.create(createMusicDto);
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

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMusicDto: UpdateMusicDto,
  ) {
    return await this.musicsService.update(+id, updateMusicDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.musicsService.delete(+id);
  }
}
