import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(@Query('searchfield') search: string) {
    console.log('shemovida')
    return await this.searchService.search(search);
  }
}
