// API/src/Modules/Projects/UpdateProjectInput
import { InputType, Field } from 'type-graphql';
import { UpdateProjectAuthInput } from './UpdateProjectAuthInput';

@InputType()
export class UpdateProjectInput {
  @Field({ nullable: true })
  name?: string;

  @Field(() => UpdateProjectAuthInput, { nullable: true })
  auth?: UpdateProjectAuthInput;
}
