// API/src/Modules/Projects/ProjectUserDefaults.ts
import { ObjectType } from 'type-graphql';
import { Column, Entity, OneToOne } from 'typeorm';
import { SessionDefaults } from '../CodeSessions/SessionDefaults';
import { User } from './UserModel';

@ObjectType()
@Entity()
export class UserDefaults extends SessionDefaults {
  @OneToOne(() => User)
  readonly user: User;
  @Column()
  userId: string;
}
