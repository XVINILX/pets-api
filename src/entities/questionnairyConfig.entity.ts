import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { QuestionEntity } from './question.entity';
import { EnterpriseEntity } from './enterprise.entity';

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

  @OneToOne(
    () => EnterpriseEntity,
    (image: EnterpriseEntity) => image.questionnairyConfig,
    {
      nullable: true,
    },
  )
  @JoinColumn()
  public enterprise: EnterpriseEntity;
}
