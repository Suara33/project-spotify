import { Controller, UseInterceptors, UploadedFile, Post, Param, Get, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { Public } from 'src/auth/roles/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Express } from 'express';

@Controller('file')
@ApiTags('file')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Public()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to be uploaded',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ 
    status: 201, 
    description: 'File uploaded successfully', 
    schema: {
      example: {
        id: 1,
        url: 'https://example-bucket.s3.amazonaws.com/files/musicfile.mp3',
        filename: 'musicfile.mp3',
        key: 'files/musicfile.mp3',
        bucketName: 'example-bucket',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request. File upload failed.' })
  uploadFile(@Body() @UploadedFile() file: Express.Multer.File) {
    return this.filesService.uploadFile(file);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve file by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the file to retrieve' })
  @ApiResponse({ 
    status: 200, 
    description: 'File retrieved successfully', 
    schema: {
      example: {
        id: 1,
        url: 'https://example-bucket.s3.amazonaws.com/files/musicfile.mp3',
        filename: 'musicfile.mp3',
        key: 'files/musicfile.mp3',
        bucketName: 'example-bucket',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'File not found' })
  async getFile(@Param('id') id: number) {
    return await this.filesService.getfile(id);
  }

  @Get('find/:id')
  @ApiOperation({ summary: 'Find a file by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the file to find' })
  @ApiResponse({ 
    status: 200, 
    description: 'File found successfully', 
    schema: {
      example: {
        id: 1,
        url: 'https://example-bucket.s3.amazonaws.com/files/musicfile.mp3',
        filename: 'musicfile.mp3',
        key: 'files/musicfile.mp3',
        bucketName: 'example-bucket',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'File not found' })
  async findOne(@Param('id') id: number) {
    return this.filesService.findOne(id);
  }
}


