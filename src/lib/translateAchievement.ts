const achievementData = {
    "totalWeight": [
        { "name": "Weight Warrior", "tier": 1 },
        { "name": "Iron Challenger", "tier": 2 },
        { "name": "Steel Dominator", "tier": 3 },
        { "name": "Barbell Conqueror", "tier": 4 },
        { "name": "Limit Breaker", "tier": 5 }
    ],
    "workoutCount": [
      { "name": "Rookie", "tier": 1 },
      { "name": "Regular", "tier": 2 },
      { "name": "Disciplined", "tier": 3 },
      { "name": "Veteran", "tier": 4 },
      { "name": "Unstoppable", "tier": 5 }
    ],
    "maxWeightMilestones": [
      {
        "exercise": "Bench Press - Powerlifting",
        "tiers": [
          { "name": "Starter Bench", "tier": 1 },
          { "name": "Steel Chest", "tier": 2 },
          { "name": "Power Presser", "tier": 3 },
          { "name": "Iron Pusher", "tier": 4 },
          { "name": "Titan Chest", "tier": 5 },
          { "name": "Bench Monster", "tier": 6 }
        ]
      },
      {
        "exercise": "Barbell Squat",
        "tiers": [
          { "name": "Beginner Squatter", "tier": 1 },
          { "name": "Solid Base", "tier": 2 },
          { "name": "Iron Legs", "tier": 3 },
          { "name": "Beast Mode", "tier": 4 },
          { "name": "Titan Legs", "tier": 5 },
          { "name": "Squat King", "tier": 6 }
        ]
      },
      {
        "exercise": "Barbell Deadlift",
        "tiers": [
          { "name": "Rookie Pull", "tier": 1 },
          { "name": "Strong Back", "tier": 2 },
          { "name": "Deadlift Pro", "tier": 3 },
          { "name": "Bar Bender", "tier": 4 },
          { "name": "Titan Grip", "tier": 5 },
          { "name": "Deadlift Legend", "tier": 6 }
        ]
      }
    ]
  }
  const tierColors = [
    "#A0AEC0",  // Tier 1 - Cool Gray (Weight Warrior)
    "#4FD1C5",  // Tier 2 - Teal (Iron Challenger)
    "#F6AD55",  // Tier 3 - Orange (Steel Dominator)
    "#ED64A6",  // Tier 4 - Pink (Barbell Conqueror)
    "#9F7AEA",  // Tier 5 - Purple (Limit Breaker)
    "#F56565"   // Tier 6 - Fiery Red (Mythic Beast)
  ]
  
export function getAchievementNameAndTier(achievement: string, tier: number): { name: string; tier: number; category: string } | undefined {
  const achievementKey = achievement.split('_')[0]; // Key is the part before '_', or the whole string if no '_'

  if (achievementKey === "totalWeight" || achievementKey === "workoutCount") {
    // Directly access totalWeight or workoutCount arrays
    const categoryData = achievementData[achievementKey];
    const foundAchievement = categoryData.find(ach => ach.tier === tier);
    if (foundAchievement) {
    
      return { name: foundAchievement.name, tier: foundAchievement.tier, category: achievementKey };
    }
  } else {
    // Assume achievementKey is an exercise name, search in maxWeightMilestones
    const exerciseMilestone = achievementData.maxWeightMilestones.find(
      milestone => milestone.exercise === achievementKey
    );
    if (exerciseMilestone) {
      const foundTier = exerciseMilestone.tiers.find(t => t.tier === tier);
      if (foundTier) {
        return { name: foundTier.name, tier: foundTier.tier, category: "maxWeight" };
      }
    }
  }
  
  return undefined; // Return undefined if no match is found
}
  
  