import { gql } from 'apollo-server';

const typeDefs = gql`
  type Mutation {
    _emtpy: String
  }
`;

const resolvers = {
  Mutation: {
    _emtpy: () => '',
  },
};

export default { typeDefs, resolvers };
