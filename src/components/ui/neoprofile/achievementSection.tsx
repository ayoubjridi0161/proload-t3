"use server"

import { getAchievements } from "~/lib/data"
import { getAchievementNameAndTier } from "~/lib/translateAchievement"
import { Card } from "../card"
import { Medal } from "lucide-react"
import Image from "next/image"

type Props = {
    userID: string
}
const tierColors = [
    "#fff",
    "#CD7F32",  // Tier 1 - Cool Gray (Weight Warrior)
    "#4FD1C5",  // Tier 2 - Teal (Iron Challenger)
    "#FFD700",  // Tier 3 - Orange (Steel Dominator)
    "#e5e4e2",  // Tier 4 - Pink (Barbell Conqueror)
    "#2B303E",  // Tier 5 - Purple (Limit Breaker)
    "#F56565"   // Tier 6 - Fiery Red (Mythic Beast)
]
function getCategoryImage(cat: string | undefined): string {
    switch (cat) {
        case "totalWeight":
            return "/total weight.png"
        case "workoutCount":
            return "/total sessions.png"
        case "maxWeight":
            return "/max weight.png"
        default:
            return "/defaultAch.jpg"
    }
}

export default async function AchievementsSection({ userID }: Props) {
    const achievements = await getAchievements(userID)
    const parsedAchievements = achievements?.map((achievement) => {
        const ach = getAchievementNameAndTier(achievement.achievement, achievement.tier ?? 1)
        return {
            ...ach,
            description: achievement.description,
        }
    })

    // Group achievements by tier
    const groupedAchievements: Record<number, typeof parsedAchievements> = {}
    if (parsedAchievements) {
        for (const ach of parsedAchievements) {
            const tier = ach.tier ?? 1;
            if (!groupedAchievements[tier]) {
                groupedAchievements[tier] = [];
            }
            groupedAchievements[tier]?.push(ach);
        }
    }

    // Sort tiers in descending order (e.g., 5, 4, 3, 2, 1)
    const sortedTiers = Object.keys(groupedAchievements)
        .map(Number)
        .sort((a, b) => b - a);

    return (
        <div className="space-y-4 w-full"> {/* Increased gap for tier groups */}
            {sortedTiers.map((tier) => (
                <div key={tier} className="grid grid-cols-3 gap-10 w-full"> {/* Container for each tier group */}
                    {/* Optionally, you can add a header for each tier here */}
                    {/* <h3 className="text-xl font-semibold mb-2" style={{ color: tierColors[tier] }}>Tier {tier}</h3> */}
                    {groupedAchievements[tier]?.map((achievement, index) => (
                        <Card
                            key={`${tier}-${index}`}
                            className="flex items-center gap-4 p-4 w-full border-4 hover:bg-neutral-900/70 transition-all"
                            style={{borderColor:tierColors[achievement.tier ?? 1]}}                      
                            >
                            <div className="relative h-12 w-12 flex-shrink-0">
                                <Image
                                    src={getCategoryImage(achievement.category)}
                                    alt={achievement.name ?? "alt"}
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <div className="flex items-center gap-2">
                                    <Medal
                                        size={20}
                                        className="flex-shrink-0"
                                        style={{ color: tierColors[achievement.tier ?? 1] }}
                                    />
                                    <span className="font-semibold text-lg" style={{color: tierColors[achievement.tier ?? 1]}}>{achievement.name}</span>
                                </div>
                                <p className="text-sm text-gray-400">{achievement.description}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            ))}
            {(!parsedAchievements || parsedAchievements.length === 0) && (
                 <div className="text-center py-8 border border-gray-700 rounded-md">
                    <p className="text-gray-400">No achievements to display yet.</p>
                </div>
            )}
        </div>
    )
}