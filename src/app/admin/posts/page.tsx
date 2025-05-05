import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Badge } from "~/components/ui/badge"
import { MoreHorizontal, Plus, Search } from "lucide-react"

// Sample posts data
const posts = [
  {
    id: "1",
    title: "10 Tips for Better Workouts",
    author: "John Doe",
    category: "Fitness Tips",
    status: "published",
    views: 1245,
    publishedDate: "Jan 15, 2023",
  },
  {
    id: "2",
    title: "Nutrition Guide for Muscle Building",
    author: "Jane Smith",
    category: "Nutrition",
    status: "published",
    views: 982,
    publishedDate: "Feb 20, 2023",
  },
  {
    id: "3",
    title: "The Benefits of Morning Workouts",
    author: "Mike Johnson",
    category: "Lifestyle",
    status: "draft",
    views: 0,
    publishedDate: "-",
  },
  {
    id: "4",
    title: "How to Prevent Workout Injuries",
    author: "Sarah Williams",
    category: "Health",
    status: "published",
    views: 756,
    publishedDate: "Apr 10, 2023",
  },
  {
    id: "5",
    title: "Best Supplements for Recovery",
    author: "David Brown",
    category: "Supplements",
    status: "review",
    views: 0,
    publishedDate: "-",
  },
]

export default function PostsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
          <p className="text-muted-foreground">Manage your platform content</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>All Posts</CardTitle>
            <CardDescription>A list of all blog posts on your platform.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search posts..." className="pl-8 w-[250px]" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Published</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{post.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        post.status === "published" ? "outline" : post.status === "draft" ? "secondary" : "default"
                      }
                    >
                      {post.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{post.views}</TableCell>
                  <TableCell>{post.publishedDate}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        {post.status !== "published" && <DropdownMenuItem>Publish</DropdownMenuItem>}
                        {post.status === "published" && <DropdownMenuItem>Unpublish</DropdownMenuItem>}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
