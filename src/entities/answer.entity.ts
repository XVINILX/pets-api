import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AnswerConfigEntity } from './answerConfig.entity';

@Entity()
export class AnswerEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'int', nullable: true })
  public order?: number;

  @Column({ type: 'int', nullable: true })
  public step?: number;

  @Column()
  public question: string;

  @Column()
  public answer: string;

  @ManyToOne(
    () => AnswerConfigEntity,
    (animal: AnswerConfigEntity) => animal.answers,
    { nullable: true },
  )
  @JoinColumn()
  public answerConfig: AnswerConfigEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
