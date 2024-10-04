import { BullMqService } from "@/communications/services/bullmq.service";
import { Response, Request } from "express";
import { SendMessage } from "../types";

export class BullMqController {
  bullMqService: BullMqService;

  constructor(bullmq: BullMqService = new BullMqService()) {
    this.bullMqService = bullmq;
  }

  public send = (req: Request<never, never, SendMessage>, res: Response) => {
    this.bullMqService.send();

    res.status(201).json({
      status: "OK",
    });
  };
}
