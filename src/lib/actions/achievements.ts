export const achievementsList = [
      {
        "id": "total_weight_bronze",
        "name": "Bronze Lifter",
        "description": "You've lifted a total of 5,000 kg!",
        "type": "total_weight",
        "category": "Volume",
        "criteria": {
          "min_total_weight_lifted": 5000
        },
        "tier": "bronze"
      },
      {
        "id": "total_weight_silver",
        "name": "Silver Lifter",
        "description": "You've lifted a total of 50,000 kg!",
        "type": "total_weight",
        "category": "Volume",
        "criteria": {
          "min_total_weight_lifted": 50000
        },
        "tier": "silver"
      },
      {
        "id": "total_weight_gold",
        "name": "Gold Lifter",
        "description": "You've lifted a total of 250,000 kg!",
        "type": "total_weight",
        "category": "Volume",
        "criteria": {
          "min_total_weight_lifted": 250000
        },
        "tier": "gold"
      },
      {
        "id": "max_squat_bronze",
        "name": "Squat Starter",
        "description": "Hit a max squat of 45 kg!",
        "type": "max_weight",
        "category": "Squat",
        "criteria": {
          "min_weight": 45
        },
        "tier": "bronze"
      },
      {
        "id": "max_squat_silver",
        "name": "Squat Grinder",
        "description": "Hit a max squat of 75 kg!",
        "type": "max_weight",
        "category": "Squat",
        "criteria": {
          "min_weight": 75
        },
        "tier": "silver"
      },
      {
        "id": "max_squat_gold",
        "name": "Plate Master Squat",
        "description": "Hit a max squat of 100 kg!",
        "type": "max_weight",
        "category": "Squat",
        "criteria": {
          "min_weight": 100
        },
        "tier": "gold"
      },
      {
        "id": "max_deadlift_bronze",
        "name": "Deadlift Novice",
        "description": "Hit a max deadlift of 60 kg!",
        "type": "max_weight",
        "category": "Deadlift",
        "criteria": {
          "min_weight": 60
        },
        "tier": "bronze"
      },
      {
        "id": "max_deadlift_silver",
        "name": "Deadlift Beast",
        "description": "Hit a max deadlift of 130 kg!",
        "type": "max_weight",
        "category": "Deadlift",
        "criteria": {
          "min_weight": 130
        },
        "tier": "silver"
      },
      {
        "id": "max_deadlift_gold",
        "name": "Deadlift Titan",
        "description": "Hit a max deadlift of 180 kg!",
        "type": "max_weight",
        "category": "Deadlift",
        "criteria": {
          "min_weight": 180
        },
        "tier": "gold"
      },
      {
        "id": "max_bench_bronze",
        "name": "Bench Beginner",
        "description": "Hit a max bench press of 30 kg!",
        "type": "max_weight",
        "category": "Bench Press",
        "criteria": {
          "min_weight": 30
        },
        "tier": "bronze"
      },
      {
        "id": "max_bench_silver",
        "name": "Bench Boss",
        "description": "Hit a max bench press of 70 kg!",
        "type": "max_weight",
        "category": "Bench Press",
        "criteria": {
          "min_weight": 70
        },
        "tier": "silver"
      },
      {
        "id": "max_bench_gold",
        "name": "Flat Press God",
        "description": "Hit a max bench press of 100 kg!",
        "type": "max_weight",
        "category": "Bench Press",
        "criteria": {
          "min_weight": 100
        },
        "tier": "gold"
      },
      {
        "id": "sessions_bronze",
        "name": "First Stepping Stone",
        "description": "Logged your first 5 training sessions.",
        "type": "session_count",
        "category": "Consistency",
        "criteria": {
          "min_sessions": 5
        },
        "tier": "bronze"
      },
      {
        "id": "sessions_silver",
        "name": "Weekly Warrior",
        "description": "Logged 4 sessions in one week.",
        "type": "session_count",
        "category": "Consistency",
        "criteria": {
          "min_weekly_sessions": 4
        },
        "tier": "silver"
      },
      {
        "id": "sessions_gold",
        "name": "Monthly Grind King",
        "description": "Logged 20 sessions in one month.",
        "type": "session_count",
        "category": "Consistency",
        "criteria": {
          "min_monthly_sessions": 20
        },
        "tier": "gold"
      },
      {
        "id": "progression_bronze",
        "name": "Gaining Momentum",
        "description": "Improved your bench press by 5% in 30 days.",
        "type": "progression",
        "category": "Progression",
        "criteria": {
          "exercise": "bench_press",
          "min_increase_percent": 5,
          "period_days": 30
        },
        "tier": "bronze"
      },
      {
        "id": "progression_silver",
        "name": "Plate Piler",
        "description": "Gained 10 kg on squat in 6 weeks.",
        "type": "progression",
        "category": "Progression",
        "criteria": {
          "exercise": "squat",
          "min_increase_kg": 10,
          "period_days": 42
        },
        "tier": "silver"
      },
      {
        "id": "progression_gold",
        "name": "Rising Star",
        "description": "Improved 3 lifts by 15% in 90 days.",
        "type": "progression",
        "category": "Progression",
        "criteria": {
          "num_lifts": 3,
          "min_increase_percent": 15,
          "period_days": 90
        },
        "tier": "gold"
      }
    ]

export function getAchievement(type:"totalWeight"|"MaxWeight"|"sessions"|"progression",category:string,oldValue:number,newValue:number){
    // Filter achievements by type
    const relevantAchievements = achievementsList.filter(achievement => {
        switch(type.toLowerCase()) {
            case "totalweight":
                return achievement.type === "total_weight";
            case "maxweight":
                return achievement.type === "max_weight";
            case "sessions":
                return achievement.type === "session_count";
            case "progression":
                return achievement.type === "progression";
            default:
                return false;
        }
    });

    const relevantAchievements2 = relevantAchievements.filter( achievement => achievement.category === category );
    

    // Sort achievements by criteria value (ascending)
    const sortedAchievements = relevantAchievements2.sort((a, b) => {
        const criteriaA = Object.values(a.criteria)[0] as number;
        const criteriaB = Object.values(b.criteria)[0] as number;
        return criteriaA - criteriaB;
    });

    
    // Find the highest tier achievement that the old value qualified for
    const oldAchievement = sortedAchievements.filter(achievement => {
        const criteriaValue = Object.values(achievement.criteria)[0] as number;
        return oldValue >= criteriaValue;
    }).pop();

    // Find the highest tier achievement that the new value qualifies for
    const newAchievement = sortedAchievements.filter(achievement => {
        const criteriaValue = Object.values(achievement.criteria)[0] as number;
        return newValue >= criteriaValue;
    }).pop();

    // If there's no new achievement or it's the same as the old one, return null
    if (!newAchievement || (oldAchievement?.id === newAchievement.id)) {
        return null;
    }

    return newAchievement;
}

export function checkForAchievements(){
  const Consistency = achievementsList.filter(achievement => achievement.category === "Consistency");
}