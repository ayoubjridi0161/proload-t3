import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Separator } from "~/components/ui/separator"

export function AccountSettings() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Account Details</CardTitle>
        <CardDescription>Manage your account information and security settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile picture" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              Upload new picture
            </Button>
            <Button variant="ghost" size="sm" className="w-full sm:w-auto">
              Remove picture
            </Button>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" defaultValue="john.doe@example.com" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="current-password">Current Password</Label>
          <Input id="current-password" type="password" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="new-password">New Password</Label>
          <Input id="new-password" type="password" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm New Password</Label>
          <Input id="confirm-password" type="password" />
        </div>

        <Separator />

        <div className="pt-2">
          <Button variant="destructive" size="sm">
            Delete Account
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto">Save Changes</Button>
      </CardFooter>
    </Card>
  )
}

