// API/src/Modules/CodeSession/CodeSessionResolver.ts
import { Resolver, Mutation, Authorized, Arg, Ctx } from 'type-graphql';
import { CodeSession } from './CodeSessionModel';
import { Project } from '../Projects/ProjectModel';
import { AuthContext } from 'API/Context';
import { Permission } from '../Permissions/Permission';
import { ApolloError } from 'apollo-server-koa';
import tempy from 'tempy';
import git from 'simple-git';
import Docker from 'dockerode';
import tar from 'tar';

const docker = new Docker({ version: 'v1.40' });

const DOCKER_NETWORK = process.env.WEB_NETWORK || 'docker-network';

@Resolver(() => CodeSession)
export class CodeSessionResolver {
  @Authorized()
  @Mutation(() => Project)
  async startCodingSession(
    @Arg('projectId') projectId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Project> {
    const project = await Project.getUserProject(
      projectId,
      currentUser,
      { relations: ['codeSession', 'projectAuth'] },
      Permission.WRITE,
    );
    if (project.codeSession) throw new ApolloError('EXISTING_CODE_SESSION');

    const codeSession = CodeSession.create();

    const tempFolder = tempy.directory();

    let remote: string = project.gitUrl;
    if (project.projectAuth)
      remote = remote.replace(
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
        NetworkMode: DOCKER_NETWORK,
        Binds: ['/var/run/docker.sock:/var/run/docker.sock'],
      },
    });

    await container.putArchive(compress, {
      path: '/home/vs-code/Projects/',
    });

    console.log(container);

    await container.start();

    const data = await container.inspect();
    console.log(data);

    codeSession.containerId = data.Config.Hostname;

    project.codeSession = codeSession;
    await project.save();

    return project;
  }

  @Authorized()
  @Mutation(() => Project)
  async finishCodingSession(
    @Arg('projectId') projectId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Project> {
    const project = await Project.getUserProject(
      projectId,
      currentUser,
      { relations: ['codeSession'] },
      Permission.WRITE,
    );
    if (!project.codeSession) throw new ApolloError('NO_EXISTING_CODE_SESSION');

    await docker
      .getContainer(project.codeSession.containerId)
      .remove({ force: true });

    project.codeSession = null;
    await project.save();

    return project;
  }
}
