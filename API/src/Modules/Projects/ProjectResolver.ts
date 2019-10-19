// API/src/Modules/Projects/ProjectsResolver.ts
import { Resolver, Query, Authorized, Arg, Ctx, Mutation } from 'type-graphql';
import { Project } from './ProjectModel';
import { AuthContext } from 'API/Context';
import { CurrentUser } from '../Auth/CurrentUser';
import { ProjectInput } from './ProjectInput';
import { ProjectAuth } from './ProjectAuthModel';
import { ProjectPermission } from './ProjectPermissionModel';
import { Permission } from '../Permissions/Permission';
import Docker from 'dockerode';
import git from 'simple-git';
import tar from 'tar';
import tempy from 'tempy';

const docker = new Docker({ version: 'v1.40' });

@Resolver(() => Project)
export class ProjectResolver {
  @Authorized()
  @Query(() => [Project])
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
    const projectAuth = ProjectAuth.create(auth);
    const projectUserPermissions = ProjectPermission.create({
      userId: currentUser.id,
      permission: [Permission.READ, Permission.WRITE, Permission.ADMIN],
    });

    project.permissions = [projectUserPermissions];
    project.projectAuth = projectAuth;
    await project.save();

    return currentUser;
  }

  @Authorized()
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

    console.log('Tempy');
    const tempFolder = tempy.directory();

    const remote = project.gitUrl.replace(
      'https://',
      `https://${project.projectAuth.username}:${project.projectAuth.password}@`,
    );

    await git(tempFolder)
      .silent(true)
      .clone(remote, './');

    const compress = tar.c({ cwd: tempFolder }, ['./']);

    const container = await docker.createContainer({
      Image:
        'docker.pkg.github.com/kristianfjones/docker-images/vs-code-alpine',
      HostConfig: {
        NetworkMode: 'coder_default',
      },
    });

    await container.putArchive(compress, {
      path: '/home/vs-code/Projects/',
    });

    await container.start();

    const { Config } = await container.inspect();

    return `${Config.Hostname}.code.kristianjones.dev`;
  }
}
