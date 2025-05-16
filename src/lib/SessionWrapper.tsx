"use client"
import {SessionProvider} from "next-auth/react"
import React from "react"

const SessionWrapper = ({children}:{children:React.ReactNode}) => {
    return (
        <SessionProvider 
            refetchInterval={3600} // Check session every 60 seconds instead of default 0
            refetchOnWindowFocus={false} // Disable refetch on window focus
        >
            {children}
        </SessionProvider>
    )
}

export default SessionWrapper