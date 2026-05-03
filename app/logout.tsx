'use client'
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { auth } from "@/lib/auth"
import { authClient } from "@/lib/auth-client"



export const Logout = () => {
    const router = useRouter()
    return (
        <Button
         onClick={async () => {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push('/login')

                    }
                }
            })
         }}
        >
            Logout
        </Button>
    )
}

