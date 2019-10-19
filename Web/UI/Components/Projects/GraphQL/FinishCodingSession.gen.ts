import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const FinishCodingSessionDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"FinishCodingSession"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"finishCodingSession"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"gitUrl"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"codeSession"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"containerId"},"arguments":[],"directives":[]}]}}]}}]}}]};
export type FinishCodingSessionMutationFn = ApolloReactCommon.MutationFunction<FinishCodingSessionMutation, FinishCodingSessionMutationVariables>;

    export function useFinishCodingSessionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FinishCodingSessionMutation, FinishCodingSessionMutationVariables>) {
      return ApolloReactHooks.useMutation<FinishCodingSessionMutation, FinishCodingSessionMutationVariables>(FinishCodingSessionDocument, baseOptions);
    }
export type FinishCodingSessionMutationHookResult = ReturnType<typeof useFinishCodingSessionMutation>;
export type FinishCodingSessionMutationResult = ApolloReactCommon.MutationResult<FinishCodingSessionMutation>;
export type FinishCodingSessionMutationOptions = ApolloReactCommon.BaseMutationOptions<FinishCodingSessionMutation, FinishCodingSessionMutationVariables>;export type FinishCodingSessionMutationVariables = {
  projectId: Types.Scalars['String']
};


export type FinishCodingSessionMutation = (
  { __typename?: 'Mutation' }
  & { finishCodingSession: (
    { __typename?: 'Project' }
    & Pick<Types.Project, 'id' | 'name' | 'gitUrl'>
    & { codeSession: Types.Maybe<(
      { __typename?: 'CodeSession' }
      & Pick<Types.CodeSession, 'id' | 'containerId'>
    )> }
  ) }
);
