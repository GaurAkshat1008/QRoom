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
  password: Scalars['String'];
  username: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteRoom: Scalars['Boolean'];
  enterExistingRoom: Scalars['String'];
  enterRoom: Scalars['String'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  matchPassword: Scalars['Boolean'];
  newRoom: Room;
  register: UserResponse;
};


export type MutationDeleteRoomArgs = {
  id: Scalars['Int'];
};


export type MutationEnterExistingRoomArgs = {
  name: Scalars['String'];
};


export type MutationEnterRoomArgs = {
  name: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
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

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  room?: Maybe<Room>;
  rooms: Array<Room>;
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
  password: Scalars['String'];
  token: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
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
}>;


export type EnterExistingRoomMutation = { __typename?: 'Mutation', enterExistingRoom: string };

export type EnterRoomMutationVariables = Exact<{
  name: Scalars['String'];
  password: Scalars['String'];
  token: Scalars['String'];
}>;


export type EnterRoomMutation = { __typename?: 'Mutation', enterRoom: string };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string, createdAt: string, updatedAt: string } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type MatchPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  password: Scalars['String'];
}>;


export type MatchPasswordMutation = { __typename?: 'Mutation', matchPassword: boolean };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string, createdAt: string, updatedAt: string } | null | undefined } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string } | null | undefined };

export type RoomQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type RoomQuery = { __typename?: 'Query', room?: { __typename?: 'Room', id: number, owner: number, name: string, createdAt: any } | null | undefined };


export const NewRoomDocument = gql`
    mutation NewRoom($input: roomVar!, $token: String!) {
  newRoom(input: $input, token: $token) {
    id
    owner
    name
    token
    createdAt
  }
}
    `;

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
    mutation EnterExistingRoom($name: String!) {
  enterExistingRoom(name: $name)
}
    `;

export function useEnterExistingRoomMutation() {
  return Urql.useMutation<EnterExistingRoomMutation, EnterExistingRoomMutationVariables>(EnterExistingRoomDocument);
};
export const EnterRoomDocument = gql`
    mutation EnterRoom($name: String!, $password: String!, $token: String!) {
  enterRoom(name: $name, password: $password, token: $token)
}
    `;

export function useEnterRoomMutation() {
  return Urql.useMutation<EnterRoomMutation, EnterRoomMutationVariables>(EnterRoomDocument);
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    errors {
      field
      message
    }
    user {
      id
      username
      createdAt
      updatedAt
    }
  }
}
    `;

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
    mutation MatchPassword($token: String!, $password: String!) {
  matchPassword(token: $token, password: $password)
}
    `;

export function useMatchPasswordMutation() {
  return Urql.useMutation<MatchPasswordMutation, MatchPasswordMutationVariables>(MatchPasswordDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!) {
  register(options: {username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      id
      username
      createdAt
      updatedAt
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
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
export const RoomDocument = gql`
    query Room($token: String!) {
  room(token: $token) {
    id
    owner
    name
    createdAt
  }
}
    `;

export function useRoomQuery(options: Omit<Urql.UseQueryArgs<RoomQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RoomQuery>({ query: RoomDocument, ...options });
};