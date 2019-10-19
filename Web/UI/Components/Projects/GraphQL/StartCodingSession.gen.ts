import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const StartCodingSessionDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"StartCodingSession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCodingSession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"gitUrl"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"codeSession"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"containerId"},"arguments":[],"directives":[]}]}}]}}]}}]};
export type StartCodingSessionMutationFn = ApolloReactCommon.MutationFunction<StartCodingSessionMutation, StartCodingSessionMutationVariables>;

    export function useStartCodingSessionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<StartCodingSessionMutation, StartCodingSessionMutationVariables>) {
      return ApolloReactHooks.useMutation<StartCodingSessionMutation, StartCodingSessionMutationVariables>(StartCodingSessionDocument, baseOptions);
    }
export type StartCodingSessionMutationHookResult = ReturnType<typeof useStartCodingSessionMutation>;
export type StartCodingSessionMutationResult = ApolloReactCommon.MutationResult<StartCodingSessionMutation>;
export type StartCodingSessionMutationOptions = ApolloReactCommon.BaseMutationOptions<StartCodingSessionMutation, StartCodingSessionMutationVariables>;export type StartCodingSessionMutationVariables = {
  projectId: Types.Scalars['String']
};


export type StartCodingSessionMutation = (
  { __typename?: 'Mutation' }
  & { startCodingSession: (
    { __typename?: 'Project' }
    & Pick<Types.Project, 'id' | 'gitUrl'>
    & { codeSession: Types.Maybe<(
      { __typename?: 'CodeSession' }
      & Pick<Types.CodeSession, 'id' | 'containerId'>
    )> }
  ) }
);
