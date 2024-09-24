import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { S3Module } from './services/s3.module';
import { FilesRepository } from './files.repository';


@Module({
  imports: [TypeOrmModule.forFeature([FileEntity]), S3Module],
  controllers: [FilesController],
  providers: [FilesService, FilesRepository],
  exports: [FilesModule]
})
export class FilesModule {}
