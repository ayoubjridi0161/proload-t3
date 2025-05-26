"use server"

import { getAchievements } from "~/lib/data"
import {getAchievementNameAndTier} from "~/lib/translateAchievement"
import { Card } from "../card"
import { Medal } from "lucide-react"
import Image from "next/image"

type Props = {
    userID:string
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
function getCategoryImage(cat :string | undefined):string{
    switch(cat){
        case "totalWeight":
          return "/total weight.png"
        case "workoutCount":
          return "/total sessions.png"
        case "maxWeight":
            return "/max weight.png"
        default :
          return "/defaultAch.jpg"
    }
}
export default async function Achievements({userID}: Props) {
    const achievements = await getAchievements(userID)
    const parsedAchievements = achievements?.map((achievement) => {
        const ach = getAchievementNameAndTier(achievement.achievement,achievement.tier?? 1)
        return {
          ...ach,
          description: achievement.description, 
        }
      })
  return (
    <div className='shadow-bottom w-full p-2 space-y-3 bg-xtraContainer dark:bg-xtraDarkPrimary rounded-md'>
      <h2 className="text-lg font-semibold">Achievements</h2>
      {parsedAchievements && parsedAchievements.length > 0 ? (
        <ul className="space-y-2">
          {parsedAchievements.sort((a,b)=> (b.tier ?? 0) - (a.tier ?? 0)).splice(0,5).map((achievement, index: number) => (
            <Card style={{borderColor :tierColors[achievement.tier ?? 1] }}  key={index} className={`p-2 border-4 flex items-center gap-6 rounded-md shadow-sm`}>
              {/* Assuming achievement object has a 'name' property. Adjust as needed */}
              {/* <Medal color={tierColors[achievement.tier ?? 1]}/> */}
              <Image src={getCategoryImage(achievement.category)} alt="hello" width={50} height={50} className="h-full aspect-square"/>
              <div>
              <p className={`font-medium `} style={{color:tierColors[achievement.tier ?? 1]}} >{achievement.name}</p>
              {achievement.description && (
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              )}
              </div>
            </Card>
          ))}
        </ul>
      ) : (
        <p>No achievements yet.</p>
      )}
    </div>
  )
}