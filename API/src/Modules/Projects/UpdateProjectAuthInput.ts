// API/src/Modules/Projects/UpdateProjectAuthInput.ts
import { InputType, Field } from 'type-graphql';
import { ProjectAuth } from './ProjectAuthModel';

@InputType()
export class UpdateProjectAuthInput implements Partial<ProjectAuth> {
  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  password: string;
}
