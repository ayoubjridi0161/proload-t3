"use client"
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Button } from '../ui/button';
type exercices = {
    exercice: string,
    sets: number,
    muscleGroup: string
}[]
const MuscleGroupRadarChart = ({exercices}:{exercices?:exercices}) => {
  // Sample data - replace with your actual data
  const muscleGroups = ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core'];
  // const data2 = muscleGroups.map(muscleGroup => ({
  //   muscleGroup,
  //   exerciseCount: exercices.filter(exercice => exercice.muscleGroup === muscleGroup).length
  // }))

  const data = [
    { muscleGroup: 'Chest', exerciseCount: 9 },
    { muscleGroup: 'Back', exerciseCount: 8 },
    { muscleGroup: 'Legs', exerciseCount: 3 },
    { muscleGroup: 'Shoulders', exerciseCount: 6 },
    { muscleGroup: 'Arms', exerciseCount: 6 },
    { muscleGroup: 'Core', exerciseCount: 1 },
  ];

  const totalExercises = data.reduce((sum, item) => sum + item.exerciseCount, 0);

  const chartData = data.map(item => ({
    muscleGroup: item.muscleGroup,
    percentage: (item.exerciseCount / totalExercises) * 100
  }));

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="50%" data={chartData}>
          <PolarGrid  />
          <PolarAngleAxis dataKey="muscleGroup" />
          <Radar
            name="Muscle Group Distribution"
            dataKey="percentage"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
      
    </div>
  );
};

export default MuscleGroupRadarChart;