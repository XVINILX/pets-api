import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { PageConfigEntity } from 'src/entities/page-config.entity';

import { EnterpriseEntity } from 'src/entities/enterprise.entity';
import { AuthJwtDto } from 'src/core/auth/domain/dto/auth-jwt.dto';
import { FileEntity } from 'src/entities/file.entity';
import { CreatePageConfigDto } from './domain/dtos/create-page-config.dto';
import { UpdatePageConfigDto } from './domain/dtos/update-page-config.dto';

@Injectable()
export class PageConfigService {
  constructor(
    @InjectRepository(PageConfigEntity)
    private pageConfigRepository: Repository<PageConfigEntity>,

    @InjectRepository(EnterpriseEntity)
    private enterpriseRepository: Repository<EnterpriseEntity>,

    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  async createPageConfig(
    createPageConfigDto: CreatePageConfigDto,
    user: AuthJwtDto,
  ): Promise<PageConfigEntity> {
    try {
      const enterprise = await this.enterpriseRepository.findOne({
        where: { user: { id: user.id } },
      });

      if (!enterprise) {
        throw new HttpException('Enterprise not found', HttpStatus.NOT_FOUND);
      }

      const avatarImageReq = createPageConfigDto.avatarImage
        ? await this.fileRepository.findOne({
            where: { id: createPageConfigDto.avatarImage },
          })
        : null;

      const backgroundImage = createPageConfigDto.avatarImage
        ? await this.fileRepository.findOne({
            where: { id: createPageConfigDto.backgroundImage },
          })
        : null;

      const pageConfig = this.pageConfigRepository.create({
        ...createPageConfigDto,
        backgroundImage: backgroundImage,
        enterprise: enterprise,
        avatarImage: avatarImageReq,
      });

      return await this.pageConfigRepository.save(pageConfig);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async patchPageConfig(
    patchPageConfigDto: UpdatePageConfigDto,
    user: AuthJwtDto,
    id: string,
  ): Promise<PageConfigEntity> {
    try {
      const enterprise = await this.enterpriseRepository.findOne({
        where: { user: { id: user.id } },
      });

      if (!enterprise) {
        throw new HttpException('Enterprise not found', HttpStatus.NOT_FOUND);
      }

      const avatarImageReq = patchPageConfigDto.avatarImage
        ? await this.fileRepository.findOne({
            where: { id: patchPageConfigDto.avatarImage },
          })
        : null;

      const backgroundImage = patchPageConfigDto.avatarImage
        ? await this.fileRepository.findOne({
            where: { id: patchPageConfigDto.backgroundImage },
          })
        : null;

      const pageConfig = await this.pageConfigRepository.update(
        { id: id },
        {
          ...patchPageConfigDto,
          backgroundImage: backgroundImage,
          enterprise: enterprise,
          avatarImage: avatarImageReq,
        },
      );

      return await this.pageConfigRepository.save({ id, ...pageConfig });
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
      const enterpriseList = await this.pageConfigRepository.findAndCountBy({
        backgroundImage: ILike(`%${search}%`),
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
      const enterprise = await this.pageConfigRepository.findOne({
        where: { id },
      });

      return enterprise ? enterprise : null;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      await this.pageConfigRepository.delete({ id: id });
      const checkEnterprise = await this.pageConfigRepository.exist({
        where: { id: id },
      });
      return !checkEnterprise;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
