"use client"

import { useState } from "react"
import { Search } from "lucide-react"

import { Input } from "~/components/ui/input"
import { FriendCard } from "./friend-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"

// Sample friend data
const friendsData = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=80&width=80",
    status: "online",
    mutualFriends: 12,
    lastActive: "Just now",
    tags: ["Gaming", "Music"],
  },
  {
    id: 2,
    name: "Sam Wilson",
    avatar: "/placeholder.svg?height=80&width=80",
    status: "offline",
    mutualFriends: 8,
    lastActive: "2 hours ago",
    tags: ["Art", "Travel"],
  },
  {
    id: 3,
    name: "Jamie Smith",
    avatar: "/placeholder.svg?height=80&width=80",
    status: "online",
    mutualFriends: 5,
    lastActive: "Just now",
    tags: ["Sports", "Movies"],
  },
  {
    id: 4,
    name: "Taylor Reed",
    avatar: "/placeholder.svg?height=80&width=80",
    status: "away",
    mutualFriends: 15,
    lastActive: "30 minutes ago",
    tags: ["Books", "Photography"],
  },
  {
    id: 5,
    name: "Morgan Chen",
    avatar: "/placeholder.svg?height=80&width=80",
    status: "online",
    mutualFriends: 3,
    lastActive: "Just now",
    tags: ["Cooking", "Hiking"],
  },
  {
    id: 6,
    name: "Casey Lopez",
    avatar: "/placeholder.svg?height=80&width=80",
    status: "offline",
    mutualFriends: 7,
    lastActive: "1 day ago",
    tags: ["Technology", "Science"],
  },
  {
    id: 7,
    name: "Jordan Kim",
    avatar: "/placeholder.svg?height=80&width=80",
    status: "online",
    mutualFriends: 9,
    lastActive: "Just now",
    tags: ["Fashion", "Design"],
  },
  {
    id: 8,
    name: "Riley Patel",
    avatar: "/placeholder.svg?height=80&width=80",
    status: "away",
    mutualFriends: 4,
    lastActive: "45 minutes ago",
    tags: ["Music", "Art"],
  },
]

export function FriendList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter friends based on search query and status filter
  const filteredFriends = friendsData.filter((friend) => {
    const matchesSearch = friend.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || friend.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search friends..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend) => <FriendCard key={friend.id} friend={friend} />)
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No friends found matching your criteria</p>
          </div>
        )}
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filteredFriends.length} of {friendsData.length} friends
      </div>
    </div>
  )
}

