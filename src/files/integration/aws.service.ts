import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { CreateFileDto } from '../domain/dtos/create-file.dto';

@Injectable()
export class S3Service {
  private s3: S3;

  constructor(private configService: ConfigService) {
    this.s3 = new S3({
      region: this.configService.get<string>('AWS_REGION'),
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
    });
  }

  async generatePresignedUrl(
    key: string,
    expiresIn: number = 3600,
  ): Promise<string> {
    const params = {
      Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
      Key: key,
      Expires: expiresIn,
    };
    return this.s3.getSignedUrlPromise('putObject', params);
  }

  async deleteObject(key: string): Promise<void> {
    const params = {
      Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
      Key: key,
    };
    await this.s3.deleteObject(params).promise();
  }
}
