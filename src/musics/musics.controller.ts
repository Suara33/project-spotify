import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { MusicsService } from './musics.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { FileInterceptor } from '@nestjs/platform-express'; 
import { UserId } from 'src/auth/decorators/userId.decorator';


@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}
  
  
  @Post(':albumId')
  @UseInterceptors(
    FileInterceptor('file'),
  )
  async create(
    @Param('albumId') albumId:number,
    @Body() createMusicDto: CreateMusicDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    createMusicDto.albumId=albumId
    return await this.musicsService.create(createMusicDto, file);
  }

  @Get('tophits')
  async topHits() {
    return await this.musicsService.topHits();
  }

  @Get('topweek')
  async topHitsOfWeek(){
    return await this.musicsService.topHitsOfWeek();
  }
  
  @Get()
  async findAll() {
    return await this.musicsService.findAll();
  }

  
  @Get(':id')
  async findOne(@UserId() userId:number,@Param('id') id: string) {
    return await this.musicsService.findOne(+id,userId);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateMusicDto: UpdateMusicDto) {
     return await this.musicsService.update(id, updateMusicDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.musicsService.delete(+id);
  }
  @Delete('author/:authorId')
  async deleteMusicByauthorId(@Param('authorId') authorId: number) {
    await this.musicsService.deleteMusicByauthorId(authorId)

    return { message: 'Music soft deleted successfully' }
  }
}
