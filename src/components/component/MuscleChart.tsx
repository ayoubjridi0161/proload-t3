"use client"
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Button } from '../ui/button';
type Data = {
  muscleGroup: string;
  exerciseCount: number;
}[]
const MuscleGroupRadarChart = ({data}:{data:Data}) => {
  // Sample data - replace with your actual data
  const muscleGroups = ['Chest', 'Back', 'Legs', 'shoulders', 'Arms', 'Core'];
  // const data2 = muscleGroups.map(muscleGroup => ({
  //   muscleGroup,
  //   exerciseCount: exercices.filter(exercice => exercice.muscleGroup === muscleGroup).length
  // }))

  

  const totalExercises = data.reduce((sum, item) => sum + item.exerciseCount, 0);

  const chartData = data.map(item => ({
    muscleGroup: item.muscleGroup,
    percentage: (item.exerciseCount / totalExercises) * 100
  }));

  return (
    <div className="w-full h-[40vh]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="50%" data={chartData}>
          <PolarGrid  />
          <PolarAngleAxis dataKey="muscleGroup" />
          <Radar
            name="Muscle Group Distribution"
            dataKey="percentage"
            stroke="#8884d8"
            fill="#8885d8"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
      
    </div>
  );
};

export default MuscleGroupRadarChart;