// API/src/Modules/CodeSession/CodeSessionResolver.ts
import { AuthContext } from 'API/Context';
import { ApolloError } from 'apollo-server-koa';
import Docker from 'dockerode';
import { Arg, Authorized, Ctx, Mutation, Resolver } from 'type-graphql';
import { Permission } from '../Permissions/Permission';
import { Project } from '../Projects/ProjectModel';
import { CodeSession } from './CodeSessionModel';

const docker = new Docker({ version: 'v1.40' });

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

    const codeSession = await CodeSession.createCodingSession(project,  currentUser);

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

    const codeSession = await CodeSession.findOneOrFail({
      where: { id: project.codeSessionId },
    });

    await docker
      .getContainer(project.codeSession.containerId)
      .remove({ force: true, v: true });

    project.codeSession = null;
    await project.save();
    await codeSession.remove();

    return project;
  }
}
