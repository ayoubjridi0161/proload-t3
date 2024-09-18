import { db } from './index'; // Adjust the import according to your project structure
import { exerciceNames } from './schema'; // Adjust the import according to your project structure

// Define the exercises data


  const chestExercises = [
    {
      name: 'Bench Press',
      musclesTargeted: ['chest', 'triceps', 'shoulders'],
      muscleGroup: 'chest',
      equipment: ['barbell', 'bench']
    },
    {
      name: 'Push-Up',
      musclesTargeted: ['chest', 'triceps', 'shoulders'],
      muscleGroup: 'chest',
      equipment: ['body weight']
    },
    {
      name: 'Dumbbell Flyes',
      musclesTargeted: ['chest'],
      muscleGroup: 'chest',
      equipment: ['dumbbells', 'bench']
    },
    {
      name: 'Incline Bench Press',
      musclesTargeted: ['upper chest', 'triceps', 'shoulders'],
      muscleGroup: 'chest',
      equipment: ['barbell', 'incline bench']
    },
    {
      name: 'Decline Bench Press',
      musclesTargeted: ['lower chest', 'triceps'],
      muscleGroup: 'chest',
      equipment: ['barbell', 'decline bench']
    },
    {
      name: 'Cable Flyes',
      musclesTargeted: ['chest'],
      muscleGroup: 'chest',
      equipment: ['cable machine']
    },
    {
      name: 'Dips',
      musclesTargeted: ['lower chest', 'triceps'],
      muscleGroup: 'chest',
      equipment: ['parallel bars', 'dip station']
    },
    {
      name: 'Chest Press Machine',
      musclesTargeted: ['chest', 'triceps'],
      muscleGroup: 'chest',
      equipment: ['chest press machine']
    },
    {
      name: 'Landmine Press',
      musclesTargeted: ['chest', 'shoulders', 'triceps'],
      muscleGroup: 'chest',
      equipment: ['barbell', 'landmine attachment']
    },
    {
      name: 'Medicine Ball Push-Up',
      musclesTargeted: ['chest', 'triceps', 'shoulders', 'core'],
      muscleGroup: 'chest',
      equipment: ['medicine ball']
    }
  ];
  const legExercises = [
    {
      name: 'Squat',
      musclesTargeted: ['quadriceps', 'hamstrings', 'glutes', 'calves'],
      muscleGroup: 'legs',
      equipment: ['barbell', 'squat rack']
    },
    {
      name: 'Deadlift',
      musclesTargeted: ['hamstrings', 'glutes', 'lower back', 'quadriceps'],
      muscleGroup: 'legs',
      equipment: ['barbell', 'weight plates']
    },
    {
      name: 'Leg Press',
      musclesTargeted: ['quadriceps', 'hamstrings', 'glutes'],
      muscleGroup: 'legs',
      equipment: ['leg press machine']
    },
    {
      name: 'Lunges',
      musclesTargeted: ['quadriceps', 'hamstrings', 'glutes', 'calves'],
      muscleGroup: 'legs',
      equipment: ['body weight', 'dumbbells']
    },
    {
      name: 'Romanian Deadlift',
      musclesTargeted: ['hamstrings', 'glutes', 'lower back'],
      muscleGroup: 'legs',
      equipment: ['barbell', 'dumbbells']
    },
    {
      name: 'Leg Extension',
      musclesTargeted: ['quadriceps'],
      muscleGroup: 'legs',
      equipment: ['leg extension machine']
    },
    {
      name: 'Leg Curl',
      musclesTargeted: ['hamstrings'],
      muscleGroup: 'legs',
      equipment: ['leg curl machine']
    },
    {
      name: 'Calf Raises',
      musclesTargeted: ['calves'],
      muscleGroup: 'legs',
      equipment: ['body weight', 'smith machine', 'calf raise machine']
    },
    {
      name: 'Step-Up',
      musclesTargeted: ['quadriceps', 'hamstrings', 'glutes'],
      muscleGroup: 'legs',
      equipment: ['platform', 'dumbbells']
    },
    {
      name: 'Bulgarian Split Squat',
      musclesTargeted: ['quadriceps', 'hamstrings', 'glutes', 'calves'],
      muscleGroup: 'legs',
      equipment: ['bench', 'dumbbells']
    },
    {
      name: 'Hack Squat',
      musclesTargeted: ['quadriceps', 'hamstrings', 'glutes'],
      muscleGroup: 'legs',
      equipment: ['hack squat machine']
    },
    {
      name: 'Glute Bridge',
      musclesTargeted: ['glutes', 'hamstrings'],
      muscleGroup: 'legs',
      equipment: ['body weight', 'barbell']
    },
    {
      name: 'Box Jump',
      musclesTargeted: ['quadriceps', 'calves', 'glutes'],
      muscleGroup: 'legs',
      equipment: ['plyometric box']
    },
    {
      name: 'Sumo Deadlift',
      musclesTargeted: ['hamstrings', 'glutes', 'quadriceps', 'inner thighs'],
      muscleGroup: 'legs',
      equipment: ['barbell', 'weight plates']
    },
    {
      name: 'Goblet Squat',
      musclesTargeted: ['quadriceps', 'glutes', 'core'],
      muscleGroup: 'legs',
      equipment: ['dumbbell', 'kettlebell']
    },
    {
      name: 'Pistol Squat',
      musclesTargeted: ['quadriceps', 'glutes', 'calves', 'core'],
      muscleGroup: 'legs',
      equipment: ['body weight']
    },
    {
      name: 'Seated Calf Raise',
      musclesTargeted: ['calves'],
      muscleGroup: 'legs',
      equipment: ['seated calf raise machine', 'barbell']
    },
    {
      name: 'Leg Press Calf Raise',
      musclesTargeted: ['calves'],
      muscleGroup: 'legs',
      equipment: ['leg press machine']
    },
    {
      name: 'Walking Lunge',
      musclesTargeted: ['quadriceps', 'hamstrings', 'glutes', 'calves'],
      muscleGroup: 'legs',
      equipment: ['body weight', 'dumbbells']
    },
    {
      name: 'Front Squat',
      musclesTargeted: ['quadriceps', 'glutes', 'core'],
      muscleGroup: 'legs',
      equipment: ['barbell', 'squat rack']
    }
  ];
  const coreExercises = [
    {
      name: 'Plank',
      musclesTargeted: ['rectus abdominis', 'transverse abdominis', 'obliques', 'lower back'],
      muscleGroup: 'core',
      equipment: ['body weight']
    },
    {
      name: 'Crunches',
      musclesTargeted: ['rectus abdominis'],
      muscleGroup: 'core',
      equipment: ['body weight']
    },
    {
      name: 'Russian Twist',
      musclesTargeted: ['obliques', 'rectus abdominis'],
      muscleGroup: 'core',
      equipment: ['body weight', 'medicine ball', 'weight plate']
    },
    {
      name: 'Dead Bug',
      musclesTargeted: ['rectus abdominis', 'transverse abdominis', 'lower back'],
      muscleGroup: 'core',
      equipment: ['body weight']
    },
    {
      name: 'Bicycle Crunches',
      musclesTargeted: ['rectus abdominis', 'obliques'],
      muscleGroup: 'core',
      equipment: ['body weight']
    },
    {
      name: 'Mountain Climbers',
      musclesTargeted: ['rectus abdominis', 'obliques', 'hip flexors'],
      muscleGroup: 'core',
      equipment: ['body weight']
    },
    {
      name: 'Leg Raises',
      musclesTargeted: ['lower abs', 'hip flexors'],
      muscleGroup: 'core',
      equipment: ['body weight', 'pull-up bar']
    },
    {
      name: 'Cable Woodchoppers',
      musclesTargeted: ['obliques', 'rectus abdominis'],
      muscleGroup: 'core',
      equipment: ['cable machine']
    },
    {
      name: 'Pallof Press',
      musclesTargeted: ['obliques', 'transverse abdominis'],
      muscleGroup: 'core',
      equipment: ['cable machine', 'resistance band']
    },
    {
      name: 'Ab Wheel Rollout',
      musclesTargeted: ['rectus abdominis', 'transverse abdominis', 'lower back'],
      muscleGroup: 'core',
      equipment: ['ab wheel']
    },
    {
      name: 'Reverse Crunch',
      musclesTargeted: ['lower abs'],
      muscleGroup: 'core',
      equipment: ['body weight']
    },
    {
      name: 'Side Plank',
      musclesTargeted: ['obliques', 'transverse abdominis'],
      muscleGroup: 'core',
      equipment: ['body weight']
    },
    {
      name: 'Medicine Ball Slam',
      musclesTargeted: ['rectus abdominis', 'obliques', 'shoulders'],
      muscleGroup: 'core',
      equipment: ['medicine ball']
    },
    {
      name: 'Hanging Leg Raise',
      musclesTargeted: ['lower abs', 'hip flexors'],
      muscleGroup: 'core',
      equipment: ['pull-up bar']
    },
    {
      name: 'Dragon Flag',
      musclesTargeted: ['rectus abdominis', 'lower back'],
      muscleGroup: 'core',
      equipment: ['bench']
    },
    {
      name: 'Plank to Downward Dog',
      musclesTargeted: ['rectus abdominis', 'transverse abdominis', 'shoulders'],
      muscleGroup: 'core',
      equipment: ['body weight']
    },
    {
      name: 'Turkish Get-Up',
      musclesTargeted: ['obliques', 'rectus abdominis', 'shoulders', 'hips'],
      muscleGroup: 'core',
      equipment: ['kettlebell', 'dumbbell']
    },
    {
      name: 'Bird Dog',
      musclesTargeted: ['lower back', 'glutes', 'transverse abdominis'],
      muscleGroup: 'core',
      equipment: ['body weight']
    },
    {
      name: 'Superman',
      musclesTargeted: ['lower back', 'glutes'],
      muscleGroup: 'core',
      equipment: ['body weight']
    },
    {
      name: 'Hollow Body Hold',
      musclesTargeted: ['rectus abdominis', 'transverse abdominis', 'lower back'],
      muscleGroup: 'core',
      equipment: ['body weight']
    }
  ];
  const backExercises = [
    {
      name: 'Pull-Up',
      musclesTargeted: ['back', 'biceps', 'shoulders'],
      muscleGroup: 'back',
      equipment: ['pull-up bar']
    },
    {
      name: 'Deadlift',
      musclesTargeted: ['back', 'glutes', 'hamstrings', 'core'],
      muscleGroup: 'back',
      equipment: ['barbell', 'weight plates']
    },
    {
      name: 'Bent-Over Row',
      musclesTargeted: ['back', 'biceps', 'shoulders'],
      muscleGroup: 'back',
      equipment: ['barbell', 'dumbbells']
    },
    {
      name: 'Lat Pulldown',
      musclesTargeted: ['back', 'biceps'],
      muscleGroup: 'back',
      equipment: ['cable machine', 'lat pulldown bar']
    },
    {
      name: 'T-Bar Row',
      musclesTargeted: ['back', 'biceps'],
      muscleGroup: 'back',
      equipment: ['t-bar row machine', 'weight plates']
    },
    {
      name: 'Face Pull',
      musclesTargeted: ['upper back', 'rear deltoids', 'rotator cuff'],
      muscleGroup: 'back',
      equipment: ['cable machine', 'rope attachment']
    },
    {
      name: 'Single-Arm Dumbbell Row',
      musclesTargeted: ['back', 'biceps', 'shoulders'],
      muscleGroup: 'back',
      equipment: ['dumbbell', 'bench']
    },
    {
      name: 'Seated Cable Row',
      musclesTargeted: ['back', 'biceps'],
      muscleGroup: 'back',
      equipment: ['cable machine', 'row handle']
    },
    {
      name: 'Good Morning',
      musclesTargeted: ['lower back', 'hamstrings', 'glutes'],
      muscleGroup: 'back',
      equipment: ['barbell']
    },
    {
      name: 'Superman',
      musclesTargeted: ['lower back', 'glutes'],
      muscleGroup: 'back',
      equipment: ['body weight']
    },
    {
      name: 'Hyperextension',
      musclesTargeted: ['lower back', 'glutes', 'hamstrings'],
      muscleGroup: 'back',
      equipment: ['hyperextension bench']
    },
    {
      name: 'Inverted Row',
      musclesTargeted: ['back', 'biceps', 'core'],
      muscleGroup: 'back',
      equipment: ['barbell', 'smith machine', 'or TRX straps']
    },
    // New exercises added below
    {
      name: 'Pendlay Row',
      musclesTargeted: ['back', 'shoulders', 'biceps'],
      muscleGroup: 'back',
      equipment: ['barbell', 'weight plates']
    },
    {
      name: 'Meadows Row',
      musclesTargeted: ['back', 'lats', 'biceps'],
      muscleGroup: 'back',
      equipment: ['barbell', 'landmine attachment']
    },
    {
      name: 'Chest-Supported Dumbbell Row',
      musclesTargeted: ['back', 'rear deltoids', 'biceps'],
      muscleGroup: 'back',
      equipment: ['dumbbells', 'incline bench']
    },
    {
      name: 'Straight-Arm Pulldown',
      musclesTargeted: ['back', 'lats', 'triceps'],
      muscleGroup: 'back',
      equipment: ['cable machine', 'straight bar attachment']
    },
    {
      name: 'Renegade Row',
      musclesTargeted: ['back', 'core', 'shoulders'],
      muscleGroup: 'back',
      equipment: ['dumbbells']
    },
    {
      name: 'Seated Machine Row',
      musclesTargeted: ['back', 'biceps'],
      muscleGroup: 'back',
      equipment: ['rowing machine']
    },
    {
      name: 'Rack Pull',
      musclesTargeted: ['upper back', 'traps', 'forearms'],
      muscleGroup: 'back',
      equipment: ['barbell', 'power rack']
    },
    {
      name: 'Barbell Shrug',
      musclesTargeted: ['upper back', 'traps'],
      muscleGroup: 'back',
      equipment: ['barbell']
    },
    {
      name: 'Chin-Up',
      musclesTargeted: ['back', 'biceps', 'forearms'],
      muscleGroup: 'back',
      equipment: ['pull-up bar']
    },
    {
      name: 'Back Extension',
      musclesTargeted: ['lower back', 'glutes', 'hamstrings'],
      muscleGroup: 'back',
      equipment: ['back extension machine']
    }
  ];
  const armExercises = [
    {
      name: 'Bicep Curl',
      musclesTargeted: ['biceps'],
      muscleGroup: 'arms',
      equipment: ['dumbbells', 'barbell', 'ez-bar']
    },
    {
      name: 'Tricep Pushdown',
      musclesTargeted: ['triceps'],
      muscleGroup: 'arms',
      equipment: ['cable machine']
    },
    {
      name: 'Hammer Curl',
      musclesTargeted: ['biceps', 'brachialis'],
      muscleGroup: 'arms',
      equipment: ['dumbbells']
    },
    {
      name: 'Skull Crushers',
      musclesTargeted: ['triceps'],
      muscleGroup: 'arms',
      equipment: ['barbell', 'ez-bar', 'dumbbells']
    },
    {
      name: 'Preacher Curl',
      musclesTargeted: ['biceps'],
      muscleGroup: 'arms',
      equipment: ['preacher bench', 'dumbbells', 'ez-bar']
    },
    {
      name: 'Dips',
      musclesTargeted: ['triceps', 'chest'],
      muscleGroup: 'arms',
      equipment: ['parallel bars', 'dip station']
    },
    {
      name: 'Concentration Curl',
      musclesTargeted: ['biceps'],
      muscleGroup: 'arms',
      equipment: ['dumbbell']
    },
    {
      name: 'Overhead Tricep Extension',
      musclesTargeted: ['triceps'],
      muscleGroup: 'arms',
      equipment: ['dumbbell', 'cable machine']
    },
    {
      name: 'Reverse Curl',
      musclesTargeted: ['brachialis', 'forearms'],
      muscleGroup: 'arms',
      equipment: ['barbell', 'ez-bar']
    },
    {
      name: 'Diamond Push-Up',
      musclesTargeted: ['triceps', 'chest'],
      muscleGroup: 'arms',
      equipment: ['body weight']
    },
    {
      name: 'Zottman Curl',
      musclesTargeted: ['biceps', 'forearms'],
      muscleGroup: 'arms',
      equipment: ['dumbbells']
    },
    {
      name: 'Tricep Kickback',
      musclesTargeted: ['triceps'],
      muscleGroup: 'arms',
      equipment: ['dumbbells', 'cable machine']
    },
    {
      name: 'Wrist Curl',
      musclesTargeted: ['forearms'],
      muscleGroup: 'arms',
      equipment: ['dumbbells', 'barbell']
    },
    {
      name: 'Close-Grip Bench Press',
      musclesTargeted: ['triceps', 'chest'],
      muscleGroup: 'arms',
      equipment: ['barbell', 'bench']
    },
    {
      name: 'Chin-Up',
      musclesTargeted: ['biceps', 'back'],
      muscleGroup: 'arms',
      equipment: ['pull-up bar']
    },
    {
      name: 'Cable Curl',
      musclesTargeted: ['biceps'],
      muscleGroup: 'arms',
      equipment: ['cable machine']
    },
    {
      name: 'Tricep Rope Pushdown',
      musclesTargeted: ['triceps'],
      muscleGroup: 'arms',
      equipment: ['cable machine', 'rope attachment']
    },
    {
      name: 'Plate Pinch',
      musclesTargeted: ['forearms', 'grip strength'],
      muscleGroup: 'arms',
      equipment: ['weight plates']
    },
    {
      name: 'Spider Curl',
      musclesTargeted: ['biceps'],
      muscleGroup: 'arms',
      equipment: ['incline bench', 'dumbbells', 'ez-bar']
    },
    {
      name: 'Farmers Walk',
      musclesTargeted: ['forearms', 'grip strength', 'full body'],
      muscleGroup: 'arms',
      equipment: ['dumbbells', 'farmers walk handles']
    }
  ];
  const shoulderExercises = [
    {
      name: 'Overhead Press',
      musclesTargeted: ['anterior deltoid', 'lateral deltoid', 'triceps'],
      muscleGroup: 'shoulders',
      equipment: ['barbell', 'dumbbells']
    },
    {
      name: 'Lateral Raise',
      musclesTargeted: ['lateral deltoid'],
      muscleGroup: 'shoulders',
      equipment: ['dumbbells', 'cable machine']
    },
    {
      name: 'Front Raise',
      musclesTargeted: ['anterior deltoid'],
      muscleGroup: 'shoulders',
      equipment: ['dumbbells', 'barbell', 'weight plate']
    },
    {
      name: 'Reverse Fly',
      musclesTargeted: ['posterior deltoid', 'upper back'],
      muscleGroup: 'shoulders',
      equipment: ['dumbbells', 'cable machine', 'reverse fly machine']
    },
    {
      name: 'Face Pull',
      musclesTargeted: ['posterior deltoid', 'upper back', 'rotator cuff'],
      muscleGroup: 'shoulders',
      equipment: ['cable machine', 'resistance band']
    },
    {
      name: 'Arnold Press',
      musclesTargeted: ['anterior deltoid', 'lateral deltoid', 'triceps'],
      muscleGroup: 'shoulders',
      equipment: ['dumbbells']
    },
    {
      name: 'Upright Row',
      musclesTargeted: ['lateral deltoid', 'traps'],
      muscleGroup: 'shoulders',
      equipment: ['barbell', 'dumbbells', 'cable machine']
    },
    {
      name: 'Pike Push-Up',
      musclesTargeted: ['anterior deltoid', 'triceps'],
      muscleGroup: 'shoulders',
      equipment: ['body weight']
    },
    {
      name: 'Dumbbell Shoulder Press',
      musclesTargeted: ['anterior deltoid', 'lateral deltoid', 'triceps'],
      muscleGroup: 'shoulders',
      equipment: ['dumbbells']
    },
    {
      name: 'Cable Lateral Raise',
      musclesTargeted: ['lateral deltoid'],
      muscleGroup: 'shoulders',
      equipment: ['cable machine']
    },
    {
      name: 'Landmine Press',
      musclesTargeted: ['anterior deltoid', 'upper chest', 'triceps'],
      muscleGroup: 'shoulders',
      equipment: ['barbell', 'landmine attachment']
    },
    {
      name: 'Band Pull-Apart',
      musclesTargeted: ['posterior deltoid', 'upper back'],
      muscleGroup: 'shoulders',
      equipment: ['resistance band']
    },
    {
      name: 'Barbell Shrug',
      musclesTargeted: ['traps', 'upper back'],
      muscleGroup: 'shoulders',
      equipment: ['barbell']
    },
    {
      name: 'Machine Shoulder Press',
      musclesTargeted: ['anterior deltoid', 'lateral deltoid', 'triceps'],
      muscleGroup: 'shoulders',
      equipment: ['shoulder press machine']
    },
    {
      name: '3-Way Raises',
      musclesTargeted: ['anterior deltoid', 'lateral deltoid', 'posterior deltoid'],
      muscleGroup: 'shoulders',
      equipment: ['dumbbells']
    },
    {
      name: 'Seated Bent-Over Rear Delt Raise',
      musclesTargeted: ['posterior deltoid'],
      muscleGroup: 'shoulders',
      equipment: ['dumbbells']
    },
    {
      name: 'Cuban Press',
      musclesTargeted: ['rotator cuff', 'deltoids'],
      muscleGroup: 'shoulders',
      equipment: ['dumbbells', 'barbell']
    },
    {
      name: 'Plate Front Raise',
      musclesTargeted: ['anterior deltoid'],
      muscleGroup: 'shoulders',
      equipment: ['weight plate']
    },
    {
      name: 'Bradford Press',
      musclesTargeted: ['anterior deltoid', 'lateral deltoid', 'triceps'],
      muscleGroup: 'shoulders',
      equipment: ['barbell']
    },
    {
      name: 'Bottoms-Up Kettlebell Press',
      musclesTargeted: ['deltoids', 'forearms', 'core'],
      muscleGroup: 'shoulders',
      equipment: ['kettlebell']
    }
  ];
  

// Function to seed the database
export async function seedDatabase() {
  try {
    console.log([...backExercises,...armExercises,...shoulderExercises])
    const allEXES = [...backExercises,...armExercises,...shoulderExercises]
    for (const exercise of allEXES) {
      await db.insert(exerciceNames).values(exercise);
    }
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } 
}
