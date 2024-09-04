import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { AnimalsEntity } from 'src/entities/animals.entity';
import { CreateAnimalDto } from './domain/dtos/create-animals.dto';
import { UpdateAnimalDto } from './domain/dtos/update-animals.dto';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(AnimalsEntity)
    private animalRepository: Repository<AnimalsEntity>,
  ) {}

  async createEnterprise(
    createAnimalsDto: CreateAnimalDto,
  ): Promise<AnimalsEntity> {
    try {
      const hero = this.animalRepository.create(createAnimalsDto);

      return this.animalRepository.save(hero);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async patchEnterprise(
    patchEnterprise: UpdateAnimalDto,
    id: string,
  ): Promise<AnimalsEntity> {
    try {
      const enterprise = await this.animalRepository.update(
        id,
        patchEnterprise,
      );

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