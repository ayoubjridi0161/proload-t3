import { MoreHorizontal, MessageSquare, UserMinus } from "lucide-react"

import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { Button } from "~/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Badge } from "~/components/ui/badge"

interface Friend {
  id: number
  name: string
  avatar: string
  status: string
  mutualFriends: number
  lastActive: string
  tags: string[]
}

interface FriendCardProps {
  friend: Friend
}

export function FriendCard({ friend }: FriendCardProps) {
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-24 bg-gradient-to-r from-primary/20 to-primary/10">
          <div className="absolute -bottom-10 left-4">
            <div className="relative">
              <Avatar className="h-20 w-20 border-4 border-background">
                <AvatarImage src={friend.avatar} alt={friend.name} />
                <AvatarFallback>{getInitials(friend.name)}</AvatarFallback>
              </Avatar>
              <span
                className={`absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-background ${getStatusColor(friend.status)}`}
                aria-hidden="true"
              />
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
      <CardContent className="pt-12 pb-4">
        <div className="space-y-1.5">
          <h3 className="font-semibold text-lg leading-none">{friend.name}</h3>
          <p className="text-sm text-muted-foreground">
            {friend.status === "online" ? (
              <span className="text-green-600 dark:text-green-500">Online</span>
            ) : (
              <span>{friend.lastActive}</span>
            )}
          </p>
          <p className="text-sm text-muted-foreground">{friend.mutualFriends} mutual friends</p>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <Button variant="outline" size="sm">
          <MessageSquare className="mr-1 h-4 w-4" />
          Message
        </Button>
        <Button variant="ghost" size="sm" className="text-destructive">
          <UserMinus className="mr-1 h-4 w-4" />
          Unfriend
        </Button>
      </CardFooter>
    </Card>
  )
}

