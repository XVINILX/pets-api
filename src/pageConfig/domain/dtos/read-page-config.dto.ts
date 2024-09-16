import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsDate } from 'class-validator';

export class ReadPageConfigDto {
  @ApiProperty({ description: 'Page Config ID' })
  @IsUUID()
  id: string;

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
  @IsUUID()
  backgroundImage?: string;

  @ApiProperty({ description: 'About me section text' })
  @IsString()
  aboutMe: string;

  @ApiProperty({ description: 'Avatar image ID', required: false })
  @IsUUID()
  avatarImage?: string;

  @ApiProperty({ description: 'Color info (e.g., hex code)' })
  @IsString()
  colorInfo: string;

  @ApiProperty({ description: 'Enterprise ID associated with the page' })
  @IsUUID()
  enterprise: string;

  @ApiProperty({ description: 'Date when the page config was created' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ description: 'Date when the page config was last updated' })
  @IsDate()
  updatedAt: Date;
}
