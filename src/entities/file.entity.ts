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
  public size?: number;

  @Column({ nullable: true })
  public mimeType?: string;

  @Column({ nullable: true })
  public description?: string;

  @OneToOne(
    () => AnimalsEntity,
    (animal: AnimalsEntity) => animal.principalPicture,
  )
  public animalPrincipalImage: AnimalsEntity;

  @ManyToOne(() => AnimalsEntity, (animal: AnimalsEntity) => animal.imagesList)
  public animalImageList: AnimalsEntity;
}
