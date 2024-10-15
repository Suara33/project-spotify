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
  Put,
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

  @Patch('update/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updatePlaylist(
    @Param('id') id: number,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
    @UploadedFile() file: Express.Multer.File,
  )  { 
    updatePlaylistDto.file = file
    return await this.playlistService.updatePlaylist(id,  updatePlaylistDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.playlistService.delete(+id);
  }
}
