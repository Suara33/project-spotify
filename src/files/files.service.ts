import { Injectable } from "@nestjs/common";
import { S3Service } from "./services/s3.service";
import { FilesRepository} from "./files.repository";

@Injectable()
export class FilesService {
  constructor(private readonly filesRepository: FilesRepository,
              private readonly s3Service: S3Service
  ) {}


  private randomName(originalName: string): string {
    const random1 = Math.random().toString(36).substring(2, 8);
    const random2 = Math.random().toString(36).substring(2, 8);
    const fileExtension = originalName.split('.').pop();
    return `file_${random1}_${random2}.${fileExtension}`;
  }

  async uploadFile(file: Express.Multer.File) {
   
    const filename = file.originalname.split('.').slice(0, -1).join('.');

    const sanitizedFileName = filename.replace(/\s+/g, '-')
   
    // const randomfile = this.randomName(filename);

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


