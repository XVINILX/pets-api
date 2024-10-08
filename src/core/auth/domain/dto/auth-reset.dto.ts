import { ApiProperty } from '@nestjs/swagger';
import { IsStrongPassword } from 'class-validator';

export class AuthResetDto {

    @ApiProperty({ type: String, description: 'User Token for reset password' })

  token: string;


  @ApiProperty({ type: String, description: 'User password' })
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;

  @ApiProperty({ type: String, description: 'User password' })
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  confirmationPassword: string;
}
