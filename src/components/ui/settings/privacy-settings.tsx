import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Label } from "~/components/ui/label"
import { Switch } from "~/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"

export function PrivacySettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy Settings</CardTitle>
        <CardDescription>Manage your privacy preferences and data settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="profile-visibility">Profile Visibility</Label>
            <Switch id="profile-visibility" defaultChecked />
          </div>
          <p className="text-sm text-muted-foreground">Make your profile visible to other users.</p>
        </div>

        <div className="space-y-2">
          <Label>Who can see your activity</Label>
          <RadioGroup defaultValue="everyone">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="everyone" id="everyone" />
              <Label htmlFor="everyone">Everyone</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="followers" id="followers" />
              <Label htmlFor="followers">Followers only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nobody" id="nobody" />
              <Label htmlFor="nobody">Nobody</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="data-collection">Data Collection</Label>
            <Switch id="data-collection" defaultChecked />
          </div>
          <p className="text-sm text-muted-foreground">Allow us to collect usage data to improve your experience.</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="third-party">Third-party Sharing</Label>
            <Switch id="third-party" />
          </div>
          <p className="text-sm text-muted-foreground">Allow sharing your data with trusted third parties.</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="ml-auto">Save Changes</Button>
      </CardFooter>
    </Card>
  )
}

