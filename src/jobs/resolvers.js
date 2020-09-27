
const execResolver = (parent, args, context, info) => context.channel.sendToQueue('exec_q', Buffer.from(JSON.stringify(args.input))) || "OK"
const testResolver = (parent, args, context, info) => context.channel.sendToQueue('test_q', Buffer.from(JSON.stringify(args.input))) || "OK"

const resolvers = {
    Mutation: {
        exec: execResolver,
        test: testResolver,
    }
};

export default resolvers;