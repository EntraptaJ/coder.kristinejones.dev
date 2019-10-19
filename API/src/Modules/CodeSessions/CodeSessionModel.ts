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

  static async createCodingSession(project: Project): Promise<CodeSession> {
    const codeSession = this.create();

    const proxyContainers = await docker.listContainers({
      limit: 1,
      filters: '{"label": ["com.coder.proxy=true"]}',
    });
    if (!proxyContainers[0]) throw new Error('PROXY CONTAINER INVALID');
    const proxyContainer = proxyContainers[0];

    const sessionNetwork: Network = await docker.createNetwork({
      Name: `${project.id}-network`,
    });
    await sessionNetwork.connect({ Container: proxyContainer.Id });
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

    const container = await docker.createContainer({
      Image:
        'docker.pkg.github.com/kristianfjones/docker-images/vs-code-alpine',
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

    await sessionNetwork.disconnect({ Container: proxyContainer.Id });

    await sessionNetwork.remove();
  }
}
