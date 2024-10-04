import { RabbitMqService } from "@/communications/services/rabbitmq.service";
// import { Q_NAME } from "@/common/enums";
import e, { Response, Request } from "express";
import { SendMessage } from "../types";
import { Q_NAME } from "@/common/enums";

export class RabbitMqController {
  rabbitService: RabbitMqService;

  constructor(rabbitService: RabbitMqService = new RabbitMqService()) {
    this.rabbitService = rabbitService;
    this.rabbitService.connect();    
  }

  public send = async (
    req: Request<never, never, SendMessage>,
    res: Response
  ) => {
    try {
      const result = await this.rabbitService.sendToQueue(
        Q_NAME.COMMUNICATIONS,
        req.body
      );

      res.status(result ? 201 : 400).json({
        status: "OK",
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  };

  handleIncomingNotification = (msg: string) => {
    try {
      const parsedMessage = JSON.parse(msg);

      console.log(`Received Notification`, parsedMessage);

      // Implement your own notification flow
    } catch (error) {
      console.error(`Error While Parsing the message`, error);
    }
  };
}
