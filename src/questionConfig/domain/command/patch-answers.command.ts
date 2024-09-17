import { UpdateAnimalDto } from '../dtos/update-animals.dto';

export class PatchAnimalCommand {
  constructor(
    public readonly patchAnimalDto: UpdateAnimalDto,
    public readonly id: string,
  ) {}
}
