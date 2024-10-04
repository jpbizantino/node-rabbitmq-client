import bullMqRouter from "@/communications/routes/bullmq.routes";
import rabbitMqRouter from "@/communications/routes/rabbitmq.routes";
import { Express } from 'express';

export const routerConfig = (app: Express) => {
  app.use("/rabbit", rabbitMqRouter);
  app.use("/bull", bullMqRouter);

  
};


