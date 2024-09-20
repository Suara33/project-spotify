import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikesongsService } from './likesongs.service';
import { CreateLikesongDto } from './dto/create-likesong.dto';
import { UpdateLikesongDto } from './dto/update-likesong.dto';

@Controller('likesongs')
export class LikesongsController {
  constructor(private readonly likesongsService: LikesongsService) {}

  @Post()
  async create(@Body() createLikesongDto: CreateLikesongDto) {
    return await this.likesongsService.create(createLikesongDto);
  }

  @Get()
  findAll() {
    return this.likesongsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likesongsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikesongDto: UpdateLikesongDto) {
    return this.likesongsService.update(+id, updateLikesongDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likesongsService.delete(+id);
  }
}
