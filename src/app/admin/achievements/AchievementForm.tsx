// import { addAchievementAction } from "~/lib/actions/userLogsActions";
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card"
import { Label } from "~/components/ui/label"

type Achievement = {
  value: number;
  type: "totalWeight" | "MaxWeight" | "sessions" | "progression";
}

export default function AchievementForm() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Add New Achievement</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={()=>{
          "use server "
          console.log("form submitted")
        }} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="userID">User ID</Label>
            <Input id="userID" name="userID" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Achievement Type</Label>
            <Select name="type" required>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="totalWeight">Total Weight</SelectItem>
                <SelectItem value="MaxWeight">Max Weight</SelectItem>
                <SelectItem value="sessions">Sessions</SelectItem>
                <SelectItem value="progression">Progression</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="value">Value</Label>
            <Input id="value" name="value" type="number" required />
          </div>
          <Button type="submit">Add Achievement</Button>
        </form>
      </CardContent>
    </Card>
  );
}