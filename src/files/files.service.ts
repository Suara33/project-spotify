import { Injectable } from "@nestjs/common";
import { S3Service } from "./services/s3.service";
import { FilesRepository} from "./files.repository";
import { buffer } from "stream/consumers";




@Injectable()
export class FilesService {
  constructor(private readonly filesRepository: FilesRepository,
              private readonly s3Service: S3Service
  ) {}

  async uploadFile(file: Express.Multer.File) {
   
    const filename = file.originalname.split('.').slice(0, -1).join('.');

    const sanitizedFileName = filename.replace(/\s+/g, '-')
    console.log(sanitizedFileName)

    const result = await this.s3Service.upload(file);

 

    const savedFile = await this.filesRepository.save(
      sanitizedFileName,
      result.Location,
      result.Bucket,
      result.Key

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