import { Router } from "express";
import { RabbitMqController } from "@/communications/controllers/rabbitmq.controller";

const router = Router();

const { send } = new RabbitMqController();

router.post("/send", send);

export default router;
