// API/src/Modules/Auth/CurrentUser.ts
import { Field, ObjectType } from 'type-graphql';
import { User } from 'API/Modules/Users/UserModel';
import { UserRole } from '../Users/UserRole';
import { Project } from '../Projects/ProjectModel';
import { Idea } from '../Ideas/IdeasModel';
import { UserDefaults } from '../Users/UserDefaultsModel';

@ObjectType()
export class CurrentUser extends User {
  @Field()
  email: string;

  @Field(() => UserRole)
  roles: UserRole[];

  @Field(() => [Project])
  projects: Promise<Project[]>;

  @Field(() => [Idea])
  ideas: Promise<Idea[]>;

  @Field(() => UserDefaults, { nullable: true })
  userDefaults: Promise<UserDefaults | undefined>;
}
