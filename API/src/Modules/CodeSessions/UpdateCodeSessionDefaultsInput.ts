// API/src/Modules/CodeSession/UpdateCodeSessionDefaultsInput.ts
import { InputType, Field } from 'type-graphql';
import { CodeSessionDefaults } from './CodeSessionDefaultsModel';

@InputType()
export class UpdateCodeSessionDefaultsInput
  implements Partial<CodeSessionDefaults> {
  @Field(() => [String], { nullable: true })
  extensions?: string[];
}
