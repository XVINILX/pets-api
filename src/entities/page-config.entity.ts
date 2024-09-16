import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EnterpriseEntity } from './enterprise.entity';
import { FileEntity } from './file.entity';

@Entity()
export class PageConfigEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  whatsApp: string;

  @Column()
  instagram: string;

  @Column()
  facebook: string;

  @Column()
  donationLink: string;

  @OneToOne(
    () => FileEntity,
    (image: FileEntity) => image.animalPrincipalImage,
    {
      nullable: true,
    },
  )
  @JoinColumn()
  backgroundImage: FileEntity;

  @Column()
  aboutMe: string;

  @OneToOne(() => FileEntity, (image: FileEntity) => image.avatarImage, {
    nullable: true,
  })
  @JoinColumn()
  avatarImage?: FileEntity;

  @Column()
  colorInfo: string;

  @OneToOne(
    () => EnterpriseEntity,
    (enterprise: EnterpriseEntity) => enterprise.pageConfig,
  )
  @JoinColumn()
  public enterprise: EnterpriseEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
