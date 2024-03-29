import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Auths = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LinkProvider = {
  __typename?: 'LinkProvider';
  errors?: Maybe<Array<FieldError>>;
  link?: Maybe<Scalars['String']>;
};

export type LinksProvider = {
  __typename?: 'LinksProvider';
  links?: Maybe<Array<Scalars['String']>>;
};

export type Messages = {
  __typename?: 'Messages';
  id: Scalars['Float'];
  message: Scalars['String'];
  owner: Scalars['String'];
  roomToken: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: UserResponse;
  createMessage: Messages;
  deleteRoom: Scalars['Boolean'];
  enterExistingRoom: LinkProvider;
  enterRoom: LinkProvider;
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  matchPassword: PasswordMatcher;
  newRoom: Room;
  register: UserResponse;
  userById?: Maybe<User>;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateMessageArgs = {
  text: Scalars['String'];
  token: Scalars['String'];
};


export type MutationDeleteRoomArgs = {
  id: Scalars['Int'];
};


export type MutationEnterExistingRoomArgs = {
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationEnterRoomArgs = {
  name: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationMatchPasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationNewRoomArgs = {
  input: RoomVar;
  token: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: Auths;
};


export type MutationUserByIdArgs = {
  id: Scalars['Int'];
};

export type PasswordMatcher = {
  __typename?: 'PasswordMatcher';
  errors?: Maybe<Array<FieldError>>;
  isThere?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  messagesByRoom: Array<Messages>;
  myRoom?: Maybe<Array<Scalars['String']>>;
  room?: Maybe<Room>;
  roomWithUser: LinksProvider;
  rooms: Array<Room>;
};


export type QueryMessagesByRoomArgs = {
  token: Scalars['String'];
};


export type QueryRoomArgs = {
  token: Scalars['String'];
};

export type Room = {
  __typename?: 'Room';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  name: Scalars['String'];
  owner: Scalars['Float'];
  token: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Float'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RoomVar = {
  name: Scalars['String'];
  password: Scalars['String'];
};

export type AuthSnippetFragment = { __typename?: 'User', id: number, email: string, username: string, createdAt: string, updatedAt: string };

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type MessageSnippetFragment = { __typename?: 'Messages', id: number, owner: string, roomToken: string, message: string };

export type RoomSnippetFragment = { __typename?: 'Room', id: number, owner: number, name: string, token: string, createdAt: any };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, email: string, username: string, createdAt: string, updatedAt: string } | null | undefined };

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, email: string, username: string, createdAt: string, updatedAt: string } | null | undefined } };

export type NewRoomMutationVariables = Exact<{
  input: RoomVar;
  token: Scalars['String'];
}>;


export type NewRoomMutation = { __typename?: 'Mutation', newRoom: { __typename?: 'Room', id: number, owner: number, name: string, token: string, createdAt: any } };

export type DeleteRoomMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteRoomMutation = { __typename?: 'Mutation', deleteRoom: boolean };

export type EnterExistingRoomMutationVariables = Exact<{
  name: Scalars['String'];
  password: Scalars['String'];
}>;


export type EnterExistingRoomMutation = { __typename?: 'Mutation', enterExistingRoom: { __typename?: 'LinkProvider', link?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type EnterRoomMutationVariables = Exact<{
  name: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
}>;


export type EnterRoomMutation = { __typename?: 'Mutation', enterRoom: { __typename?: 'LinkProvider', link?: string | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type UserByIdMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserByIdMutation = { __typename?: 'Mutation', userById?: { __typename?: 'User', username: string } | null | undefined };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, email: string, username: string, createdAt: string, updatedAt: string } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MatchPasswordMutationVariables = Exact<{
  password: Scalars['String'];
  token: Scalars['String'];
}>;


export type MatchPasswordMutation = { __typename?: 'Mutation', matchPassword: { __typename?: 'PasswordMatcher', isThere?: boolean | null | undefined, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined } };

export type CreateMessageMutationVariables = Exact<{
  token: Scalars['String'];
  text: Scalars['String'];
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Messages', id: number, owner: string, roomToken: string, message: string } };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, email: string, username: string, createdAt: string, updatedAt: string } | null | undefined } };

export type MessagesByRoomQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type MessagesByRoomQuery = { __typename?: 'Query', messagesByRoom: Array<{ __typename?: 'Messages', id: number, owner: string, roomToken: string, message: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string } | null | undefined };

export type MyRoomQueryVariables = Exact<{ [key: string]: never; }>;


export type MyRoomQuery = { __typename?: 'Query', myRoom?: Array<string> | null | undefined };

export type RoomQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type RoomQuery = { __typename?: 'Query', room?: { __typename?: 'Room', id: number, owner: number, name: string, token: string, createdAt: any } | null | undefined };

export type RoomWithUserQueryVariables = Exact<{ [key: string]: never; }>;


export type RoomWithUserQuery = { __typename?: 'Query', roomWithUser: { __typename?: 'LinksProvider', links?: Array<string> | null | undefined } };

export const MessageSnippetFragmentDoc = gql`
    fragment MessageSnippet on Messages {
  id
  owner
  roomToken
  message
}
    `;
export const RoomSnippetFragmentDoc = gql`
    fragment RoomSnippet on Room {
  id
  owner
  name
  token
  createdAt
}
    `;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const AuthSnippetFragmentDoc = gql`
    fragment AuthSnippet on User {
  id
  email
  username
  createdAt
  updatedAt
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...AuthSnippet
  }
}
    ${RegularErrorFragmentDoc}
${AuthSnippetFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const NewRoomDocument = gql`
    mutation NewRoom($input: roomVar!, $token: String!) {
  newRoom(input: $input, token: $token) {
    ...RoomSnippet
  }
}
    ${RoomSnippetFragmentDoc}`;

export function useNewRoomMutation() {
  return Urql.useMutation<NewRoomMutation, NewRoomMutationVariables>(NewRoomDocument);
};
export const DeleteRoomDocument = gql`
    mutation DeleteRoom($id: Int!) {
  deleteRoom(id: $id)
}
    `;

export function useDeleteRoomMutation() {
  return Urql.useMutation<DeleteRoomMutation, DeleteRoomMutationVariables>(DeleteRoomDocument);
};
export const EnterExistingRoomDocument = gql`
    mutation enterExistingRoom($name: String!, $password: String!) {
  enterExistingRoom(name: $name, password: $password) {
    errors {
      field
      message
    }
    link
  }
}
    `;

export function useEnterExistingRoomMutation() {
  return Urql.useMutation<EnterExistingRoomMutation, EnterExistingRoomMutationVariables>(EnterExistingRoomDocument);
};
export const EnterRoomDocument = gql`
    mutation EnterRoom($name: String!, $password: String!, $token: String!) {
  enterRoom(name: $name, password: $password, token: $token) {
    link
    errors {
      field
      message
    }
  }
}
    `;

export function useEnterRoomMutation() {
  return Urql.useMutation<EnterRoomMutation, EnterRoomMutationVariables>(EnterRoomDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const UserByIdDocument = gql`
    mutation UserById($id: Int!) {
  userById(id: $id) {
    username
  }
}
    `;

export function useUserByIdMutation() {
  return Urql.useMutation<UserByIdMutation, UserByIdMutationVariables>(UserByIdDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    errors {
      ...RegularError
    }
    user {
      ...AuthSnippet
    }
  }
}
    ${RegularErrorFragmentDoc}
${AuthSnippetFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const MatchPasswordDocument = gql`
    mutation MatchPassword($password: String!, $token: String!) {
  matchPassword(password: $password, token: $token) {
    errors {
      ...RegularError
    }
    isThere
  }
}
    ${RegularErrorFragmentDoc}`;

export function useMatchPasswordMutation() {
  return Urql.useMutation<MatchPasswordMutation, MatchPasswordMutationVariables>(MatchPasswordDocument);
};
export const CreateMessageDocument = gql`
    mutation CreateMessage($token: String!, $text: String!) {
  createMessage(token: $token, text: $text) {
    ...MessageSnippet
  }
}
    ${MessageSnippetFragmentDoc}`;

export function useCreateMessageMutation() {
  return Urql.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
  register(options: {username: $username, email: $email, password: $password}) {
    errors {
      ...RegularError
    }
    user {
      ...AuthSnippet
    }
  }
}
    ${RegularErrorFragmentDoc}
${AuthSnippetFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MessagesByRoomDocument = gql`
    query MessagesByRoom($token: String!) {
  messagesByRoom(token: $token) {
    ...MessageSnippet
  }
}
    ${MessageSnippetFragmentDoc}`;

export function useMessagesByRoomQuery(options: Omit<Urql.UseQueryArgs<MessagesByRoomQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MessagesByRoomQuery>({ query: MessagesByRoomDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    username
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const MyRoomDocument = gql`
    query MyRoom {
  myRoom
}
    `;

export function useMyRoomQuery(options: Omit<Urql.UseQueryArgs<MyRoomQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MyRoomQuery>({ query: MyRoomDocument, ...options });
};
export const RoomDocument = gql`
    query Room($token: String!) {
  room(token: $token) {
    ...RoomSnippet
  }
}
    ${RoomSnippetFragmentDoc}`;

export function useRoomQuery(options: Omit<Urql.UseQueryArgs<RoomQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RoomQuery>({ query: RoomDocument, ...options });
};
export const RoomWithUserDocument = gql`
    query RoomWithUser {
  roomWithUser {
    links
  }
}
    `;

export function useRoomWithUserQuery(options: Omit<Urql.UseQueryArgs<RoomWithUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RoomWithUserQuery>({ query: RoomWithUserDocument, ...options });
};