import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [S3Service],
  exports: [S3Service], 
})
export class S3Module {}
