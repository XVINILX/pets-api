import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AnimalsEntity } from './animals.entity';

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
  public animalImageList: AnimalsEntity;
}
