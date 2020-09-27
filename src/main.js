import { ApolloServer } from 'apollo-server';
import { createChannel } from './channel';
import { Container } from 'typedi';
import * as subscriptionHandler from './subscriptions/handler';
import { typeDefs as subscriptionTypeDefs, resolvers as subscriptionResolvers } from './subscriptions';
import { typeDefs as gloabalTypeDefs, resolvers as globalResolver } from './global';
import { typeDefs as jobTypeDefs, resolvers as jobResolver} from './jobs';

Container.set('queue', 'Initializing...');
const channelPromise = createChannel('amqp://localhost:5672')
  .then(channel => (Container.set('queue', channel), channel));

const server = new ApolloServer({
  subscriptions: subscriptionHandler,
  typeDefs: [gloabalTypeDefs, jobTypeDefs, subscriptionTypeDefs],
  resolvers: [globalResolver, jobResolver, subscriptionResolvers],
  introspection: true,
  playground: true,
});

if(process.env.NODE_ENV !== 'test') {
    server.listen({ port: process.env.PORT || 4000 })
    .then(({ url }) => console.log(`🚀 Server ready at ${url}`));
}

export {
  server,
  channelPromise,
};
