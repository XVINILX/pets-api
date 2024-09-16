import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, IsUrl } from 'class-validator';

export class CreatePageConfigDto {
  @ApiProperty({ description: 'WhatsApp contact info' })
  @IsString()
  whatsApp: string;

  @ApiProperty({ description: 'Instagram profile link' })
  @IsString()
  instagram: string;

  @ApiProperty({ description: 'Facebook profile link' })
  @IsString()
  facebook: string;

  @ApiProperty({ description: 'Donation link URL' })
  @IsString()
  donationLink: string;

  @ApiProperty({ description: 'Background image ID', required: false })
  @IsOptional()
  @IsUUID()
  backgroundImage?: string;

  @ApiProperty({ description: 'About me section text' })
  @IsString()
  aboutMe: string;

  @ApiProperty({ description: 'Avatar image ID', required: false })
  @IsOptional()
  @IsUUID()
  avatarImage?: string;

  @ApiProperty({ description: 'Color info (e.g., hex code)' })
  @IsString()
  colorInfo: string;
}
