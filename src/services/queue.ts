// eslint-disable-next-line @typescript-eslint/no-var-requires
import { Squiss, IMessageAttributes, IMessageToSend } from 'squiss-ts';
const SQS_DELAY = Number(process.env.SQS_DELAY) || 0;

const awsConfig = {
  accessKeyId: process.env.SQS_EXCHANGE_ACCESS_KEY_ID,
  secretAccessKey: process.env.SQS_EXCHANGE_SECRET_ACCESS_KEY_ID,
  region: process.env.SQS_REGION,
  endpoint: process.env.SQS_EXCHANGE_ENDPOINT,
};

const squiss = new Squiss({
  awsConfig,
  queueName: process.env.SQS_QUEUE_NAME,
  bodyFormat: `json`,
  maxInFlight: Number(process.env.SQS_MAX_IN_FLIGHT) || 15,
  queueUrl: process.env.SQS_EXCHANGE_QUEUE_URL,
});

export const sendMessage = async (msg: IMessageToSend, props?: IMessageAttributes): Promise<any> =>
  squiss.sendMessage(msg, SQS_DELAY, props);
export const queue = squiss;
