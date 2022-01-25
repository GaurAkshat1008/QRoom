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
};

export type Auths = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Car = {
  __typename?: 'Car';
  carModel: Scalars['String'];
  carType: Scalars['String'];
  desc: Scalars['String'];
  id: Scalars['Int'];
  km: Scalars['String'];
  modelY: Scalars['String'];
  owner: Scalars['String'];
};

export type CarOptions = {
  carModel: Scalars['String'];
  carType: Scalars['String'];
  desc: Scalars['String'];
  km: Scalars['String'];
  modelY: Scalars['String'];
  owner: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createQuery: Car;
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  searchByType?: Maybe<Array<Car>>;
  userById?: Maybe<User>;
};


export type MutationCreateQueryArgs = {
  options: CarOptions;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: Auths;
};


export type MutationSearchByTypeArgs = {
  type: Scalars['String'];
};


export type MutationUserByIdArgs = {
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  cars: Array<Car>;
  hello: Scalars['String'];
  me?: Maybe<User>;
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

export type CreateQueryMutationVariables = Exact<{
  owner: Scalars['String'];
  modelY: Scalars['String'];
  carType: Scalars['String'];
  carModel: Scalars['String'];
  km: Scalars['String'];
  desc: Scalars['String'];
}>;


export type CreateQueryMutation = { __typename?: 'Mutation', createQuery: { __typename?: 'Car', id: number, owner: string, modelY: string, carType: string, carModel: string, km: string, desc: string } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', username: string } | null | undefined } };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string } | null | undefined } };

export type CarsQueryVariables = Exact<{ [key: string]: never; }>;


export type CarsQuery = { __typename?: 'Query', cars: Array<{ __typename?: 'Car', id: number, owner: string, modelY: string, carType: string, carModel: string, km: string, desc: string }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string, createdAt: string, updatedAt: string } | null | undefined };


export const CreateQueryDocument = gql`
    mutation CreateQuery($owner: String!, $modelY: String!, $carType: String!, $carModel: String!, $km: String!, $desc: String!) {
  createQuery(
    options: {owner: $owner, modelY: $modelY, carType: $carType, carModel: $carModel, km: $km, desc: $desc}
  ) {
    id
    owner
    modelY
    carType
    carModel
    km
    desc
  }
}
    `;

export function useCreateQueryMutation() {
  return Urql.useMutation<CreateQueryMutation, CreateQueryMutationVariables>(CreateQueryDocument);
};
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    errors {
      field
      message
    }
    user {
      username
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
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
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const CarsDocument = gql`
    query Cars {
  cars {
    id
    owner
    modelY
    carType
    carModel
    km
    desc
  }
}
    `;

export function useCarsQuery(options: Omit<Urql.UseQueryArgs<CarsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CarsQuery>({ query: CarsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    createdAt
    updatedAt
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};