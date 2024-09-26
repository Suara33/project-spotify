import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FileEntity } from "./entities/file.entity";
import { Repository } from "typeorm";


@Injectable()
export class FilesRepository {
    constructor(@InjectRepository(FileEntity)
                private readonly filesRepository: Repository<FileEntity>) {}

async save(filename: string, location: string, bucket: string, key: string): Promise<FileEntity> {
    const newFile = new FileEntity()
    newFile.bucketName = bucket
    newFile.filename = filename
    newFile.key = key
    newFile.url = location
   
    return this.filesRepository.save(newFile);
}

async findOne(id: number): Promise<FileEntity | null> {
     return this.filesRepository.findOne({where: {id}})
    }
}