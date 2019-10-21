import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const DeleteIdeaDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteIdea"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ideaId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteIdea"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ideaId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ideaId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"username"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"ideas"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"body"},"arguments":[],"directives":[]}]}}]}}]}}]};
export type DeleteIdeaMutationFn = ApolloReactCommon.MutationFunction<DeleteIdeaMutation, DeleteIdeaMutationVariables>;

    export function useDeleteIdeaMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteIdeaMutation, DeleteIdeaMutationVariables>) {
      return ApolloReactHooks.useMutation<DeleteIdeaMutation, DeleteIdeaMutationVariables>(DeleteIdeaDocument, baseOptions);
    }
export type DeleteIdeaMutationHookResult = ReturnType<typeof useDeleteIdeaMutation>;
export type DeleteIdeaMutationResult = ApolloReactCommon.MutationResult<DeleteIdeaMutation>;
export type DeleteIdeaMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteIdeaMutation, DeleteIdeaMutationVariables>;export type DeleteIdeaMutationVariables = {
  ideaId: Types.Scalars['String']
};


export type DeleteIdeaMutation = (
  { __typename?: 'Mutation' }
  & { deleteIdea: (
    { __typename?: 'CurrentUser' }
    & Pick<Types.CurrentUser, 'id' | 'username'>
    & { ideas: Array<(
      { __typename?: 'Idea' }
      & Pick<Types.Idea, 'id' | 'title' | 'body'>
    )> }
  ) }
);
