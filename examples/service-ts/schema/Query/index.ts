import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    myType: MyType
  }
`;

const resolvers = {
  Query: {
    myType: () => ({ hello: '' }),
  },
};

export default { typeDefs, resolvers };
