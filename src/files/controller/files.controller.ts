import {
  Controller,
  Delete,
  Query,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { CreateFileDto } from '../domain/dtos/create-file.dto';
import { FilesService } from '../files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FilesService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload a file',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async createFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<CreateFileDto> {
    const createdFile = await this.fileService.createFile(file);
    return createdFile;
  }

  @Delete('object')
  async deleteObject(@Query('key') key: string): Promise<void> {
    await this.fileService.deleteFile(key);
  }
}
