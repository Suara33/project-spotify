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
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('playlist')
@ApiTags('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Create a new playlist' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Playlist details and optional file (cover image)',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Chill Vibes' },
        file: { type: 'string', format: 'binary', description: 'Playlist cover image (optional)' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Playlist created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  async create(
    @UserId('userId') userId: number,
    @Body() createPlaylistDto: CreatePlaylistDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.playlistService.create(createPlaylistDto, file, userId);
  }

  @Patch(':id/music/:musicId')
  @ApiOperation({ summary: 'Add music to a playlist' })
  @ApiParam({ name: 'id', description: 'Playlist ID' })
  @ApiParam({ name: 'musicId', description: 'Music ID' })
  @ApiResponse({ status: 200, description: 'Music added to playlist successfully' })
  @ApiResponse({ status: 404, description: 'Playlist or music not found' })
  async addMusicToPlaylist(
    @Param('id') playlistId: number,
    @Param('musicId') musicId: number,
  ) {
    return await this.playlistService.addMusicToPlaylist(playlistId, musicId);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all playlists for the user' })
  @ApiResponse({ status: 200, description: 'Playlists retrieved successfully' })
  async findAll(@UserId() userId: number) {
    return this.playlistService.findAll(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific playlist by ID' })
  @ApiParam({ name: 'id', description: 'Playlist ID' })
  @ApiResponse({ status: 200, description: 'Playlist retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Playlist not found' })
  async findOne(@Param('id') id: string) {
    return await this.playlistService.findOne(+id);
  }

  @Patch('update/:id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Update a playlist by ID' })
  @ApiParam({ name: 'id', description: 'Playlist ID' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Updated playlist details and optional file (cover image)',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Updated Playlist' },
        file: { type: 'string', format: 'binary', description: 'Updated playlist cover image (optional)' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Playlist updated successfully' })
  @ApiResponse({ status: 404, description: 'Playlist not found' })
  async updatePlaylist(
    @Param('id') id: number,
    @Body() updatePlaylistDto: UpdatePlaylistDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    updatePlaylistDto.file = file;
    return await this.playlistService.updatePlaylist(id, updatePlaylistDto);
  }

  @Delete(':id/music/:musicId')
  @ApiOperation({ summary: 'Remove music from a playlist' })
  @ApiParam({ name: 'id', description: 'Playlist ID' })
  @ApiParam({ name: 'musicId', description: 'Music ID' })
  @ApiResponse({ status: 200, description: 'Music removed from playlist successfully' })
  @ApiResponse({ status: 404, description: 'Playlist or music not found' })
  async deleteMusicFromPlaylist(
    @Param('id') playlistId: number,
    @Param('musicId') musicId: number,
  ) {
    return await this.playlistService.deleteMusicFromPlaylist(playlistId, musicId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a playlist by ID' })
  @ApiParam({ name: 'id', description: 'Playlist ID' })
  @ApiResponse({ status: 200, description: 'Playlist deleted successfully' })
  @ApiResponse({ status: 404, description: 'Playlist not found' })
  async remove(@Param('id') id: string) {
    return await this.playlistService.delete(+id);
  }
}
