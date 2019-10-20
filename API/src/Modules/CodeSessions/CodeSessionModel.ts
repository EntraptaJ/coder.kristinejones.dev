// API/src/Modules/CodeSession/CodeSessionModel.ts
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  AfterRemove,
} from 'typeorm';
import { Project } from '../Projects/ProjectModel';
import Docker, { Network } from 'dockerode';
import tempy from 'tempy';
import git from 'simple-git';
import tar from 'tar';
import { CodeSessionDefaults } from './CodeSessionDefaultsModel';
import { UserDefaults } from '../Users/UserDefaultsModel';

const docker = new Docker({ version: 'v1.40' });

@ObjectType()
@Entity()
export class CodeSession extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt: Date;

  @OneToOne(() => Project, (project) => project.codeSession, {
    cascade: ['insert'],
  })
  project?: Project;

  @Field()
  @Column('varchar')
  containerId: string;

  @Field()
  @Column('varchar')
  networkId: string;

  static async createCodingSession(
    project: Project,
    userId?: string,
  ): Promise<CodeSession> {
    const codeSession = CodeSession.create();
    const proxyContainers = await docker.listContainers({
      limit: 1,
      filters: '{"label": ["com.coder.proxy=true"]}',
    });
    if (!proxyContainers[0]) throw new Error('PROXY CONTAINER INVALID');
    const proxyContainer = proxyContainers[0];

    const sessionNetwork: Network = await docker.createNetwork({
      Name: `${project.id}-network`,
    });
    codeSession.networkId = sessionNetwork.id;

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

    const userDefaults = await UserDefaults.findOne({ where: { userId } });

    const sessionDefaults = await CodeSessionDefaults.findOne({
      where: { projectId: project.id },
    });

    let defaults: UserDefaults | CodeSessionDefaults | undefined;

    if (userDefaults && !sessionDefaults) defaults = userDefaults;
    else defaults = sessionDefaults;

    const container = await docker.createContainer({
      Image:
        'docker.pkg.github.com/kristianfjones/docker-images/vs-code-alpine',
      Env: defaults
        ? [
            `EXTENSIONS=${defaults.extensions
              .map(
                (extension) =>
                  `/usr/local/bin/code-server --install-extension ${extension} --extensions-dir=/home/vs-code/.code/extensions --user-data-dir=/home/vs-code/.code/data`,
              )
              .join(' && ')}`,
          ]
        : undefined,
      HostConfig: {
        NetworkMode: sessionNetwork.id,
        Binds: ['/var/run/docker.sock:/var/run/docker.sock'],
      },
    });

    await container.putArchive(compress, {
      path: '/home/vs-code/Projects/',
    });
    await container.start();
    const { Config } = await container.inspect();
    codeSession.containerId = Config.Hostname;

    setTimeout(
      () => sessionNetwork.connect({ Container: proxyContainer.Id }),
      700,
    );

    return codeSession;
  }

  @AfterRemove()
  async cleanupAfterRemove(): Promise<void> {
    const proxyContainers = await docker.listContainers({
      limit: 1,
      filters: '{"label": ["com.coder.proxy=true"]}',
    });
    if (!proxyContainers[0]) throw new Error('PROXY CONTAINER INVALID');
    const proxyContainer = proxyContainers[0];

    const sessionNetwork = await docker.getNetwork(this.networkId);

    setTimeout(async () => {
      await sessionNetwork.disconnect({ Container: proxyContainer.Id });

      await sessionNetwork.remove();
    }, 700);
  }
}
