// API/src/Modules/Auth/CurrentUser.ts
import { Field, ObjectType } from 'type-graphql';
import { User } from 'API/Modules/Users/UserModel';
import { UserRole } from '../Users/UserRole';
import { Project } from '../Projects/ProjectModel';

@ObjectType()
export class CurrentUser extends User {
  @Field()
  email: string;

  @Field(() => UserRole)
  roles: UserRole[];

  @Field(() => [Project])
  projects: Promise<Project[]>;
}
