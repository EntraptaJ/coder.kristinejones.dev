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

@Entity()
export class ProjectAuth extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @OneToOne(() => Project, (project) => project.projectAuth)
  project: Project;

  @Column('text')
  username: string;

  @Column('text')
  password: string;
}
