// API/src/Modules/CodeSessions/CodeSessionDefaultsModel.ts
import { ObjectType } from 'type-graphql';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Project } from '../Projects/ProjectModel';
import { SessionDefaults } from './SessionDefaults';

@ObjectType()
@Entity()
export class CodeSessionDefaults extends SessionDefaults {
  @OneToOne(() => Project)
  @JoinColumn()
  readonly project: Project;
  @Column()
  projectId: string;
}
