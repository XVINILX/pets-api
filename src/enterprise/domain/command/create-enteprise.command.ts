import { AuthJwtDto } from 'src/core/auth/domain/dto/auth-jwt.dto';
import { CreateEnterpriseDto } from '../dtos/create-enterprise.dto';

export class CreateEnterpriseCommand {
  constructor(
    public readonly createEnterpriseDto: CreateEnterpriseDto,
    public readonly user: AuthJwtDto,
  ) {}
}
