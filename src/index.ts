import express from "express";
import bodyParser from "body-parser";
import { routerConfig } from "@/common/router/main.router";
import { PORT } from "./common/config";
// import { Q_NAME } from "./common/enums";
// import { RabbitMqService } from "./communications/services/rabbitmq.service";
const app = express();


app.use(bodyParser.json({ limit: "50mb" }));

routerConfig(app);

// const receiver = new RabbitMqService();
// receiver.receive(Q_NAME.COMMUNICATIONS);


app.listen(PORT, () => {
  console.log(`Express JS started on port`, PORT);
});
