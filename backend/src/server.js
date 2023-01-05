import * as fs from 'fs';
import { createServer } from 'node:http';
import { WebSocketServer } from 'ws';
import { createPubSub, createSchema, createYoga } from 'graphql-yoga';
import { useServer } from 'graphql-ws/lib/use/ws';
import RoomModel from './models/room';
import AccountModel from './models/account';
import CharacterModel from './models/character';
import CardModel from './models/card';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import Subscription from './resolvers/Subscription';
import express from 'express';
import path from 'path';
import cors from 'cors';
// import ChatBox from "./resolvers/ChatBox";
const pubsub = createPubSub();
const yoga = createYoga({
  schema: createSchema({
    typeDefs: fs.readFileSync('./src/schema.graphql', 'utf-8'),
    resolvers: {
      Query,
      Mutation,
      Subscription,
    },
  }),
  context: {
    RoomModel,
    CardModel,
    CharacterModel,
    AccountModel,
    pubsub,
  },
  graphiql: {
    subscriptionsProtocol: 'WS',
  },
});
const server = express();
server.use(cors());
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  console.log(express.static(path.join(__dirname, '../frontend', 'build')));
  server.use(express.static(path.join(__dirname, '../frontend', 'build')));
  server.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'));
  });
}
server.use('/', yoga);
const httpServer = createServer(server);
const wsServer = new WebSocketServer({
  server: httpServer,
  path: yoga.graphqlEndpoint,
});

useServer(
  {
    execute: (args) => args.rootValue.execute(args),
    subscribe: (args) => args.rootValue.subscribe(args),
    onSubscribe: async (ctx, msg) => {
      const { schema, execute, subscribe, contextFactory, parse, validate } =
        yoga.getEnveloped({
          ...ctx,
          req: ctx.extra.request,
          socket: ctx.extra.socket,
          params: msg.payload,
        });
      const args = {
        schema,
        operationName: msg.payload.operationName,
        document: parse(msg.payload.query),
        variableValues: msg.payload.variables,
        contextValue: await contextFactory(),
        rootValue: {
          execute,
          subscribe,
        },
      };
      const errors = validate(args.schema, args.document);
      if (errors.length) return errors;
      return args;
    },
  },
  wsServer
);

export default httpServer;
