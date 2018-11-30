import { gql } from 'apollo-server';

import Mutation from './Mutation';
import Query from './Query';
import MyType from './types/MyType';

const types = [Mutation, Query, MyType];

export const typeDefs = [
  gql`
    type Schema {
      mutation: Mutation
      query: Query
    }
  `,
].concat(types.map(t => t.typeDefs));

export const resolvers = types.reduce(
  (acc, t) => ({ ...acc, ...t.resolvers }),
  {}
);
