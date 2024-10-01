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
import { UserId } from 'src/auth/decorators/userId.decorator';



@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}
  
  @Post()
  @UseInterceptors(
    FileInterceptor('file'),
  )
  async create(
    
    @Body() createMusicDto: CreateMusicDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(createMusicDto , 'musicdtoo')
    return await this.musicsService.create(createMusicDto, file);
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
  async findOne(@UserId() userId:number,@Param('id') id: string) {
    return await this.musicsService.findOne(+id,userId);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateMusicDto: UpdateMusicDto,) {

    return await this.musicsService.update(id, updateMusicDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.musicsService.delete(+id);
  }
}
