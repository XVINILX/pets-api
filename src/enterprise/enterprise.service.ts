import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEnterpriseDto } from './domain/dtos/create-enterprise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { EnterpriseEntity } from 'src/entities/enterprise.entity';
import { UpdateEnterpriseDto } from './domain/dtos/update-enterprise.dto';
import { AuthJwtDto } from 'src/core/auth/domain/dto/auth-jwt.dto';
import { UserEntity } from 'src/entities/user.entity';
import { use } from 'passport';
import { randomInt } from 'crypto';

@Injectable()
export class EnterpriseService {
  constructor(
    @InjectRepository(EnterpriseEntity)
    private enterpriseRepository: Repository<EnterpriseEntity>,

    @InjectRepository(UserEntity)
    private userEntity: Repository<UserEntity>,
  ) {}

  async createEnterprise(
    createEnterpriseDto: CreateEnterpriseDto,
    userInfo: AuthJwtDto,
  ): Promise<EnterpriseEntity> {
    try {
      const user = await this.userEntity.findOne({
        where: { id: userInfo.id },
      });

      if (user) {
        const hero = this.enterpriseRepository.create({
          user: user,
          ...createEnterpriseDto,
        });
        const slug = await this.generateUniqueSlug(hero.nomeFantasia);
        hero.slug = slug;
        return await this.enterpriseRepository.save(hero);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async patchEnterprise(
    patchEnterprise: UpdateEnterpriseDto,
    id: string,
  ): Promise<EnterpriseEntity> {
    try {
      const enterprise = await this.enterpriseRepository.update(
        id,
        patchEnterprise,
      );

      return await this.enterpriseRepository.findOneByOrFail({ id: id });
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
      const enterpriseList = await this.enterpriseRepository.findAndCountBy({
        nomeFantasia: ILike(`%${search}%`),
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
      const enterprise = await this.enterpriseRepository.findOne({
        where: { id },
      });

      return enterprise ? enterprise : null;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findEnterpriseBySlug(slug: string) {
    try {
      const enterprise = await this.enterpriseRepository.findOne({
        where: { slug },
        relations: [
          'animals',
          'pageConfig',
          'pageConfig.backgroundImage',
          'pageConfig.avatarImage',
        ],
      });

      return enterprise ? enterprise : null;
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
      const existingAnimal = await this.enterpriseRepository.findOne({
        where: { slug },
      });

      if (!existingAnimal) {
        isUnique = true; // If no existing slug is found, it's unique
      }
    }

    return slug;
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      const enterprise = await this.enterpriseRepository.delete({ id: id });
      const checkEnterprise = await this.enterpriseRepository.exist({
        where: { id: id },
      });
      return !checkEnterprise;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
