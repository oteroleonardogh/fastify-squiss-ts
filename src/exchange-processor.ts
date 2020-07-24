import { Message } from 'squiss-ts';
import { config } from 'dotenv';
config();
import { queue } from './services/queue';
import { sendMail } from './services/mail';
import { getExchange } from './services/exchange';
try {
  queue.on(`message`, (message: Message) => {
    if (!message?.body?.from || !message?.body?.to || !message?.body?.amount || !message?.body?.email) {
      console.warn(`Wrong message received: ${JSON.stringify(message)}`);
    }
    console.debug(`message.body: ${JSON.stringify(message.body)}`);
    const { to: base, from: to, amount } = message.body;

    getExchange(base, to).then((rate) => {
      if (!rate) {
        // Message should be deleted anyway
        message.del();
        return;
      }
      const exchange = Number(amount) / rate;
      sendMail(
        message.body.email,
        `Exchange from: ${base} ${amount} to ${to} is ${to} ${exchange.toFixed(
          4
        )} \n - rate:(1 ${base} = ${rate.toFixed(4)} ${to})`
      );

      message.del();
    });
  });

  queue
    .start()
    .then(() => {
      console.log(`polling started`);
    })
    .catch((e) => {
      console.error(`Error while starting queue cause: `, e);
    });
} catch (e) {
  console.error(`Error in exchange processor cause: `, e);
}
