import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const ProjectsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Projects"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentUser"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"username"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"projects"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"gitUrl"},"arguments":[],"directives":[]}]}}]}}]}}]};

    export function useProjectsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
      return ApolloReactHooks.useQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, baseOptions);
    }
      export function useProjectsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, baseOptions);
      }
      
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsQueryResult = ApolloReactCommon.QueryResult<ProjectsQuery, ProjectsQueryVariables>;export type ProjectsQueryVariables = {};


export type ProjectsQuery = (
  { __typename?: 'Query' }
  & { currentUser: Types.Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<Types.CurrentUser, 'id' | 'username'>
    & { projects: Array<(
      { __typename?: 'Project' }
      & Pick<Types.Project, 'id' | 'name' | 'gitUrl'>
    )> }
  )> }
);
