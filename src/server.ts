import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import expressPlayGround from 'graphql-playground-middleware-express';
import schema from './schema/'

const app = express();

app.use((req, res, next) => { next(); }, cors({ maxAge: 84600 }));

app.use(compression());

const server = new ApolloServer(
  {
    schema,
    introspection: true
  }
);

server.applyMiddleware({ app });

app.get('/', expressPlayGround({
  endpoint: '/graphql'
}));

const httpServer = createServer(app);

const PORT = 4000;

httpServer.listen(
  {
    port: PORT,
  },
  () => console.log(`Online Academy ready on http://localhost:${4000}/graphql`)
);
