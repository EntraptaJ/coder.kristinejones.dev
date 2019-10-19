// API/src/Modules/Projects/ProjectAuthInput.ts
import { InputType, Field } from 'type-graphql';
import { ProjectAuth } from './ProjectAuthModel';

@InputType()
export class ProjectAuthInput implements Partial<ProjectAuth> {
  @Field()
  username: string;

  @Field()
  password: string;
}
