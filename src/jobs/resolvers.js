import { Container } from 'typedi';

const resolvers = () => {
    const queue = Container.get('queue');
    const execResolver = (parent, args, context, info) => queue.sendToQueue('exec_q', Buffer.from(JSON.stringify(args.input))) || "OK";
    const testResolver = (parent, args, context, info) => queue.sendToQueue('test_q', Buffer.from(JSON.stringify(args.input))) || "OK";

    return {
        Mutation: {
            exec: execResolver,
            test: testResolver,
        }
    };
};

export default resolvers;