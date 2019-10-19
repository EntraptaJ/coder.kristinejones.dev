// API/src/Modules/Projects/ProjectInput.ts
import { InputType, Field } from 'type-graphql';
import { ProjectAuthInput } from './ProjectAuthInput';

@InputType()
export class ProjectInput {
  @Field()
  name: string;

  @Field()
  gitUrl: string;

  @Field(() => ProjectAuthInput)
  auth: ProjectAuthInput;
}
