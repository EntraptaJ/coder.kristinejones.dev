// API/src/Modules/Projects/ProjectUserDefaults.ts
import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne, Column } from 'typeorm';
import { User } from './UserModel';
  
  @ObjectType()
  @Entity()
  export class UserDefaults extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Field()
    @CreateDateColumn()
    readonly createdAt: Date;
  
    @Field()
    @UpdateDateColumn()
    readonly updatedAt: Date;

    @OneToOne(() => User)
    readonly user: User
    @Column()
    userId: string

    @Field(() => [String])
    @Column({ type: 'varchar',  array: true })
    extensions: string[]
  }