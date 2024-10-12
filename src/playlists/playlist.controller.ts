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
import { UserId } from 'src/auth/decorators/userId.decorator';
import { ApiTags } from '@nestjs/swagger';


@Controller('playlist')
@ApiTags('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

 
 @Post()
 @UseInterceptors(FileInterceptor('file'))
 async create(
  @UserId('userId') userId:number,
  @Body() createPlaylistDto: CreatePlaylistDto,
  @UploadedFile() file: Express.Multer.File) {

     return await this.playlistService.create(createPlaylistDto, file, userId)
  }

  @Patch(':id/music/:musicId')
  async addMusicToPlaylist(
    @Param('id') playlistId:number,
    @Param('musicId') musicId: number,
    
  ) {
    return await this.playlistService.addMusicToPlaylist(playlistId, musicId)
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
