// API/src/Modules/CodeSessions/CodeSessionDefaultsModel.ts
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import { Project } from '../Projects/ProjectModel';

@ObjectType()
@Entity()
export class CodeSessionDefaults extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt: Date;

  @OneToOne(() => Project)
  @JoinColumn()
  readonly project: Project;
  @Column()
  projectId: string;

  @Field(() => [String])
  @Column({ type: 'varchar', array: true })
  extensions: string[];
}
