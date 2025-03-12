import { Button } from "~/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { MessageSquare } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"

export function MessagesNotif() {
  // Sample messages data
  const messages = [
    {
      id: 1,
      user: {
        name: "Alice Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "AJ",
      },
      preview: "Hey, did you see the latest project update?",
      time: "5 minutes ago",
      unread: true,
    },
    {
      id: 2,
      user: {
        name: "Bob Smith",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "BS",
      },
      preview: "Can we schedule a meeting for tomorrow?",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      user: {
        name: "Carol White",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "CW",
      },
      preview: "Thanks for your help earlier!",
      time: "2 hours ago",
      unread: false,
    },
  ]

  const unreadCount = messages.filter((m) => m.unread).length

  return (
    <Popover>
      <PopoverTrigger asChild>
      <Button variant={"ghost"} style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)' }} size="icon" className="relative h-10 w-10  rounded-none border-black border-1 p-2">
        <MessageSquare className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute bottom-0 left-0 flex h-5 w-5 -translate-x-1/4 translate-y-1/4">
              <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {unreadCount}
              </span>
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="border-b px-4 py-3">
          <h4 className="font-medium">Messages</h4>
          {unreadCount > 0 ? (
            <p className="text-xs text-muted-foreground">
              You have {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">No new messages</p>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {messages.length > 0 ? (
            messages.map((message) => (
              <div
                key={message.id}
                className={`border-b px-4 py-3 last:border-0 ${message.unread ? "bg-muted/50" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.user.avatar} alt={message.user.name} />
                    <AvatarFallback>{message.user.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{message.user.name}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">{message.preview}</p>
                    <p className="text-xs text-muted-foreground">{message.time}</p>
                  </div>
                  {message.unread && <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />}
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-6 text-center">
              <p className="text-sm text-muted-foreground">No messages</p>
            </div>
          )}
        </div>
        <div className="border-t px-4 py-2">
          <Button variant="ghost" size="sm" className="w-full justify-center text-xs">
            View all messages
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

