import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { FileEntity } from 'src/entities/file.entity';
import { CreateFileDto } from './domain/dtos/create-file.dto';
import { UpdateFileDto } from './domain/dtos/update-file.dto';
import { AzureBlobService } from './integration/azure.service';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
    private readonly azureService: AzureBlobService,
  ) {}

  async createFile(file: Express.Multer.File): Promise<FileEntity> {
    try {
      const fileExtension: string = extname(file.originalname);
      const blobName: string = `${uuidv4()}${fileExtension}`;

      await this.azureService.uploadBlobToContainer(blobName, file.buffer);

      const url = await this.azureService.getFileUrl(blobName);

      const newFile: CreateFileDto = { filename: file.originalname, url: url };

      const hero = this.fileRepository.create({
        blobName: blobName,
        ...newFile,
      });

      return await this.fileRepository.save(hero);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async patchFile(patchFile: UpdateFileDto, id: string): Promise<FileEntity> {
    try {
      const file = await this.fileRepository.update(id, patchFile);

      return await this.fileRepository.findOneByOrFail({ id: id });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  /**
   * @param search string - Search by nome fantasia
   * @param items number - Quantity of items in that page
   * @param page number - Quantity of pages
   */

  async listEnterprise(search: string, items?: number, page?: number) {
    try {
      const enterpriseList = await this.fileRepository.findAndCountBy({
        description: ILike(`%${search}%`),
      });

      if (items && page) {
        const initialSlice = items * page;
        const finalSlice = items * page + items;

        const paginatedEnterpriseList = enterpriseList[0].slice(
          initialSlice,
          finalSlice,
        );

        return paginatedEnterpriseList ? paginatedEnterpriseList : [];
      }

      return enterpriseList ? enterpriseList : [];
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findEnterprise(id: string) {
    try {
      const enterprise = await this.fileRepository.findOne({
        where: { id },
      });

      return enterprise ? enterprise : null;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteFile(id: string): Promise<boolean> {
    try {
      const enterpriseGet = await this.fileRepository.findOne({
        where: { id },
      });

      if (enterpriseGet) {
        await this.fileRepository.delete({ id: id });

        await this.azureService.deleteBlob(enterpriseGet.blobName);

        const checkEnterprise = await this.fileRepository.exist({
          where: { id: id },
        });

        return checkEnterprise;
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
