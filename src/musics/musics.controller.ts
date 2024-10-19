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
  UseGuards,
} from '@nestjs/common';
import { MusicsService } from './musics.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { FileInterceptor } from '@nestjs/platform-express'; 
import { UserId } from 'src/auth/decorators/userId.decorator';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';

@Controller('music')
@ApiTags('music')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  @UseGuards(AdminGuard)
  @Post(':albumId')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Create a new music track' })
  @ApiParam({ name: 'albumId', description: 'The ID of the album the track belongs to' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Music details and file upload',
    schema: {
      type: 'object',
      properties: {
        trackTitle: { type: 'string', example: 'New Hit Song' },
        duration: { type: 'string', example: '3:45', nullable: true },
        file: {
          type: 'string',
          format: 'binary',
          description: 'The music file to upload',
        },
        authorFullName: { type: 'string', example: 'Mark Zuckerberg', nullable: true },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Music track created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data or file upload failed' })
  async create(
    @Param('albumId') albumId: number,
    @Body() createMusicDto: CreateMusicDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    createMusicDto.albumId = albumId;
    return await this.musicsService.create(createMusicDto, file);
  }

  @Get('tophits')
  @ApiOperation({ summary: 'Get top hits' })
  @ApiResponse({ status: 200, description: 'Top hits retrieved successfully' })
  async topHits() {
    return await this.musicsService.topHits();
  }

  @Get('topweek')
  @ApiOperation({ summary: 'Get top hits of the week' })
  @ApiResponse({ status: 200, description: 'Top hits of the week retrieved successfully' })
  async topHitsOfWeek() {
    return await this.musicsService.topHitsOfWeek();
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all music tracks' })
  @ApiResponse({ status: 200, description: 'Music tracks retrieved successfully' })
  async findAll() {
    return await this.musicsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific music track by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the music track to retrieve' })
  @ApiResponse({ status: 200, description: 'Music track retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Music track not found' })
  async findOne(@UserId() userId: number, @Param('id') id: string) {
    return await this.musicsService.findOne(+id, userId);
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update a music track by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the music track to update' })
  @ApiBody({
    description: 'Updated music details',
    type: UpdateMusicDto,
  })
  @ApiResponse({ status: 200, description: 'Music track updated successfully' })
  @ApiResponse({ status: 404, description: 'Music track not found' })
  async update(@Param('id') id: number, @Body() updateMusicDto: UpdateMusicDto) {
    return await this.musicsService.update(id, updateMusicDto);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a music track by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the music track to delete' })
  @ApiResponse({ status: 200, description: 'Music track deleted successfully' })
  @ApiResponse({ status: 404, description: 'Music track not found' })
  async remove(@Param('id') id: string) {
    return await this.musicsService.delete(+id);
  }

  @UseGuards(AdminGuard)
  @Delete('author/:authorId')
  @ApiOperation({ summary: 'Soft delete all music tracks by author ID' })
  @ApiParam({ name: 'authorId', description: 'The ID of the author whose tracks to delete' })
  @ApiResponse({ status: 200, description: 'Music tracks soft deleted successfully' })
  async deleteMusicByauthorId(@Param('authorId') authorId: number) {
    await this.musicsService.deleteMusicByauthorId(authorId);
    return { message: 'Music soft deleted successfully' };
  }
}
