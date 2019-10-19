// API/src/Modules/Projects/ProjectModel.ts
import {
  Field,
  ID,
  ObjectType,
  UnauthorizedError,
  ForbiddenError,
} from 'type-graphql';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Column,
  OneToMany,
  FindOneOptions,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ProjectPermission } from './ProjectPermissionModel';
import { User } from '../Users/UserModel';
import { Permission } from '../Permissions/Permission';
import { ProjectAuth } from './ProjectAuthModel';

@ObjectType()
@Entity()
export class Project extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field()
  @Column('varchar')
  name: string;

  @OneToOne(() => ProjectAuth, (projectAuth) => projectAuth.project, {
    cascade: ['insert'],
  })
  @JoinColumn()
  projectAuth: ProjectAuth;
  @Column()
  projectAuthId: string;

  @Field()
  @Column('varchar')
  gitUrl: string;

  @Field({ nullable: true })
  @Column('varchar', { nullable: true })
  activeHostname: string;

  @OneToMany(
    () => ProjectPermission,
    (projectPermission) => projectPermission.project,
    {
      cascade: ['insert', 'update'],
    },
  )
  permissions: ProjectPermission[];

  async checkUserAuthorization(
    user: User | string,
    requiredPermission: Permission,
  ): Promise<Project> {
    const authorization = await ProjectPermission.findOne({
      projectId: this.id,
      userId: typeof user === 'string' ? user : user.id,
    });

    if (authorization && authorization.permission.includes(requiredPermission))
      return this;

    throw new UnauthorizedError();
  }

  static async getUserProjects(
    user: User | string,
    requiredPermission = Permission.READ,
  ): Promise<Project[]> {
    const projects = await this.createQueryBuilder('project')
      .leftJoinAndSelect('project.permissions', 'permissions')
      .where('permissions.userId = :userId', {
        userId: typeof user === 'string' ? user : user.id,
      })
      .andWhere(`permissions.permission @> '{"${requiredPermission}"}'`)
      .getMany();

    return projects;
  }

  static async getUserProject(
    projectId: string,
    user: User | string,
    findActions?: FindOneOptions<Project>,
    requiredPermission = Permission.READ,
  ): Promise<Project> {
    const project = await this.findOneOrFail(projectId, findActions);
    if (!project) throw new ForbiddenError();

    return project.checkUserAuthorization(user, requiredPermission);
  }
}
