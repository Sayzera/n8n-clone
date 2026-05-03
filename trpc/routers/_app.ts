

import { inngest } from "@/app/inngest/client";
import prisma from "@/lib/db";

import { createTRPCRouter, protectedProcedure } from "../init";
export const appRouter = createTRPCRouter({
  testAi: protectedProcedure.mutation(async () => {
    await inngest.send({
      name : 'execute/ai',
    })

    return {
      success: true,
      message: 'Job queued'
    }
    
  }),
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),
  createWorkFlow: protectedProcedure.mutation(async () => {
    return await inngest.send({
      name: "app/task.created",
      data: {
        email: "white.code.test@gmail.com",
      },
    });
  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
