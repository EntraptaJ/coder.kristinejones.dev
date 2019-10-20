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
import { CodeSessionDefaults } from '../CodeSessions/CodeSessionDefaultsModel';
import { UpdateCodeSessionDefaultsInput } from '../CodeSessions/UpdateCodeSessionDefaultsInput';
import { UserDefaults } from '../Users/UserDefaultsModel';

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
    @Arg('input') { auth, name, sessionDefaults }: UpdateProjectInput,
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

    let codeSessionDefaults = await CodeSessionDefaults.findOne({
      where: { projectId: project.id },
    });
    if (sessionDefaults) {
      if (codeSessionDefaults)
        for (const [field, value] of Object.entries(sessionDefaults) as [
          keyof UpdateCodeSessionDefaultsInput,
          any,
        ][])
          codeSessionDefaults[field] = value;
      else {
        codeSessionDefaults = CodeSessionDefaults.create({
          projectId: project.id,
          ...sessionDefaults,
        });
      }
      await codeSessionDefaults.save();
    }

    if (name) project.name = name;
    await project.save();

    return project;
  }

  @Authorized()
  @Mutation(() => Boolean)
  async addUserDefaults(
    @Arg('extensions', () => [String]) extensions: string[],
    @Ctx() { currentUser }: AuthContext,
  ): Promise<boolean> {
    const userDefaults = UserDefaults.create({
      userId: currentUser.id,
      extensions,
    });

    await userDefaults.save();

    return true;
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
    return ProjectAuth.findOne({ where: { id: projectAuthId } });
  }
}
