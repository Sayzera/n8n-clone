"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";

import { Logout } from "./logout";

const Page = () => {
  
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());

  const create = useMutation(
    trpc.createWorkFlow.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());

        toast.success("Job queued");
      },
      onError: () => {},
    }),
  );



  const testAi = useMutation(
    trpc.testAi.mutationOptions({
      onSuccess: (data) => {

      },
      onError: () => {

      }
    })
  )

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col gap-y-6">
      protected server componet
      {JSON.stringify(data, null, 2)}
      <Button
      disabled={testAi.isPending}
        onClick={() => {
          create.mutate();
        }}
      >
        Create Workflow
      </Button>

      <Button
       onClick={() => {
        testAi.mutate()
       }}
      >
        Work Gemini   

      </Button>

      <Logout />

    </div>
  );
};

export default Page;
