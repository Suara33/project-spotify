import { Injectable } from '@nestjs/common';
import { ManagedUpload} from 'aws-sdk/lib/s3/managed_upload';
import SendData = ManagedUpload.SendData;
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;

  constructor() {
    this.s3Client = new S3Client({
      region: 'eu-north-1', 
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY, 
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });

    this.bucketName = process.env.AWS_S3_BUCKET_NAME;
  }

  async uploadImage(file: Express.Multer.File) {
    const fileKey = `${uuid()}-${file.originalname}`; 

    const uploadParams = {
      Bucket: this.bucketName,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
      ContentDisposition: 'inline',
    };

    try {
      await this.s3Client.send(new PutObjectCommand(uploadParams));
      const fileLocation = `https://${this.bucketName}.s3.amazonaws.com/${fileKey}`;
      return {
        location: fileLocation,
        bucket: this.bucketName,
        key: fileKey,
      };
    } catch (err) {
      console.error('Error uploading file to S3:', err);
      throw new Error('File upload failed');
    }
  }

  async uploadAudio(file: Express.Multer.File) {
    const audioMimeTypes = ['audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/mp3', 'audio/mp4'];
    if (!audioMimeTypes.includes(file.mimetype)) {
      throw new Error('Invalid audio file type');
    }

    const audioFileKey = `${uuid()}-${file.originalname}`;

    const uploadParams = {
      Bucket: this.bucketName,
      Key: audioFileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
      ContentDisposition: 'inline',
    };

    try {
      await this.s3Client.send(new PutObjectCommand(uploadParams));
      const audioFileLocation = `https://${this.bucketName}.s3.amazonaws.com/${audioFileKey}`;
      return {
        location: audioFileLocation,
        bucket: this.bucketName,
        key: audioFileKey,
      };
    } catch (err) {
      console.error('Error uploading audio to S3:', err);
      throw new Error('Audio upload failed');
    }
  }
}



