import { Injectable } from "@nestjs/common";
import { S3Service } from "./services/s3.service";
import { FilesRepsoitory } from "./files.repository";




@Injectable()
export class FilesService {
  constructor(private readonly filesRepository: FilesRepsoitory,
              private readonly s3Service: S3Service
  ) {}

  async uploadFile(file: Express.Multer.File) {
   
    const filename = file.originalname.split('.').slice(0, -1).join('.');

    const sanitizedFileName = file.filename.replace(/\s+/g, '-')

    const result = await this.s3Service.uploadImage(file);

 

    const savedFile = await this.filesRepository.save(
      sanitizedFileName,
      result.location,
      result.bucket,
      result.key

    )
    return savedFile;
  }

  async findOne(id: number) {
    const file = await this.filesRepository.findOne(id);
    
    if (!file) {
      throw new Error('File not found');
    }

    return file;
  }

  async getfile(fileId: number) {
    const file = await this.filesRepository.findOne(fileId);

    return file
  }
}