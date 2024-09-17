import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AnimalsEntity } from './animals.entity';
import { PageConfigEntity } from './page-config.entity';

@Entity()
export class FileEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public url: string;

  @Column()
  public filename: string;

  @Column({ type: 'int', nullable: true })
  public order?: number;

  @Column({ type: 'int', nullable: true })
  public size?: number;

  @Column({ nullable: true })
  public mimeType?: string;

  @Column({ nullable: true })
  public description?: string;

  @Column({ nullable: true })
  public blobName: string;

  @OneToOne(
    () => PageConfigEntity,
    (animal: PageConfigEntity) => animal.avatarImage,
    { nullable: true },
  )
  public avatarImage: PageConfigEntity;

  @OneToOne(
    () => PageConfigEntity,
    (animal: PageConfigEntity) => animal.backgroundImage,
    { nullable: true },
  )
  public backgroundImage: PageConfigEntity;

  @OneToOne(
    () => AnimalsEntity,
    (animal: AnimalsEntity) => animal.principalPicture,
    { nullable: true },
  )
  public animalPrincipalImage: AnimalsEntity;

  @ManyToOne(
    () => AnimalsEntity,
    (animal: AnimalsEntity) => animal.imagesList,
    { nullable: true },
  )
  @JoinColumn()
  public animalImageList: AnimalsEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
