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
  createProject: CurrentUser,
  updateProject: Project,
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


export type MutationCreateProjectArgs = {
  input: ProjectInput
};


export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput,
  projectId: Scalars['String']
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
  project: Project,
  users: Array<User>,
  user: User,
  utilities: Array<Utility>,
  helloWorld: Scalars['String'],
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

export type UpdateProjectAuthInput = {
  username?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
};

export type UpdateProjectInput = {
  name?: Maybe<Scalars['String']>,
  auth?: Maybe<UpdateProjectAuthInput>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  username: Scalars['String'],
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
export type HasSetupQueryVariables = {};


export type HasSetupQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hasSetup'>
);
