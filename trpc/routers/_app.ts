
import { inngest } from "@/app/inngest/client";
import prisma from "@/lib/db";

import { createTRPCRouter, protectedProcedure } from "../init";
export const appRouter = createTRPCRouter({
  getWorkflows: protectedProcedure.query(({ ctx }) => {
    return prisma.workflow.findMany();
  }),
  createWorkFlow: protectedProcedure.mutation(async () => {

   return await inngest.send({
      name: 'app/task.created',
      data: {
        email: 'white.code.test@gmail.com'
      }
    })

  }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
