"use client"

import { useState } from "react"
import { Search, Grid, List } from "lucide-react"

import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { FriendCard } from "./friend-card"
type FriendList = 
  {
    id: string;
    name: string | null;
    image: string | null;
    numberOfConnects: number;
}[]

// Sample friend data
const friendsData = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=80&width=80",
    status: "online",
    followers: 120
  },
  {
    id: 2,
    name: "Sam Wilson",
    avatar: "/placeholder.svg?height=80&width=80",
    status: "offline",
    followers: 85
  },
  {
    id: 3,
    name: "Jamie Smith",
    avatar: "/placeholder.svg?height=80&width=80",
    status: "online",
    followers: 250
  },
  {
    id: 4,
    name: "Taylor Reed",
    avatar: "/placeholder.svg?height=80&width=80",
    status: "away",
    followers: 180
  },
  {
    id: 5,
    name: "Morgan Chen",
    avatar: "/placeholder.svg?height=80&width=80",
    status: "online",
    followers: 320
  },
  {
    id: 6,
    name: "Casey Lopez",
    avatar: "/placeholder.svg?height=80&width=80",
    status: "offline",
    followers: 95
  },
  {
    id: 7,
    name: "Jordan Kim",
    avatar: "/placeholder.svg?height=80&width=80",
    status: "online",
    followers: 430
  },
  {
    id: 8,
    name: "Riley Patel",
    avatar: "/placeholder.svg?height=80&width=80",
    status: "away",
    followers: 275
  },
]

export function FriendList({connects}: {connects: FriendList }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState("grid")

  // Filter friends based on search query and status filter
const filteredFriends = connects
  .filter((friend) => friend.name !== null) // Remove friends with no names
  .filter((friend) => {
    const matchesSearch = friend.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false
    return matchesSearch
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
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4" : "flex flex-col gap-4"}>
        {filteredFriends.length > 0 ? (
          filteredFriends.map((friend) => <FriendCard key={friend.id} friend={friend} viewMode={viewMode} />)
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

