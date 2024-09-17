import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { QuestionnairyConfigEntity } from './questionnairyConfig.entity';
import { QuestionType } from 'src/questionConfig/domain/enums/questions.enum';

@Entity()
export class QuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public question: string;

  @Column({ enum: QuestionType })
  public type: QuestionType;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
