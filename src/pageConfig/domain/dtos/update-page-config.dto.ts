import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdatePageConfigDto {
  @ApiProperty({ description: 'WhatsApp contact info', required: false })
  @IsOptional()
  @IsString()
  whatsApp?: string;

  @ApiProperty({ description: 'Instagram profile link', required: false })
  @IsOptional()
  @IsString()
  instagram?: string;

  @ApiProperty({ description: 'Facebook profile link', required: false })
  @IsOptional()
  @IsString()
  facebook?: string;

  @ApiProperty({ description: 'Donation link URL', required: false })
  @IsOptional()
  @IsString()
  donationLink?: string;

  @ApiProperty({ description: 'Background image ID', required: false })
  @IsOptional()
  @IsUUID()
  backgroundImage?: string;

  @ApiProperty({ description: 'About me section text', required: false })
  @IsOptional()
  @IsString()
  aboutMe?: string;

  @ApiProperty({ description: 'Avatar image ID', required: false })
  @IsOptional()
  @IsUUID()
  avatarImage?: string;

  @ApiProperty({ description: 'Color info (e.g., hex code)', required: false })
  @IsOptional()
  @IsString()
  colorInfo?: string;

  @ApiProperty({
    description: 'Enterprise ID associated with the page',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  enterprise?: string;
}
