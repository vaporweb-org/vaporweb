import { gql } from 'apollo-server';

const typeDefs = gql`
  type MyType {
    hello: String
  }
`;

const resolvers = {
  MyType: {
    hello: () => 'world',
  },
};

export default { typeDefs, resolvers };
