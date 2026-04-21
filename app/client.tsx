'use client';

import { useTRPC } from "@/trpc/client";
import {  useSuspenseQuery } from "@tanstack/react-query";

export const Client = () => {
    const trpc = useTRPC();

    // useSuspenseQuery verinin henüz hazır değilse 
    // reactta bilgi verdiği bir hooktur örneğin henüz yuklendi gibi

    // hydrate edilmiş cache veri varsa 
    const { data: users} = useSuspenseQuery(
        trpc.getUsers.queryOptions()
    )

    return (
        <div>
            {JSON.stringify(users)}
        </div>
    )

}