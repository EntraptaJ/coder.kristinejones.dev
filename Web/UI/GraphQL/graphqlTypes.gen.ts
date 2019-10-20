export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
};

export type AuthResponse = {
   __typename?: 'AuthResponse',
  token: Scalars['String'],
  currentUser: CurrentUser,
};

export type CodeSession = {
   __typename?: 'CodeSession',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  containerId: Scalars['String'],
  networkId: Scalars['String'],
};

export type CodeSessionDefaults = {
   __typename?: 'CodeSessionDefaults',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  extensions: Array<Scalars['String']>,
};

export type Configuration = {
   __typename?: 'Configuration',
  id: Scalars['ID'],
};

export type CreateUtilityInput = {
  name: Scalars['String'],
};

export type CurrentUser = {
   __typename?: 'CurrentUser',
  id: Scalars['ID'],
  username: Scalars['String'],
  email: Scalars['String'],
  roles: Array<UserRole>,
  projects: Array<Project>,
  ideas: Array<Idea>,
  userDefaults?: Maybe<UserDefaults>,
};


export type Idea = {
   __typename?: 'Idea',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  title: Scalars['String'],
  body?: Maybe<Scalars['String']>,
};

export type IdeaInput = {
  title: Scalars['String'],
  body?: Maybe<Scalars['String']>,
};

export type LoginInput = {
  username: Scalars['String'],
  password: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  login: AuthResponse,
  register: RegisterResponse,
  resetPasswordReset: Scalars['Boolean'],
  startCodingSession: Project,
  finishCodingSession: Project,
  initialConfiguration: Configuration,
  createIdea: CurrentUser,
  createProject: CurrentUser,
  updateProject: Project,
  addUserDefaults: Scalars['Boolean'],
  createUtility: Utility,
};


export type MutationLoginArgs = {
  input: LoginInput
};


export type MutationRegisterArgs = {
  input: UserInput
};


export type MutationResetPasswordResetArgs = {
  input: RequestPasswordResetInput
};


export type MutationStartCodingSessionArgs = {
  projectId: Scalars['String']
};


export type MutationFinishCodingSessionArgs = {
  projectId: Scalars['String']
};


export type MutationInitialConfigurationArgs = {
  user: UserInput
};


export type MutationCreateIdeaArgs = {
  input: IdeaInput
};


export type MutationCreateProjectArgs = {
  input: ProjectInput
};


export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput,
  projectId: Scalars['String']
};


export type MutationAddUserDefaultsArgs = {
  extensions: Array<Scalars['String']>
};


export type MutationCreateUtilityArgs = {
  input: CreateUtilityInput
};

export type Project = {
   __typename?: 'Project',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  name: Scalars['String'],
  projectAuth?: Maybe<ProjectAuth>,
  gitUrl: Scalars['String'],
  codeSession?: Maybe<CodeSession>,
  sessionDefaults?: Maybe<CodeSessionDefaults>,
};

export type ProjectAuth = {
   __typename?: 'ProjectAuth',
  id: Scalars['String'],
  username: Scalars['String'],
  password: Scalars['String'],
};

export type ProjectAuthInput = {
  username: Scalars['String'],
  password: Scalars['String'],
};

export type ProjectInput = {
  name: Scalars['String'],
  gitUrl: Scalars['String'],
  auth?: Maybe<ProjectAuthInput>,
};

export type Query = {
   __typename?: 'Query',
  currentUser?: Maybe<CurrentUser>,
  hasSetup: Scalars['Boolean'],
  idea: Idea,
  project: Project,
  users: Array<User>,
  user: User,
  utilities: Array<Utility>,
  helloWorld: Scalars['String'],
};


export type QueryIdeaArgs = {
  ideaId: Scalars['String']
};


export type QueryProjectArgs = {
  projectId: Scalars['String']
};


export type QueryUserArgs = {
  userId: Scalars['String']
};

export type RegisterResponse = {
   __typename?: 'RegisterResponse',
  success: Scalars['Boolean'],
  token: Scalars['String'],
  currentUser: CurrentUser,
};

export type RequestPasswordResetInput = {
  email: Scalars['String'],
};

export type ResetPasswordInput = {
  token: Scalars['String'],
  password: Scalars['String'],
};

export type SessionDefaults = {
   __typename?: 'SessionDefaults',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  extensions: Array<Scalars['String']>,
};

export type UpdateCodeSessionDefaultsInput = {
  extensions?: Maybe<Array<Scalars['String']>>,
};

export type UpdateProjectAuthInput = {
  username?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
};

export type UpdateProjectInput = {
  name?: Maybe<Scalars['String']>,
  auth?: Maybe<UpdateProjectAuthInput>,
  sessionDefaults?: Maybe<UpdateCodeSessionDefaultsInput>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  username: Scalars['String'],
};

export type UserDefaults = {
   __typename?: 'UserDefaults',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  extensions: Array<Scalars['String']>,
};

export type UserInput = {
  username: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
};

export enum UserRole {
  Guest = 'GUEST',
  User = 'USER',
  Admin = 'ADMIN'
}

export type Utility = {
   __typename?: 'Utility',
  id: Scalars['ID'],
  name: Scalars['String'],
};
export type IdeasQueryVariables = {};


export type IdeasQuery = (
  { __typename?: 'Query' }
  & { currentUser: Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<CurrentUser, 'id'>
    & { ideas: Array<(
      { __typename?: 'Idea' }
      & Pick<Idea, 'id' | 'title' | 'body'>
    )> }
  )> }
);

export type CreateProjectMutationVariables = {
  input: ProjectInput
};


export type CreateProjectMutation = (
  { __typename?: 'Mutation' }
  & { createProject: (
    { __typename?: 'CurrentUser' }
    & Pick<CurrentUser, 'id' | 'username'>
    & { projects: Array<(
      { __typename?: 'Project' }
      & Pick<Project, 'id' | 'name' | 'gitUrl'>
    )> }
  ) }
);

export type FinishCodingSessionMutationVariables = {
  projectId: Scalars['String']
};


export type FinishCodingSessionMutation = (
  { __typename?: 'Mutation' }
  & { finishCodingSession: (
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name' | 'gitUrl'>
    & { codeSession: Maybe<(
      { __typename?: 'CodeSession' }
      & Pick<CodeSession, 'id' | 'containerId'>
    )> }
  ) }
);

export type ProjectQueryVariables = {
  projectId: Scalars['String']
};


export type ProjectQuery = (
  { __typename?: 'Query' }
  & { project: (
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name' | 'gitUrl'>
    & { projectAuth: Maybe<(
      { __typename?: 'ProjectAuth' }
      & Pick<ProjectAuth, 'id' | 'username' | 'password'>
    )>, codeSession: Maybe<(
      { __typename?: 'CodeSession' }
      & Pick<CodeSession, 'id' | 'containerId'>
    )> }
  ) }
);

export type ProjectsQueryVariables = {};


export type ProjectsQuery = (
  { __typename?: 'Query' }
  & { currentUser: Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<CurrentUser, 'id' | 'username'>
    & { projects: Array<(
      { __typename?: 'Project' }
      & Pick<Project, 'id' | 'name' | 'gitUrl'>
    )> }
  )> }
);

export type StartCodingSessionMutationVariables = {
  projectId: Scalars['String']
};


export type StartCodingSessionMutation = (
  { __typename?: 'Mutation' }
  & { startCodingSession: (
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'gitUrl'>
    & { codeSession: Maybe<(
      { __typename?: 'CodeSession' }
      & Pick<CodeSession, 'id' | 'containerId'>
    )> }
  ) }
);

export type UpdateProjectMutationVariables = {
  projectId: Scalars['String'],
  input: UpdateProjectInput
};


export type UpdateProjectMutation = (
  { __typename?: 'Mutation' }
  & { updateProject: (
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'name' | 'gitUrl'>
    & { projectAuth: Maybe<(
      { __typename?: 'ProjectAuth' }
      & Pick<ProjectAuth, 'id' | 'username' | 'password'>
    )> }
  ) }
);

export type CurrentUserFragment = (
  { __typename?: 'CurrentUser' }
  & Pick<CurrentUser, 'username' | 'id' | 'roles'>
);

export type CurrentUserQueryVariables = {};


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser: Maybe<{ __typename?: 'CurrentUser' }
    & CurrentUserFragment
  > }
);

export type LoginMutationVariables = {
  input: LoginInput
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'token'>
    & { currentUser: { __typename?: 'CurrentUser' }
      & CurrentUserFragment
     }
  ) }
);

export type RegisterMutationVariables = {
  input: UserInput
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'RegisterResponse' }
    & Pick<RegisterResponse, 'token'>
    & { currentUser: { __typename?: 'CurrentUser' }
      & CurrentUserFragment
     }
  ) }
);

export type UsersQueryVariables = {};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'username' | 'id'>
  )> }
);

export type InitialConfigurationMutationVariables = {
  userInput: UserInput
};


export type InitialConfigurationMutation = (
  { __typename?: 'Mutation' }
  & { initialConfiguration: (
    { __typename?: 'Configuration' }
    & Pick<Configuration, 'id'>
  ) }
);
