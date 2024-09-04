import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListenersService } from './listeners.service';
import { CreateListenerDto } from './dto/create-listener.dto';

@Controller('listeners')
export class ListenersController {
  constructor(private readonly listenersService: ListenersService) {}

  @Post()
  create(@Body() createListenerDto: CreateListenerDto) {
    return this.listenersService.create(createListenerDto);
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