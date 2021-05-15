import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';
import 'graphql-import-node';
import * as typeDefs from './schema.graphql';
import resolvers from '../resolvers/resolvers.Map';

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;