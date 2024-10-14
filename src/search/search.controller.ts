import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('search')
@ApiTags('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(@Query('searchfield') search: string) {
   
    return await this.searchService.search(search);
  }

  @UseGuards(AdminGuard)
  @Get('user')
  async searchUser(@Query('searchfield') search: string) {
    
    return await this.searchService.searchUser(search);
  }



}
//   @Get()

//   }
// }
