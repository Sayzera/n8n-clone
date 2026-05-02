import prisma from "@/lib/db";

import { inngest } from "./client";

export const processTask = inngest.createFunction(
  {
    id: "process-task",
    triggers: { event: "app/task.created" },
  },
  async ({ event, step }) => {

    // Fetching the video
    await step.sleep("wait-a-moment","5s")
    // Transcribing
    await step.sleep("wait-a-moment","5s")
    // Sending transcription to AI
    await step.sleep("wait-a-moment", "5s")

    await step.run("create-workflow", () => {
      return prisma.workflow.create({
        data: {
          name: 'test-workflow'
        }
      })
    })


    return {
      success: true, message: 'Job queued'
    }

    // console.log("test");
    // const result = await step.run("handle-task", async () => {
    //   console.log("Hello world");
    //   return { processed: true, id: event.data.id };
    // });

    // await step.sleep("pause", "1s");
    // console.log("Hello worl2");

    // return { message: `Task ${event.data.id} complete`, result };
  },
);
