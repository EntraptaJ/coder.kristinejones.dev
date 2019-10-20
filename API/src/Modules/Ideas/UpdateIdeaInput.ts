// API/src/Modules/Ideas/UpdateIdeaInput.ts
import { InputType, Field } from 'type-graphql';
import { Idea } from './IdeasModel';

@InputType()
export class UpdateIdeaInput implements Partial<Idea> {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  body?: string;
}
