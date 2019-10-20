// API/src/Modules/Projects/ProjectsResolver.ts
import {
  Resolver,
  Query,
  Authorized,
  Arg,
  Ctx,
  Mutation,
  FieldResolver,
  Root,
} from 'type-graphql';
import { Project } from './ProjectModel';
import { AuthContext } from 'API/Context';
import { CurrentUser } from '../Auth/CurrentUser';
import { ProjectInput } from './ProjectInput';
import { ProjectAuth } from './ProjectAuthModel';
import { ProjectPermission } from './ProjectPermissionModel';
import { Permission } from '../Permissions/Permission';
import { UpdateProjectInput } from './UpdateProjectInput';
import { CodeSession } from '../CodeSessions/CodeSessionModel';
import { UpdateProjectAuthInput } from './UpdateProjectAuthInput';
import { UserDefaults } from '../Users/UserDefaultsModel';

// const docker = new Docker({ version: 'v1.40' });

@Resolver(() => Project)
export class ProjectResolver {
  @Authorized()
  @Query(() => Project)
  async project(
    @Arg('projectId') projectId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Project> {
    return Project.getUserProject(projectId, currentUser);
  }

  @Authorized()
  @Mutation(() => CurrentUser)
  async createProject(
    @Arg('input') { auth, ...projectInput }: ProjectInput,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<CurrentUser> {
    const project = Project.create(projectInput);

    const projectUserPermissions = ProjectPermission.create({
      userId: currentUser.id,
      permission: [Permission.READ, Permission.WRITE, Permission.ADMIN],
    });

    if (auth) {
      const projectAuth = ProjectAuth.create(auth);
      project.projectAuth = projectAuth;
    }

    project.permissions = [projectUserPermissions];

    await project.save();

    return currentUser;
  }

  @Authorized()
  @Mutation(() => Project)
  async updateProject(
    @Arg('projectId') projectId: string,
    @Arg('input') { auth, name }: UpdateProjectInput,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Project> {
    const project = await Project.getUserProject(
      projectId,
      currentUser,
      { relations: ['projectAuth'] },
      Permission.ADMIN,
    );

    if (auth) {
      if (project.projectAuth) {
        for (const [field, value] of Object.entries(auth) as [
          keyof UpdateProjectAuthInput,
          string,
        ][])
          project.projectAuth[field] = value;
      } else {
        const projectAuth = ProjectAuth.create(auth);
        project.projectAuth = projectAuth;
      }
    }

    if (name) project.name = name;
    await project.save();

    return project;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async addUserDefaults(@Arg('extensions', () => [String]) extensions: string[], @Ctx() { currentUser }: AuthContext): Promise<boolean> {
    const userDefaults = UserDefaults.create({ userId: currentUser.id, extensions })

    await userDefaults.save()

    return true
  }

  @FieldResolver(() => CodeSession, { nullable: true })
  codeSession(@Root() { codeSessionId }: Project): Promise<
    CodeSession | undefined
  > {
    return CodeSession.findOne({ where: { id: codeSessionId } });
  }

  @FieldResolver(() => CodeSession, { nullable: true })
  projectAuth(@Root() { projectAuthId }: Project): Promise<
    ProjectAuth | undefined
  > {
    console.log(projectAuthId);
    return ProjectAuth.findOne({ where: { id: projectAuthId } });
  }

  /*   @Authorized()
  @Mutation(() => String)
  async codeProject(
    @Arg('projectId') projectId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<string> {
    const project = await Project.getUserProject(
      projectId,
      currentUser,
      { relations: ['projectAuth'] },
      Permission.ADMIN,
    );

    const tempFolder = tempy.directory();

    let remote: string = project.gitUrl;


    await git(tempFolder)
      .silent(true)
      .clone(remote, './');

    const compress = tar.c({ cwd: tempFolder }, ['./']);

    const container = await docker.createContainer({
      Image:
        'docker.pkg.github.com/kristianfjones/docker-images/vs-code-alpine',
      HostConfig: {
        NetworkMode: 'kristianjones_default',
      },
    });

    await container.putArchive(compress, {
      path: '/home/vs-code/Projects/',
    });

    await container.start();

    const { Config } = await container.inspect();

    return `${Config.Hostname}.code.kristianjones.dev`;
  } */
}
