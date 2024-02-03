import { DiscordNotificationWebhookJob } from "@hugin-jobs/DiscordNotificationWebhookJob";
import BeeQueue, { DoneCallback, Job } from "bee-queue";

const { REDIS_HOST, REDIS_PORT } = process.env;

export const notificationsQueue = new BeeQueue("discord-notifications", {
  redis: {
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
  },
  removeOnSuccess: true,
  isWorker: true,
  activateDelayedJobs: true,
});

notificationsQueue.process((job: Job<any>, done: DoneCallback<any>) => {
  new DiscordNotificationWebhookJob().handle(job.data);
  done(null, true);
});
