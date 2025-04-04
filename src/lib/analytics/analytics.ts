type UserLog = {
    id: number
    userId: string
    workoutId: number
    date: string
    duration: number
    logs: {
      name: string
      sets: {
        setIndex: string
        weight: string
      }[]
    }[]
  }
interface ProgressResult {
  exerciseName: string;
  increasePercentage: number;
}
const flattenLogs = (userLogs:UserLog[]) => {
  return userLogs.flatMap(log => 
  log.logs.map(exercise => ({
    name: exercise.name,
    date: log.date,
    maxWeight: Math.max(...exercise.sets.map(set => Number(set.weight) || 0))
  })));
}
export function calculateExerciseProgress(userLogs: UserLog[]): ProgressResult[] {
  if (userLogs.length < 2) {
    return [{
      exerciseName: userLogs[0]?.logs[0]?.name ?? '',
      increasePercentage: 0
    }];
  }

  // Flat map all logs and find max weight for each exercise occurrence
  const flattenedLogs = flattenLogs(userLogs);

  // Group by exercise name and count frequency
  const exerciseGroups = flattenedLogs.reduce((acc, curr) => {
    if (!acc[curr.name]) {
      acc[curr.name] = {
        name: curr.name,
        count: 0,
        weights: []
      };
    }
    acc[curr.name].count++;
    acc[curr.name].weights.push({
      weight: curr.maxWeight,
      date: curr.date
    });
    return acc;
  }, {} as Record<string, { name: string; count: number; weights: { weight: number; date: string }[] }>);

  // Calculate progress for all exercises
  return Object.values(exerciseGroups).map(exercise => {
    const sortedWeights = exercise.weights
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const initialWeight = sortedWeights[0]?.weight ?? 0;
    const finalWeight = sortedWeights[sortedWeights.length - 1]?.weight ?? 0;

    const increasePercentage = initialWeight === 0 ? 0 : 
      ((finalWeight - initialWeight) / initialWeight) * 100;

    return {
      exerciseName: exercise.name,
      increasePercentage: Number(increasePercentage.toFixed(2))
    };
  });
}
// Helper function to get the first day of the week from a date
const calculateFirstDayOfWeek = (dateStr: string): string => {
  const date = new Date(dateStr);
  const day = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust to get Monday (first day of week)
  const firstDay = new Date(date.setDate(diff));
  return firstDay.toISOString().split('T')[0] ?? ''; // Format as YYYY-MM-DD
};
export function calculateWeeklyVolume(userLogs: UserLog[]): { week: string; volume: number }[] {
  if (userLogs.length === 0) {
    return [];
  }
  // Group logs by week and calculate total volume
  const weeklyVolumes = userLogs.reduce((acc, log) => {
    const weekFirstDay = calculateFirstDayOfWeek(log.date);
    
    if (!acc[weekFirstDay]) {
      acc[weekFirstDay] = 0;
    }
    
    // Calculate volume for this log (sum of weight for all sets)
    const logVolume = log.logs.reduce((exerciseVolume, exercise) => {
      const exerciseTotal = exercise.sets.reduce((setVolume, set) => {
        return setVolume + (Number(set.weight) || 0);
      }, 0);
      return exerciseVolume + exerciseTotal;
    }, 0);
    
    acc[weekFirstDay] += logVolume;
    return acc;
  }, {} as Record<string, number>);

  // Convert to array and sort by week
  return Object.entries(weeklyVolumes)
    .map(([week, volume]) => ({ week, volume }))
    .sort((a, b) => a.week.localeCompare(b.week));
}
export function groupExercisesByName(flattenedLogs: {
  name: string;
  date: string;
  maxWeight: number;
}[]) {
  return flattenedLogs.reduce((acc, log) => {
    if (!acc.find(x => x.name === log.name)) {
      acc.push({
        name: log.name,
        exercises: [{date: log.date, maxWeight: log.maxWeight}]
      });
    } else {
      const exercise = acc.find(x => x.name === log.name);
      if (exercise) {
        exercise.exercises.push({date: log.date, maxWeight: log.maxWeight});
      }
    }
    return acc;
  }, [] as Array<{
    name: string;
    exercises: Array<{date: string; maxWeight: number}>
  }>);
}
export function calculateExerciseWeeklyWeightProgress(exercise: {name:string,exercises:Array<{date: string; maxWeight: number}>}) {

  const sortedExercises = exercise.exercises.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  // Helper function to get the week start date (Monday)
  const getWeekStart = (dateStr: string): string => {
    const date = new Date(dateStr);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust to get Monday
    const weekStartDate = new Date(date.setDate(diff));
    return weekStartDate.toISOString().split('T')[0] ?? '';
  };

  // Group exercises by week
  const weeklyExercises = sortedExercises.reduce((acc, exercise) => {
    const weekStart = getWeekStart(exercise.date);
    
    if (!acc[weekStart]) {
      acc[weekStart] = [];
    }
    
    acc[weekStart].push(exercise);
    return acc;
  }, {} as Record<string, Array<{date: string; maxWeight: number}>>);

  // Convert to array format and sort by week
  return Object.entries(weeklyExercises)
    .map(([weekStart, exercises]) => ({
      weekStart,
      exercises
    }))
    .sort((a, b) => a.weekStart.localeCompare(b.weekStart));
}
export function calculateAverageWeightPerExercisePerWeek(Exercise: {
  name: string;
  exercises: Array<{
      date: string;
      maxWeight: number;
  }>;
}[]){
  return Exercise.map(exercise => ({
    name: exercise.name,
    weeklyProgress: calculateExerciseWeeklyWeightProgress(exercise)
    .map(week => ({
      weekStart: week.weekStart,
      averageWeight: week.exercises.reduce((acc, exercise) => acc + exercise.maxWeight, 0) / week.exercises.length
    }))
  }));
}
export function calculateWeeklyProgressPerExercise (userLogs: UserLog[]) {
  const flattenedLogs = flattenLogs(userLogs);
  const groupedExercises = groupExercisesByName(flattenedLogs);
  return calculateAverageWeightPerExercisePerWeek(groupedExercises);
}
export function calculateOverallWeeklyProgress(Exercises:{
  name: string,
  weeklyProgress: {
      weekStart: string
      averageWeight: number
  }[],
}[]){
  // calculate all unique weeks across all exercises
  const allWeeks = new Set<string>();
  Exercises.forEach(exercise => {
    exercise.weeklyProgress.forEach(week => {
      allWeeks.add(week.weekStart);
    });
  });

  // Convert to array and sort weeks
  const sortedWeeks = Array.from(allWeeks).sort();

  // Calculate average progress for each week
  return sortedWeeks.map(week => {
    const exercisesForWeek = Exercises.filter(exercise => 
      exercise.weeklyProgress.some(progress => progress.weekStart === week)
    );

    const totalWeight = exercisesForWeek.reduce((sum, exercise) => {
      const weekProgress = exercise.weeklyProgress.find(progress => 
        progress.weekStart === week
      );
      return sum + (weekProgress?.averageWeight ?? 0);
    }, 0);

    const averageWeight = totalWeight / exercisesForWeek.length;

    return {
      weekStart: week,
      averageWeight: Number(averageWeight.toFixed(2))
    };
  });
}

export function calculateWeeklyWeightProgress(userLogs: UserLog[]) {
  const weeklyProgressPerExercise = calculateWeeklyProgressPerExercise(userLogs);
  return calculateOverallWeeklyProgress(weeklyProgressPerExercise);
}

export function getMainLiftsProgress(weeklyProgressPerExercise:{
  name: string;
  weeklyProgress: {
      weekStart: string;
      averageWeight: number;
  }[];
}[]){
  const ExerciseNames = [
    'squats', 'bench press', 'deadlift', 'overhead press', 
  ];
  const mainLifts = weeklyProgressPerExercise.filter(exercise =>
    ExerciseNames.includes(exercise.name.toLowerCase())
  );
  // Get all unique weeks
  const allWeeks = new Set<string>();
  mainLifts.forEach(lift => {
    lift.weeklyProgress.forEach(week => {
      allWeeks.add(week.weekStart);
    });
  });

  // Convert to array and sort weeks
  const sortedWeeks = Array.from(allWeeks).sort();

  // Create combined progress object for each week
  return sortedWeeks.map(week => {
    const result: { 
      weekStart: string,
      bench?: number,
      squat?: number,
      deadlift?: number,
      overhead?: number
    } = {
      weekStart: week
    };

    mainLifts.forEach(lift => {
      const weekProgress = lift.weeklyProgress.find(progress => progress.weekStart === week);
      if (weekProgress) {
        const liftName = lift.name.toLowerCase();
        if (liftName.includes('bench') && weekProgress?.averageWeight) result.bench = weekProgress.averageWeight;
        if (liftName.includes('squat')) result.squat = weekProgress.averageWeight;
        if (liftName.includes('deadlift')) result.deadlift = weekProgress.averageWeight;
        if (liftName.includes('overhead')) result.overhead = weekProgress.averageWeight;
      }
    });

    return result;
  });
}

export function calculateWorkoutFrequencyPerDay(userLogs: UserLog[]) {
  // Count workouts for each day of the week
  const dayCount = userLogs.reduce((acc, log) => {
    const date = new Date(log.date);
    const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
    acc[dayOfWeek] = (acc[dayOfWeek] ?? 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  // Calculate total number of weeks from first to last workout
  const dates = userLogs.map(log => new Date(log.date).getTime());
  const firstWorkout = Math.min(...dates);
  const lastWorkout = Math.max(...dates);
  const totalWeeks = Math.ceil((lastWorkout - firstWorkout) / (7 * 24 * 60 * 60 * 1000));

  // Calculate probability for each day
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days.map((day, index) => ({
    day,
    probability: Number(((dayCount[index] ?? 0) / totalWeeks * 100).toFixed(2))
  }));

}

export function calculateWeeklyWorkoutVolume(userLogs: UserLog[]) {
  if (userLogs.length === 0) {
    return [];
  }

  // Group logs by week and count sets
  const weeklyVolumes = userLogs.reduce((acc, log) => {
    const weekFirstDay = calculateFirstDayOfWeek(log.date);
    
    if (!acc[weekFirstDay]) {
      acc[weekFirstDay] = 0;
    }
    
    // Count total sets for this log
    const totalSets = log.logs.reduce((exerciseSets, exercise) => {
      return exerciseSets + exercise.sets.length;
    }, 0);
    
    acc[weekFirstDay] += totalSets;
    return acc;
  }, {} as Record<string, number>);

  // Convert to array and sort by week
  return Object.entries(weeklyVolumes)
    .map(([week, sets]) => ({ 
      week, 
      totalSets: sets 
    }))
    .sort((a, b) => a.week.localeCompare(b.week));
}


