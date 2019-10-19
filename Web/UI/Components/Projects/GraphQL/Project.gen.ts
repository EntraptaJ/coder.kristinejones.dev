import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const ProjectDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Project"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"gitUrl"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"projectAuth"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"username"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"password"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"codeSession"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"containerId"},"arguments":[],"directives":[]}]}}]}}]}}]};

    export function useProjectQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
      return ApolloReactHooks.useQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, baseOptions);
    }
      export function useProjectLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, baseOptions);
      }
      
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectQueryResult = ApolloReactCommon.QueryResult<ProjectQuery, ProjectQueryVariables>;export type ProjectQueryVariables = {
  projectId: Types.Scalars['String']
};


export type ProjectQuery = (
  { __typename?: 'Query' }
  & { project: (
    { __typename?: 'Project' }
    & Pick<Types.Project, 'id' | 'name' | 'gitUrl'>
    & { projectAuth: Types.Maybe<(
      { __typename?: 'ProjectAuth' }
      & Pick<Types.ProjectAuth, 'id' | 'username' | 'password'>
    )>, codeSession: Types.Maybe<(
      { __typename?: 'CodeSession' }
      & Pick<Types.CodeSession, 'id' | 'containerId'>
    )> }
  ) }
);
