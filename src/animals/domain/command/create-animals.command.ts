import { CreateAnimalDto } from '../dtos/create-animals.dto';

export class CreateAnimalsCommand {
  constructor(public readonly createAnimalsDto: CreateAnimalDto) {}
}
