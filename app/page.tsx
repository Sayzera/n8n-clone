import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Client } from "./client";
import { getQueryClient, trpc } from "@/trpc/server";
import { Suspense } from "react";

const Page = () => {
  const queryClient = getQueryClient();

  // Sorguyu çalıştır react query cachine koy
  void queryClient.prefetchQuery(trpc.getUsers.queryOptions())


  // HydrationBoundary yukarıda sonucu alır react query önbelleğine yazar 



  return (
    <div className="text-red-500">
      Hello world
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<p>Yükleniyor</p>}>
        <Client />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default Page;
