import { Controller, Get, Delete, Query, Body, Post } from '@nestjs/common';
import { S3Service } from '../integration/aws.service';
import { CreateFileDto } from '../domain/dtos/create-file.dto';
import { FilesService } from '../files.service';

@Controller('files')
export class FileController {
  constructor(
    private readonly s3Service: S3Service,
    private readonly fileService: FilesService,
  ) {}

  @Get('presigned-url')
  async getPresignedUrl(@Query('key') key: string): Promise<{ url: string }> {
    const url = await this.s3Service.generatePresignedUrl(key);
    return { url };
  }

  @Post('/')
  async createFile(
    @Body() createFileDto: CreateFileDto,
  ): Promise<CreateFileDto> {
    const file = await this.fileService.createFile(createFileDto);
    return file;
  }

  @Delete('object')
  async deleteObject(@Query('key') key: string): Promise<void> {
    await this.s3Service.deleteObject(key);
  }
}
