'use client';

import {  useSuspenseQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";

export const Client = () => {
    const trpc = useTRPC();
    const { data } = authClient.useSession();

    // useSuspenseQuery verinin henüz hazır değilse 
    // reactta bilgi verdiği bir hooktur örneğin henüz yuklendi gibi

    // hydrate edilmiş cache veri varsa 
    const { data: users} = useSuspenseQuery(
        trpc.getUsers.queryOptions()
    )

    return (
        <div>
            {JSON.stringify(users)}

        {
            data && (
            <Button onClick={() => authClient.signOut()}>Logout</Button>

            )
        }
        </div>
    )

}