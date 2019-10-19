// API/src/Modules/Projects/ProjectAuth.ts
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from './ProjectModel';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class ProjectAuth extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @OneToOne(() => Project, (project) => project.projectAuth)
  project: Project;

  @Field()
  @Column('text')
  username: string;

  @Field()
  @Column('text')
  password: string;
}
