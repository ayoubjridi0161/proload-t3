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

export function calculateExerciseProgress(userLogs: UserLog[]): ProgressResult[] {
  if (userLogs.length < 2) {
    return [{
      exerciseName: userLogs[0]?.logs[0]?.name ?? '',
      increasePercentage: 0
    }];
  }

  // Flat map all logs and find max weight for each exercise occurrence
  const flattenedLogs = userLogs.flatMap(log => 
    log.logs.map(exercise => ({
      name: exercise.name,
      date: log.date,
      maxWeight: Math.max(...exercise.sets.map(set => Number(set.weight) || 0))
    }))
  );

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

export function calculateWeeklyVolume(userLogs: UserLog[]): { week: string; volume: number }[] {
  if (userLogs.length === 0) {
    return [];
  }

  // Helper function to get the first day of the week from a date
  const getFirstDayOfWeek = (dateStr: string): string => {
    const date = new Date(dateStr);
    const day = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust to get Monday (first day of week)
    const firstDay = new Date(date.setDate(diff));
    return firstDay.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  // Group logs by week and calculate total volume
  const weeklyVolumes = userLogs.reduce((acc, log) => {
    const weekFirstDay = getFirstDayOfWeek(log.date);
    
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