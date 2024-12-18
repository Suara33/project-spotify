import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload';
import SendData = ManagedUpload.SendData;

@Injectable()
export class S3Service {
  private s3: AWS.S3;
  private bucketName: string;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: 'eu-north-1',
      signatureVersion: 'v4',
    });

    this.bucketName = process.env.AWS_S3_BUCKET_NAME;
  }

  async getPresignedUrl(key: string): Promise<string> {
    const params = {
      Bucket: this.bucketName,
      Key: key,
      Expires: 3600,
    };

    try {
      const url = await this.s3.getSignedUrlPromise('getObject', params);
      return url;
    } catch (error) {
      console.log(`Failed to get presigned URL for key ${key}`, error.stack);
    }
  }

  
  private randomName(originalName: string): string {
    const random1 = Math.random().toString(36).substring(2, 8);
    const random2 = Math.random().toString(36).substring(2, 8);
    const fileExtension = originalName.split('.').pop(); 
    return `file_${random1}_${random2}.${fileExtension}`;
  }

  
  async upload(file: Express.Multer.File): Promise<SendData> {
    const randomFileName = this.randomName(file.originalname);

    const params = {
      Bucket: this.bucketName,
      Key: randomFileName, 
      Body: file.buffer,
      ContentType: file.mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'eu-north-1',
      },
    };

    try {
      return await this.s3.upload(params).promise();
    } catch (e) {
      console.log('Could not upload file to s3', { e, mimetype: file.mimetype });
      throw e;
    }
  }
}
