// API/src/Modules/CodeSession/CodeSessionModel.ts
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from '../Projects/ProjectModel';

@ObjectType()
@Entity()
export class CodeSession extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt: Date;

  @OneToOne(() => Project, (project) => project.codeSession, {
    cascade: ['insert'],
  })
  project?: Project;

  @Field()
  @Column('varchar')
  containerId: string;
}
