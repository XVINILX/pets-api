import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EnterpriseEntity } from './enterprise.entity';
import { UserEntity } from './user.entity';
import { FileEntity } from './file.entity';

@Entity()
export class AnimalsEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column()
  public race: string;

  @Column()
  public slug: string;

  @Column()
  public city: string;

  @Column()
  public state: string;

  @Column()
  public street: string;

  @Column()
  public zipCode: string;

  @ManyToOne(
    () => EnterpriseEntity,
    (company: EnterpriseEntity) => company.animals,
  )
  public company: EnterpriseEntity;

  @ManyToOne(() => UserEntity, (enterprise: UserEntity) => enterprise)
  public receiver: UserEntity;

  @Column()
  public donatedAt: Date;

  @Column()
  public status: string;

  @Column()
  public principalPictureUuid: string;

  @Column('simple-array')
  public listOfPictures: string[];

  @Column()
  public adoptedAt: Date;

  @OneToOne(() => FileEntity, (image: FileEntity) => image.animalPrincipalImage)
  @JoinColumn()
  public principalPicture: FileEntity;

  @OneToMany(() => FileEntity, (image: FileEntity) => image.animalImageList)
  @JoinColumn()
  public imagesList: FileEntity[];

  @Column()
  public birthday: Date;

  @Column({ type: Boolean, default: true })
  public activate: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}
