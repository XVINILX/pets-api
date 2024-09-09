import { AnimalType } from 'src/entities/animals.enum';

/**
 * @param search string - Search by enterprise name
 * @param page number - Number of pagination
 * @param items number - Quantity of items in that page
 */
export class RaceAnimalsQuery {
  constructor(public readonly type: AnimalType) {}
}
