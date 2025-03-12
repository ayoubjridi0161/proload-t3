import { Button } from "~/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { Bell } from "lucide-react"

export function Notifs() {
  // Sample notifications data
  const notifications = [
    {
      id: 1,
      title: "New message received",
      description: "You have a new message from Sarah",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "Project update",
      description: "Changes were made to your project",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "Reminder",
      description: "Meeting with the team at 3 PM",
      time: "2 hours ago",
      read: true,
    },
  ]

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} style={{ boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)' }} size="icon" className="relative h-10 w-10  rounded-none border-black border-1 p-2">
          <Bell className="h-5 w-5" />
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
          <h4 className="font-medium">Notifications</h4>
          {unreadCount > 0 ? (
            <p className="text-xs text-muted-foreground">
              You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">No new notifications</p>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`border-b px-4 py-3 last:border-0 ${!notification.read ? "bg-muted/50" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{notification.title}</p>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                  {!notification.read && <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />}
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-6 text-center">
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          )}
        </div>
        <div className="border-t px-4 py-2">
          <Button variant="ghost" size="sm" className="w-full justify-center text-xs">
            Mark all as read
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

