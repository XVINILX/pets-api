import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EnterpriseEntity } from './enterprise.entity';
import { AnimalsEntity } from './animals.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: true })
  googleId: string;

  @Column()
  password: string;

  @Column()
  recoverToken: string;

  @OneToOne(
    () => EnterpriseEntity,
    (enterprise: EnterpriseEntity) => enterprise.user,
  )
  public enterprise: EnterpriseEntity;

  @OneToMany(() => AnimalsEntity, (animal: AnimalsEntity) => animal.receiver)
  public donations: AnimalsEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
