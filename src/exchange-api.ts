import { FastifyInstance, fastify } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';
import { IMessageAttributes, IMessageToSend } from 'squiss-ts';
import { config } from 'dotenv';
config();
import { sendMessage } from './services/queue';

const PORT = Number(process.env.PORT) || 3000;
const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify();

server.get(
  `/exchange/:from/:to/:amount`,
  async (req: any, reply: any): Promise<any> => {
    try {
      const { from, to, amount } = req.params;
      // TODO Fix this once we add authentication
      const email = req.user?.email ? req.user?.email : process.env.SUPORT_EMAIL;
      const msg: IMessageToSend = { email, from, to, amount };
      const props: IMessageAttributes = {};
      sendMessage(msg, props);
      return { msg: `You will receive an email with requested exchange from: ${from} ${amount} to ${to} pretty soon` };
    } catch (e) {
      console.error(`Error calling sending exchange msg, cause:`, e);
      reply.code(404).type(`application/json`).send({});
    }
  }
);

server.listen(PORT, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

process.on(`uncaughtException`, (error) => {
  console.error(error);
});
process.on(`unhandledRejection`, (error) => {
  console.error(error);
});
