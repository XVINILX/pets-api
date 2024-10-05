import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { AnimalsEntity } from 'src/entities/animals.entity';

import { EnterpriseEntity } from 'src/entities/enterprise.entity';
import { UserEntity } from 'src/entities/user.entity';
import { FileEntity } from 'src/entities/file.entity';

import { AuthJwtDto } from 'src/core/auth/domain/dto/auth-jwt.dto';
import { UpdateAnswerDto } from './domain/dtos/create-answer.dto';
import { AnswerEntity } from 'src/entities/answer.entity';
import { AnswerConfigEntity } from 'src/entities/answerConfig.entity';

import { CreateQuestionDto } from './domain/dtos/create-question.dto';
import { QuestionnairyConfigEntity } from 'src/entities/questionnairyConfig.entity';
import { QuestionEntity } from 'src/entities/question.entity';
import { CreateQuestionnairyConfigDto } from './domain/dtos/create-questionnairy.dto';

@Injectable()
export class QuestionConfigService {
  constructor(
    @InjectRepository(AnimalsEntity)
    private animalRepository: Repository<AnimalsEntity>,

    @InjectRepository(AnswerEntity)
    private answerRepository: Repository<AnswerEntity>,

    @InjectRepository(AnswerConfigEntity)
    private answerConfigRepository: Repository<AnswerConfigEntity>,

    @InjectRepository(QuestionnairyConfigEntity)
    private questionnairyConfigRepository: Repository<QuestionnairyConfigEntity>,

    @InjectRepository(QuestionEntity)
    private questionRepository: Repository<QuestionEntity>,

    @InjectRepository(EnterpriseEntity)
    private enterpriseRepository: Repository<EnterpriseEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  async createQuestionConfig(
    createAnswerConfigDto: CreateQuestionnairyConfigDto,
    user: AuthJwtDto,
  ): Promise<AnswerConfigEntity> {
    try {
      const { enterpriseId, ...data } = createAnswerConfigDto;

      const animalReq = await this.enterpriseRepository.findOneBy({
        id: enterpriseId,
      });

      const questionnaryCreation = this.questionnairyConfigRepository.create({
        enterprise: animalReq,
        ...data,
      });

      return this.answerConfigRepository.save(questionnaryCreation);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createQuestion(
    createQuestionDto: CreateQuestionDto,
    user: AuthJwtDto,
  ): Promise<AnswerEntity> {
    try {
      const { questionnairyConfigId, ...data } = createQuestionDto;

      const answerConfigEntity =
        await this.questionnairyConfigRepository.findOneBy({
          id: questionnairyConfigId,
        });

      const animal = this.questionRepository.create({
        questionnairyConfig: answerConfigEntity,
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

  async listPageConfig(search: string, items?: number, page?: number) {
    try {
      const skip = (page - 1) * items;
      const take = items;

      const [enterpriseList, total] =
        await this.questionnairyConfigRepository.findAndCount({
          where: {
            animals: { name: ILike(`%${search}%`) },
          },
          skip: skip,
          take: take,
        });

      return {
        data: enterpriseList,
        total,
      };
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
