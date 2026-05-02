import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { requireAuth } from "@/lib/auth-utils";
import { getQueryClient, trpc } from "@/trpc/server";

import { Client } from "./client";


const Page = async () => {
  await requireAuth()
  const queryClient = getQueryClient();

  // Sorguyu çalıştır react query cachine koy
  void queryClient.prefetchQuery(trpc.getUsers.queryOptions())


  // HydrationBoundary yukarıda sonucu alır react query önbelleğine yazar 



  return (
    <div className="text-red-500">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Yükleniyor</p>}>
        <Client />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default Page;
