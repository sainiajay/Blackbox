import asyncify from 'callback-to-async-iterator';
import { Container } from 'typedi';

const buildResolver = (channel) => {
    const jobResultListener = (callback) => 
        channel.consume('output_q', (message) => { 
            if(!message) {
                return;
            }

            callback('Got Some message!');
            channel.ack(message);
        });
        
    const resolvers = {
        Subscription: {
            outputAdded: {
                resolve: (payload, args, context, info) => console.log('payload', payload) || payload,
                subscribe: (_, args) => asyncify(jobResultListener),
            },
            testResultAdded: {
                resolve: (payload, args, context, info) => console.log('payload', payload) || payload,
                subscribe: (_, args) => asyncify(jobResultListener),
            }
        }
    };
    return resolvers;
};

const resolver = () => buildResolver(Container.get('queue'));
export default resolver;