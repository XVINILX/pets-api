import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';

import { AnimalsEntity } from 'src/entities/animals.entity';
import { CreateAnimalDto } from './domain/dtos/create-animals.dto';
import { UpdateAnimalDto } from './domain/dtos/update-animals.dto';
import { EnterpriseEntity } from 'src/entities/enterprise.entity';
import { UserEntity } from 'src/entities/user.entity';
import { FileEntity } from 'src/entities/file.entity';
import { randomInt } from 'crypto';
import { AuthJwtDto } from 'src/core/auth/domain/dto/auth-jwt.dto';

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
    user: AuthJwtDto,
  ): Promise<AnimalsEntity> {
    try {
      const { receiver, imagesList, principalPictureUuid, ...data } =
        createAnimalsDto;

      const companyEntity = await this.enterpriseRepository.findOneBy({
        user: { id: user.id },
      });
      const receiverEntity = await this.userRepository.findOneBy({
        id: receiver,
      });

      const animal = this.animalRepository.create({ ...data });
      if (companyEntity) animal.company = companyEntity;

      if (receiverEntity) animal.receiver = receiverEntity;

      if (principalPictureUuid) {
        const principalPictureEntity = await this.fileRepository.findOneBy({
          id: principalPictureUuid,
        });
        animal.principalPicture = principalPictureEntity;
      }

      if (imagesList && imagesList.length > 0) {
        const imageListId = [];
        for (const image of imagesList) {
          await this.fileRepository.update(
            {
              id: image.imageUuid,
            },
            { order: image.order },
          );

          const imageQuery = await this.fileRepository.findOne({
            where: { id: image.imageUuid },
          });

          imageListId.push(imageQuery);
        }

        animal.imagesList = imageListId;
      }
      const slug = await this.generateUniqueSlug(animal.name);
      animal.slug = slug;

      return this.animalRepository.save(animal);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  private async generateUniqueSlug(name: string): Promise<string> {
    const firstName = name.split(' ')[0].toLowerCase(); // Get the first name and lowercase it
    let slug = '';
    let isUnique = false;

    while (!isUnique) {
      const randomNumber = randomInt(1000, 9999); // Generate a random 4-digit number
      slug = `${firstName}-${randomNumber}`; // Combine the first name and random number

      // Check if the slug already exists in the database
      const existingAnimal = await this.animalRepository.findOne({
        where: { slug },
      });

      if (!existingAnimal) {
        isUnique = true; // If no existing slug is found, it's unique
      }
    }

    return slug;
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
  async listAnimalSearch(search: string, items?: number, page?: number) {
    try {
      const skip = (page - 1) * items;
      const take = items;

      const [animalList, total] = await this.animalRepository.findAndCount({
        where: {
          name: ILike(`%${search}%`),
        },
        relations: ['imagesList'],
        skip: Number(skip),
        take: Number(take),
      });

      return {
        data: animalList,
        total,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * @param search string - Search by nome fantasia
   * @param items number - Quantity of items in that page
   * @param page number - Quantity of pages
   */
  async listAnimalSearchByCompanyId(
    companyId: string,
    search: string,
    items?: number,
    page?: number,
  ) {
    try {
      const skip = (page - 1) * items;
      const take = items;

      const [animalList, total] = await this.animalRepository.findAndCount({
        where: {
          name: ILike(`%${search}%`),
          company: { id: companyId },
        },
        relations: ['imagesList'],
        skip: Number(skip),
        take: Number(take),
      });

      return {
        data: animalList,
        total,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * @param search string - Search by nome fantasia
   * @param items number - Quantity of items in that page
   * @param page number - Quantity of pages
   */
  async authListAnimalSearch(
    search: string,
    userQuery: AuthJwtDto,
    items?: number,
    page?: number,
  ) {
    try {
      const skip = (page - 1) * items;
      const take = items;

      const [animalList, total] = await this.animalRepository.findAndCount({
        where: {
          name: ILike(`%${search}%`),
          company: { user: { id: userQuery.id } },
        },

        relations: ['imagesList'],
        skip: Number(skip),
        take: Number(take),
      });

      return {
        data: animalList,
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
        relations: ['imagesList', 'company'],
      });

      return enterprise ? enterprise : null;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAnimal(id: string) {
    try {
      const enterprise = await this.animalRepository.findOne({
        where: { id },
      });

      return enterprise ? enterprise : null;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async authFindAnimal(id: string, user: AuthJwtDto) {
    try {
      const animal = await this.animalRepository.findOne({
        where: { id, company: { user: { id: user.id } } },
        relations: ['answers'],
      });

      return animal ? animal : null;
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
