import { Controller, UseInterceptors, UploadedFile, Post, Param, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    
    return this.filesService.uploadFile(file);
  }

  @Get(':id') 
  async getFile(@Param('id') id: number) {
    return await this.filesService.getfile(id);
  }

  @Get('find/:id') 
  async findOne(@Param('id') id: number) {
    return this.filesService.findOne(id);
  }
}


