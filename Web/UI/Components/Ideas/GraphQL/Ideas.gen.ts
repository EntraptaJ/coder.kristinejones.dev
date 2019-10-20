import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const IdeasDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Ideas"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"ideas"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"body"},"arguments":[],"directives":[]}]}}]}}]}}]};

    export function useIdeasQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<IdeasQuery, IdeasQueryVariables>) {
      return ApolloReactHooks.useQuery<IdeasQuery, IdeasQueryVariables>(IdeasDocument, baseOptions);
    }
      export function useIdeasLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<IdeasQuery, IdeasQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<IdeasQuery, IdeasQueryVariables>(IdeasDocument, baseOptions);
      }
      
export type IdeasQueryHookResult = ReturnType<typeof useIdeasQuery>;
export type IdeasQueryResult = ApolloReactCommon.QueryResult<IdeasQuery, IdeasQueryVariables>;export type IdeasQueryVariables = {};


export type IdeasQuery = (
  { __typename?: 'Query' }
  & { currentUser: Types.Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<Types.CurrentUser, 'id'>
    & { ideas: Array<(
      { __typename?: 'Idea' }
      & Pick<Types.Idea, 'id' | 'title' | 'body'>
    )> }
  )> }
);
