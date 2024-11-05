import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ListenersService } from './listeners.service';
import { CreateListenerDto } from './dto/create-listener.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { UserId } from 'src/auth/decorators/userId.decorator';

@Controller('listener')
@ApiTags('listener')
export class ListenersController {
  constructor(private readonly listenersService: ListenersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new listener record' })
  @ApiBody({ 
    description: 'The musicId and userId required to create a listener record',
    type: CreateListenerDto,
    examples: {
      example1: {
        summary: 'Example listener data',
        value: {
          musicId: 123,
          userId: 456,
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Listener record created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  create(
    @Body() createListenerDto: CreateListenerDto,
    @UserId('userId') userId: number) {
    const { musicId } = createListenerDto;
    return this.listenersService.create(musicId, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all listener records' })
  @ApiResponse({ status: 200, description: 'List of all listeners retrieved successfully' })
  findAll() {
    return this.listenersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a listener record by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the listener record to retrieve' })
  @ApiResponse({ status: 200, description: 'Listener record retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Listener record not found' })
  findOne(@Param('id') id: string) {
    return this.listenersService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a listener record by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the listener record to delete' })
  @ApiResponse({ status: 200, description: 'Listener record deleted successfully' })
  @ApiResponse({ status: 404, description: 'Listener record not found' })
  remove(@Param('id') id: string) {
    return this.listenersService.delete(+id);
  }
}

