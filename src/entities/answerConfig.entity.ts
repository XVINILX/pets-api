import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AnswerEntity } from './answer.entity';
import { AnimalsEntity } from './animals.entity';

@Entity()
export class AnswerConfigEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => AnimalsEntity, (animal: AnimalsEntity) => animal.answers, {
    nullable: true,
  })
  @JoinColumn()
  public animal: AnimalsEntity;

  @OneToMany(
    () => AnswerEntity,
    (answers: AnswerEntity) => answers.answerConfig,
    { nullable: true },
  )
  public answers: AnswerEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
