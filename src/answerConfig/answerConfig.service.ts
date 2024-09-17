import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { AnimalsEntity } from 'src/entities/animals.entity';

import { EnterpriseEntity } from 'src/entities/enterprise.entity';
import { UserEntity } from 'src/entities/user.entity';
import { FileEntity } from 'src/entities/file.entity';

import { AuthJwtDto } from 'src/core/auth/domain/dto/auth-jwt.dto';
import {
  CreateAnswerDto,
  UpdateAnswerDto,
} from './domain/dtos/create-answer.dto';
import { AnswerEntity } from 'src/entities/answer.entity';
import { AnswerConfigEntity } from 'src/entities/answerConfig.entity';
import { CreateAnswerConfigDto } from './domain/dtos/create-answer-config.dto';

@Injectable()
export class AnswerConfigService {
  constructor(
    @InjectRepository(AnimalsEntity)
    private animalRepository: Repository<AnimalsEntity>,

    @InjectRepository(AnswerEntity)
    private answerRepository: Repository<AnswerEntity>,

    @InjectRepository(AnswerConfigEntity)
    private answerConfigRepository: Repository<AnswerConfigEntity>,

    @InjectRepository(EnterpriseEntity)
    private enterpriseRepository: Repository<EnterpriseEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  async createAnswerConfig(
    createAnswerConfigDto: CreateAnswerConfigDto,
    user: AuthJwtDto,
  ): Promise<AnswerConfigEntity> {
    try {
      const { animalId } = createAnswerConfigDto;

      const animalReq = await this.animalRepository.findOneBy({
        id: animalId,
      });

      const animal = this.answerConfigRepository.create({
        animal: animalReq,
      });

      return this.answerConfigRepository.save(animal);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createAnswer(
    createAnswerConfigDto: CreateAnswerDto,
    user: AuthJwtDto,
  ): Promise<AnswerEntity> {
    try {
      const { answerConfigId, ...data } = createAnswerConfigDto;

      const answerConfigEntity = await this.answerRepository.findOneBy({
        id: answerConfigId,
      });

      const animal = this.answerRepository.create({
        answerConfig: answerConfigEntity,
        ...data,
      });

      return this.answerRepository.save(animal);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async updateAnswerConfig(
    patchEnterprise: UpdateAnswerDto,
    id: string,
  ): Promise<AnimalsEntity> {
    try {
      const { answerConfigId, ...data } = patchEnterprise;

      const answerConfigEntity = await this.answerRepository.findOneBy({
        id: answerConfigId,
      });

      const animal = this.answerRepository.create({
        answerConfig: answerConfigEntity,
        ...data,
      });

      await this.animalRepository.update(id, animal);

      return await this.animalRepository.findOneByOrFail({ id: id });
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
      const enterpriseList = await this.animalRepository.findAndCountBy({
        name: ILike(`%${search}%`),
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

  async findAnimalBySlug(slug: string) {
    try {
      const enterprise = await this.animalRepository.findOne({
        where: { slug },
      });

      return enterprise ? enterprise : null;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findEnterprise(id: string) {
    try {
      const enterprise = await this.animalRepository.findOne({
        where: { id },
      });

      return enterprise ? enterprise : null;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      const enterprise = await this.animalRepository.delete({ id: id });
      const checkEnterprise = await this.animalRepository.exist({
        where: { id: id },
      });
      return !checkEnterprise;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
