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
import { QuestionnairyConfigEntity } from './questionnairyConfig.entity';

@Entity()
export class EnterpriseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  razaoSocial: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  nomeFantasia: string;

  @Column({ nullable: true })
  cnpj: string;

  @Column()
  public city: string;
  /*OK*/

  @Column()
  public state: string;

  @Column()
  public street: string;

  @Column()
  public zipCode: string;

  @Column({ nullable: true })
  public slug: string;

  @OneToMany(() => AnimalsEntity, (animal: AnimalsEntity) => animal.company)
  @JoinColumn()
  public animals: AnimalsEntity[];

  @OneToOne(() => UserEntity, (user: UserEntity) => user.enterprise)
  @JoinColumn()
  public user: UserEntity;

  @OneToOne(
    () => PageConfigEntity,
    (pageConfig: PageConfigEntity) => pageConfig.enterprise,
    { nullable: true },
  )
  public pageConfig: PageConfigEntity;

  @OneToOne(
    () => QuestionnairyConfigEntity,
    (questionnairyConfig: QuestionnairyConfigEntity) =>
      questionnairyConfig.enterprise,
    { nullable: true },
  )
  public questionnairyConfig: QuestionnairyConfigEntity;

  @Column({ nullable: true })
  openingDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
