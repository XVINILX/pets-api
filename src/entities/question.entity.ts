import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionnairyConfigEntity } from './questionnairyConfig.entity';

@Entity()
export class QuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public question: string;

  @Column()
  public type: string;

  @Column({ type: 'int', nullable: true })
  public order?: number;

  @Column({ type: 'int', nullable: true })
  public step?: number;

  @ManyToOne(
    () => QuestionnairyConfigEntity,
    (questionnairyConfig: QuestionnairyConfigEntity) =>
      questionnairyConfig.questions,
    { nullable: true },
  )
  @JoinColumn()
  public questionnairyConfig: QuestionnairyConfigEntity;
}
