// https://hassanfouad.medium.com/using-rabbitmq-with-nodejs-and-typescript-8b33d56a62cc

import {
  RABBIT_HOST,
  RABBIT_PASSWORD,
  RABBIT_PORT,
  RABBIT_USERNAME,
} from "@/common/config";
import { Q_NAME } from "@/common/enums";
import client, { Channel, Connection, ConsumeMessage } from "amqplib";

export class RabbitMqService {
  connection!: Connection;
  channel!: Channel;
  private connected!: boolean;

  async connect() {
    if (this.connected && this.channel) return;
    else this.connected = true;

    try {
      console.log(`⌛️ Connecting to Rabbit-MQ Server`);
      this.connection = await client.connect(
        `amqp://${RABBIT_USERNAME}:${RABBIT_PASSWORD}@${RABBIT_HOST}:${RABBIT_PORT}`
      );

      console.log(`✅ Rabbit MQ Connection is ready`);

      this.channel = await this.connection.createChannel();

      console.log(`🛸 Created RabbitMQ Channel successfully`);

      await this.startListeningToNewMessages();
    } catch (error) {
      console.error(error);
      console.error(`Not connected to MQ Server`);
    }
  }

  async startListeningToNewMessages() {
    await this.channel.assertQueue(Q_NAME.COMMUNICATIONS, {
      durable: false,
    });

    this.channel.consume(
      Q_NAME.COMMUNICATIONS,
      (msg) => {
        {
          if (!msg) {
            return console.error(`Invalid incoming message`);
          }

          this.handleIncomingNotification(msg);

          this.channel.ack(msg);
        }
      },
      {
        noAck: false,
      }
    );
  }
  handleIncomingNotification = (msg: ConsumeMessage) => {
    try {
      const parsedMessage = JSON.parse(msg?.content?.toString());

      console.log(parsedMessage);

      // Implement your own notification flow
    } catch (error) {
      console.error(`Error While Parsing the message`, error);
    }
  };

  async sendToQueue(queue: string, message: any): Promise<boolean> {
    try {
      if (!this.channel) {
        await this.connect();
      }

      const data = {
        pattern: { cmd: "create" },
        data: message,
      };

      return this.channel.sendToQueue(
        queue,
        Buffer.from(JSON.stringify(data)),
        {
          type: "application/json",
        }
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

////////////////////////

// import amqp from "amqplib/callback_api";

// import {
//   RABBIT_HOST,
//   RABBIT_PASSWORD,
//   RABBIT_PORT,
//   RABBIT_USERNAME,
// } from "../../common/config";
// import { Q_NAME } from "../../common/enums/queueName";
// import { SendMessage } from "../types";

// export class RabbitMqService {
//   rabbit: any;
//   constructor() {
//     this.rabbit = amqp;
//   }

//   send(queue: Q_NAME, payload: SendMessage) {
//     this.rabbit.connect(
//       `amqp://${RABBIT_USERNAME}:${RABBIT_PASSWORD}@${RABBIT_HOST}:${RABBIT_PORT}/`,
//       function (error: any, connection: any) {
//         if (error) {
//           throw error;
//         }

//         connection.createChannel(function (
//           error1: any,
//           channel: {
//             assertQueue: (arg0: string, arg1: { durable: boolean }) => void;
//             sendToQueue: (arg0: string, arg1: Buffer) => void;
//           }
//         ) {
//           if (error1) {
//             throw error1;
//           }

//           const data = {
//             pattern: { cmd: "create" },
//             data: payload,
//           };

//           channel.assertQueue(queue, {
//             durable: false,
//           });

//           channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
//         });
//       }
//     );
//   }

//   receive(queue: Q_NAME) {
//     this.rabbit.connect(
//       `amqp://${RABBIT_USERNAME}:${RABBIT_PASSWORD}@${RABBIT_HOST}:${RABBIT_PORT}/`,
//       function (error: any, connection: any) {
//         if (error) {
//           throw error;
//         }

//         connection.createChannel(function (
//           error1: any,
//           channel: {
//             assertQueue: (arg0: Q_NAME, arg1: { durable: boolean }) => void;
//             consume: (
//               arg0: Q_NAME,
//               arg1: (msg: any) => void,
//               arg2: { noAck: boolean }
//             ) => void;
//           }
//         ) {
//           if (error1) {
//             throw error1;
//           }

//           channel.assertQueue(queue, {
//             durable: false,
//           });

//           console.log(
//             " [*] Waiting for messages in %s. To exit press CTRL+C",
//             queue
//           );

//           channel.consume(
//             queue,
//             function (msg) {
//               console.log(" [x] Received %s", msg.content.toString());
//             },
//             {
//               noAck: true,
//             }
//           );
//         });
//       }
//     );
//   }
// }
