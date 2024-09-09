import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';

import { AnimalsEntity } from 'src/entities/animals.entity';
import { CreateAnimalDto } from './domain/dtos/create-animals.dto';
import { UpdateAnimalDto } from './domain/dtos/update-animals.dto';
import { EnterpriseEntity } from 'src/entities/enterprise.entity';
import { UserEntity } from 'src/entities/user.entity';
import { FileEntity } from 'src/entities/file.entity';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(AnimalsEntity)
    private animalRepository: Repository<AnimalsEntity>,

    @InjectRepository(EnterpriseEntity)
    private enterpriseRepository: Repository<EnterpriseEntity>,

    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,

    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
  ) {}

  async createEnterprise(
    createAnimalsDto: CreateAnimalDto,
  ): Promise<AnimalsEntity> {
    try {
      const { company, receiver, imagesList, principalPictureUuid, ...data } =
        createAnimalsDto;

      const companyEntity = await this.enterpriseRepository.findOneBy({
        id: company,
      });
      const receiverEntity = await this.userRepository.findOneBy({
        id: receiver,
      });

      const animal = this.animalRepository.create({ ...data });

      animal.company = companyEntity;
      animal.receiver = receiverEntity;

      const principalPictureEntity = await this.fileRepository.findOneBy({
        id: principalPictureUuid,
      });
      animal.principalPicture = principalPictureEntity;

      if (imagesList && imagesList.length > 0) {
        const images = await this.fileRepository.findBy({ id: In(imagesList) });
        animal.imagesList = images;
      }

      return this.animalRepository.save(animal);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async patchEnterprise(
    patchEnterprise: UpdateAnimalDto,
    id: string,
  ): Promise<AnimalsEntity> {
    try {
      const { receiver, imagesList, principalPictureUuid, ...data } =
        patchEnterprise;

      const receiverEntity = await this.userRepository.findOneBy({
        id: receiver,
      });

      const animal = this.animalRepository.create({ ...data });

      animal.receiver = receiverEntity;

      const principalPictureEntity = await this.fileRepository.findOneBy({
        id: principalPictureUuid,
      });
      animal.principalPicture = principalPictureEntity;

      if (imagesList && imagesList.length > 0) {
        const images = await this.fileRepository.findBy({ id: In(imagesList) });
        animal.imagesList = images;
      }

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
