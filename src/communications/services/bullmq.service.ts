import { Queue } from "bullmq";

export class BullMqService {
  constructor() {}

  async send() {
    const myQueue = new Queue("foo");

    async function addJobs() {
      await myQueue.add("myJobName", { foo: "bar" });
      await myQueue.add("myJobName", { qux: "baz" });
    }

    await addJobs();
  }
}
