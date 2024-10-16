import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { FavoritesService } from './favorites.service';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('favorites')
@ApiTags('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all favorite items' })
  @ApiResponse({ status: 200, description: 'List of all favorite items' })
  findAll() {
    return this.favoritesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a favorite item by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the favorite item' })
  @ApiResponse({ status: 200, description: 'The favorite item' })
  @ApiResponse({ status: 404, description: 'Favorite item not found' })
  findOne(@Param('id') id: string) {
    return this.favoritesService.findOne(+id);
  }

  @Patch('add-music/:musicId')
  @ApiOperation({ summary: 'Add a music track to favorites' })
  @ApiParam({ name: 'musicId', description: 'The ID of the music track to add to favorites' })
  @ApiResponse({ status: 200, description: 'Music track added to favorites' })
  @ApiResponse({ status: 404, description: 'Music track not found' })
  async addMusicToFavorites(@Param('musicId') musicId: number) {
    return await this.favoritesService.addMusicToFavorites(musicId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a favorite item' })
  @ApiParam({ name: 'id', description: 'The ID of the favorite item' })
  @ApiResponse({ status: 200, description: 'Favorite item updated successfully' })
  @ApiResponse({ status: 404, description: 'Favorite item not found' })
  update(@Param('id') id: string, @Body() updateFavoriteDto: UpdateFavoriteDto) {
    return this.favoritesService.update(+id, updateFavoriteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a favorite item' })
  @ApiParam({ name: 'id', description: 'The ID of the favorite item to delete' })
  @ApiResponse({ status: 200, description: 'Favorite item deleted successfully' })
  @ApiResponse({ status: 404, description: 'Favorite item not found' })
  remove(@Param('id') id: string) {
    return this.favoritesService.delete(+id);
  }
}
