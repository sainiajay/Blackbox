import ampq from 'amqplib';

const initChannelHelper = async (connectionString) => {
    const connection = await ampq.connect(connectionString);
    const channel = await connection.createChannel();
    await Promise.all([
      channel.assertQueue('exec_q', {durable: false}),
      channel.assertQueue('test_q', {durable: false}),
      channel.assertQueue('output_q', {durable: false})
    ]);
    return channel;
};

export const createChannel = initChannelHelper;