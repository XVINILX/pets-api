import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';

import { AnimalsService } from 'src/animals/animals.service';
import { RaceAnimalsQuery } from './race-animals.query';
import { AnimalType } from 'src/entities/animals.enum';
import { promises as fs } from 'fs';
import path from 'path';
import { BreedsListDto } from '../dtos/breed-list.dto';

@QueryHandler(RaceAnimalsQuery)
export class RaceAnimalsHandler implements IQueryHandler<RaceAnimalsQuery> {
  constructor(private repository: AnimalsService) {}

  async execute(command: RaceAnimalsQuery): Promise<BreedsListDto> {
    try {
      const { type } = command;

      const breeds = [];
      let file = '';
      if (type === AnimalType['cat']) {
        file = 'cats.json';
      } else if (type === AnimalType['dog']) {
        file = 'dogs.json';
      } else {
        throw new HttpException(
          'This type of animal is not supported',
          HttpStatus.BAD_REQUEST,
        );
      }

      const filePath = path.join(__dirname, '../../races-list', file);

      const data = await fs.readFile(filePath, 'utf8');

      const animalData = JSON.parse(data);

      for (const breed in animalData.message) {
        const firstLetter = breed.charAt(0);

        const firstLetterCap = firstLetter.toUpperCase();

        const remainingLetters = breed.slice(1);

        const capitalizedWord = firstLetterCap + remainingLetters;

        breeds.push(capitalizedWord);
      }

      return { breeds };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
