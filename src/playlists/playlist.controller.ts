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
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { UserId } from 'src/auth/decorators/userId.decorator';


@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

 @UseInterceptors(FileInterceptor('file'))
 @Post()
 async create(
  @UserId() userId: number,
  
  @Body() createPlaylistDto: CreatePlaylistDto,
  @UploadedFile() file: Express.Multer.File) {
    createPlaylistDto.userId = userId
    return await this.playlistService.create(createPlaylistDto, file)
  }

  @Get()

  async findAll(@UserId() userId: number) {
    
    return  this.playlistService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.playlistService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
  ) {
    return await this.playlistService.update(+id, updatePlaylistDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.playlistService.delete(+id);
  }
}
