import { Controller, Get, Query} from '@nestjs/common';
import { SearchService } from './search.service';



@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}
    @Get()
    search(@Query('searchfield') search: string) {
        return this.searchService.search(search)
    }
}


