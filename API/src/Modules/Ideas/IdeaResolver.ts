// API/src/Modules/Ideas/IdeaResolver.ts
import { Resolver, Query, Authorized, Arg, Ctx, Mutation } from 'type-graphql';
import { Idea } from './IdeasModel';
import { AuthContext } from 'API/Context';
import { IdeaInput } from './IdeaInput';
import { CurrentUser } from '../Auth/CurrentUser';

@Resolver(() => Idea)
export class IdeaResolver {
  @Authorized()
  @Query(() => Idea)
  async idea(
    @Arg('ideaId') ideaId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<Idea> {
    return Idea.findOneOrFail({
      where: { id: ideaId, userId: currentUser.id },
    });
  }

  @Authorized()
  @Mutation(() => CurrentUser)
  async createIdea(
    @Arg('input') input: IdeaInput,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<CurrentUser> {
    const newIdea = Idea.create({ ...input, userId: currentUser.id });
    await newIdea.save();

    return currentUser;
  }

  @Authorized()
  @Mutation(() => CurrentUser)
  async deleteIdea(
    @Arg('ideaId') ideaId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<CurrentUser> {
    const idea = await Idea.findOneOrFail({
      where: { id: ideaId, userId: currentUser.id },
    });

    await idea.remove();
    return currentUser;
  }
}
