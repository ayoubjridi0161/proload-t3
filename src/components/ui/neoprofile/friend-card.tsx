"use client"
import { MoreHorizontal, MessageSquare, UserMinus } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { Button } from "~/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { useState } from "react"
import { ConnectAction, unfollow } from "~/lib/actions/userInteractions"

interface Friend {
  id: string
  name: string | null
  image: string | null
  numberOfConnects: number
}

interface FriendCardProps {
  friend: Friend
  viewMode?: string
}

export function FriendCard({ friend, viewMode = "grid" }: FriendCardProps) {
  const [isLoading,setIsLoading] = useState(false)
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-yellow-500"
      case "offline":
        return "bg-gray-400"
      default:
        return "bg-gray-400"
    }
  }
  async function handleFollow(): Promise<void>{
    setIsLoading(true)
    const res = await unfollow(friend.id)
    setIsLoading(false)

  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card className={`overflow-hidden ${viewMode === "list" ? "flex flex-row items-center" : ""}`}>
      <CardHeader className={`${viewMode === "list" ? "w-48 min-w-48 p-2" : "p-0"}`}>
        <div className={`relative ${viewMode === "list" ? "h-full" : "h-24"} bg-gradient-to-r from-primary/20 to-primary/10`}>
          <div className={`${viewMode === "list" ? "relative p-2" : "absolute -bottom-10 left-4"}`}>
            <div className="relative">
              <Avatar className={`${viewMode === "list" ? "h-12 w-12" : "h-20 w-20"} border-4 border-background`}>
                <AvatarImage src={friend.image ?? ""} alt={friend.name ?? ""} />
                <AvatarFallback>{getInitials(friend.name ?? "")}</AvatarFallback>
              </Avatar>
              {/* <span
                className={`absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-background ${getStatusColor(friend.status)}`}
                aria-hidden="true"
              /> */}
            </div>
          </div>
          <div className="absolute right-4 top-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full bg-background/50 hover:bg-background/80">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuItem>Block User</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">Remove Friend</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className={`${viewMode === "list" ? "flex-1 p-4" : "pt-12 pb-4"}`}>
        <div className="space-y-1.5">
          <h3 className="font-semibold text-lg leading-none">{friend.name}</h3>
          {/* <p className="text-sm text-muted-foreground">
            {friend.status === "online" ? (
              <span className="text-green-600 dark:text-green-500">Online</span>
            ) : (
              <span>Offline</span>
            )}
          </p> */}
          <p className="text-sm text-muted-foreground">{friend.numberOfConnects} followers</p>
        </div>
      </CardContent>
      <CardFooter className={`${viewMode === "list" ? "pr-4" : "border-t pt-4"} flex justify-center`}>
        <Button disabled={isLoading} onClick={() => { void handleFollow(); }} variant="ghost" size="sm" className="text-destructive">
          <UserMinus className="mr-1 h-4 w-4" />
          unfollow
        </Button>
      </CardFooter>
    </Card>
  )
}

