// API/src/Modules/Ideas/IdeasModel.ts
import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../Users/UserModel';

@ObjectType()
@Entity()
export class Idea extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field()
  @CreateDateColumn()
  readonly createdAt: Date;

  @Field()
  @UpdateDateColumn()
  readonly updatedAt: Date;

  @ManyToOne(() => User)
  readonly user: User;
  @Column()
  userId: string

  @Field()
  @Column('varchar')
  title: string

  @Field({ nullable: true })
  @Column('varchar', { nullable: true })
  body?: string
}