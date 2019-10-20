// API/src/Modules/Ideas/IdeaInput.ts
import { InputType, Field } from 'type-graphql'
import { Idea } from './IdeasModel'

@InputType()
export class IdeaInput implements Partial<Idea> {
    @Field()
    title: string

    @Field({ nullable: true })
    body?: string
}