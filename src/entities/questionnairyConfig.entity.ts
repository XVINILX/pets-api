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

import { QuestionEntity } from './question.entity';
import { EnterpriseEntity } from './enterprise.entity';
import { AnimalsEntity } from './animals.entity';

@Entity()
export class QuestionnairyConfigEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public type: string;

  @OneToMany(
    () => QuestionEntity,
    (question: QuestionEntity) => question.questionnairyConfig,
    { nullable: true },
  )
  public questions: QuestionEntity[];

  @OneToMany(
    () => AnimalsEntity,
    (animals: AnimalsEntity) => animals.questionnairy,
    { nullable: true },
  )
  public animals: AnimalsEntity[];

  @OneToOne(
    () => EnterpriseEntity,
    (image: EnterpriseEntity) => image.questionnairyConfig,
    {
      nullable: true,
    },
  )
  @JoinColumn()
  public enterprise: EnterpriseEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
