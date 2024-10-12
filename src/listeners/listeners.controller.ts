import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ListenersService } from './listeners.service';
import { CreateListenerDto } from './dto/create-listener.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserId } from 'src/auth/decorators/userId.decorator';

@Controller('listeners')
@ApiTags('listeners')
export class ListenersController {
  constructor(private readonly listenersService: ListenersService) {}

  @Post()
  create(
    @Body() createListenerDto: CreateListenerDto,
    @UserId('userId') userId:number) {
    const { musicId } = createListenerDto;
    return this.listenersService.create(musicId, userId);
  }

  @Get()
  findAll() {
    return this.listenersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.listenersService.findOne(+id);
  }

  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.listenersService.delete(+id);
  }
}
