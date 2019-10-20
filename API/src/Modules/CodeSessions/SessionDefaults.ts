// API/src/Modules/CodeSessions/SessionDefaults.ts
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class SessionDefaults extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field(() => [String])
  @Column({ type: 'varchar', array: true })
  extensions: string[];
}
