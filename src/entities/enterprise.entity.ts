import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AnimalsEntity } from './animals.entity';
import { UserEntity } from './user.entity';
import { PageConfigEntity } from './page-config.entity';

@Entity()
export class EnterpriseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  razaoSocial: string;

  @Column()
  nomeFantasia: string;

  @Column()
  cnpj: string;

  @Column()
  regional: string;

  @OneToMany(() => AnimalsEntity, (animal: AnimalsEntity) => animal.company)
  @JoinColumn()
  public animals: AnimalsEntity[];

  @OneToOne(() => UserEntity, (user: UserEntity) => user.enterprise)
  @JoinColumn()
  public user: UserEntity;

  @OneToOne(
    () => PageConfigEntity,
    (pageConfig: PageConfigEntity) => pageConfig.enterprise,
  )
  public pageConfig: PageConfigEntity;

  @Column()
  openingDate: Date;

  @Column({ type: Boolean, default: true })
  activate: boolean;

  @Column({ type: String, array: true })
  especialidades: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
