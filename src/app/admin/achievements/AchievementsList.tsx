import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"

type UserAchievement = {
  date: Date;
  id: number;
  image: string | null;
  userId: string | null;
  description: string | null;
  achievement: string;
  tier: number | null;
  users: {
      name: string | null;
      image: string | null;
  } | null;
}[]

export default function AchievementsList({ achievements }: { achievements: UserAchievement }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">User Achievements</h2>
      {achievements ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{item.achievement}</span>
                  {item.tier && <Badge variant="secondary">Tier {item.tier}</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  <strong>User:</strong> {item.users?.name ?? 'Anonymous'}
                </p>
                <p className="text-sm text-muted-foreground">
                  <strong>Date:</strong> {item.date.toLocaleDateString()}
                </p>
                {item.description && (
                  <p className="text-sm">{item.description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No achievements found</p>
        </div>
      )}
    </div>
  );
}