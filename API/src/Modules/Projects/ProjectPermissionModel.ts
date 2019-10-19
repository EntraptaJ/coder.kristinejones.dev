// API/src/Modules/Projects/ProjectPermissionModel.ts
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from './ProjectModel';
import { User } from '../Users/UserModel';
import { Permission } from '../Permissions/Permission';

@Entity()
export class ProjectPermission extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @ManyToOne(() => Project, (project) => project.permissions)
  @JoinColumn()
  project: Project;
  @Column()
  projectId: string;

  @ManyToOne(() => User)
  user: User;
  @Column()
  userId: string;

  @Column({
    type: 'enum',
    enum: Permission,
    array: true,
    default: [Permission.READ],
  })
  permission: Permission[];
}
