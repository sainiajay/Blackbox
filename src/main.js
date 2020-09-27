import { ApolloServer } from 'apollo-server';
import { getChannel } from './channel';
import * as subscriptionHandler from './subscriptions/handler';
import { typeDefs as subscriptionTypeDefs, buildResolver as subscriptionResolvers } from './subscriptions';
import { typeDefs as gloabalTypeDefs, resolvers as globalResolver } from './global';
import { typeDefs as jobTypeDefs, resolvers as jobResolver} from './jobs';

const initServer = (channel) => new ApolloServer({
  context: () => ({ channel }),
  subscriptions: subscriptionHandler,
  typeDefs: [gloabalTypeDefs, jobTypeDefs, subscriptionTypeDefs],
  resolvers: [globalResolver, jobResolver, subscriptionResolvers(channel)],
  introspection: true,
  playground: true,
});


const serverPromise = getChannel('amqp://localhost:5672').then(channel => initServer(channel))

if(process.env.NODE_ENV !== 'test') {
    serverPromise
    .then(server => server.listen({ port: process.env.PORT || 4000 }))
    .then(({ url }) => console.log(`🚀 Server ready at ${url}`));
}

export {
  serverPromise,
};

