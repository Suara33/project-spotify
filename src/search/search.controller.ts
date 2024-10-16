import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('search')
@ApiTags('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiOperation({ summary: 'Search across various entities' })
  @ApiQuery({
    name: 'searchfield',
    description: 'The search term to use for finding matching entities',
    example: 'Mark Zuckerberg',
  })
  @ApiResponse({ status: 200, description: 'Search results returned successfully' })
  @ApiResponse({ status: 400, description: 'Invalid search query' })
  async search(@Query('searchfield') search: string) {
    return await this.searchService.search(search);
  }

  @UseGuards(AdminGuard)
  @Get('user')
  @ApiOperation({ summary: 'Search for users (Admin only)' })
  @ApiQuery({
    name: 'searchfield',
    description: 'The search term to use for finding matching users',
    example: 'Mark Zuckerberg',
  })
  @ApiResponse({ status: 200, description: 'User search results returned successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden. Admin access required' })
  @ApiResponse({ status: 400, description: 'Invalid search query' })
  async searchUser(@Query('searchfield') search: string) {
    return await this.searchService.searchUser(search);
  }
}
