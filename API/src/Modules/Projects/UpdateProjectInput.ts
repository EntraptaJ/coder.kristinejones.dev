// API/src/Modules/Projects/UpdateProjectInput
import { InputType, Field } from 'type-graphql';
import { UpdateProjectAuthInput } from './UpdateProjectAuthInput';
import { UpdateCodeSessionDefaultsInput } from '../CodeSessions/UpdateCodeSessionDefaultsInput';

@InputType()
export class UpdateProjectInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => UpdateProjectAuthInput, { nullable: true })
  auth?: UpdateProjectAuthInput;

  @Field(() => UpdateCodeSessionDefaultsInput, { nullable: true })
  sessionDefaults?: UpdateCodeSessionDefaultsInput;
}
