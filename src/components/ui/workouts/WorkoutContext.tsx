"use client"
import React, { createContext, useContext, useState } from 'react';
import { type ExerciseNames } from '~/lib/types';

type WorkoutDay = {
  id: number;
  type: 'workout' | 'rest';
  name: string;
  exercises?: Array<{
    id: number;
    name: string;
    sets: number;
    reps: number;
    isShown?: boolean;
  }>;
};

type WorkoutContextType = {
  workoutName: string;
  setWorkoutName: (name: string) => void;
  description: string;
  setDescription: (desc: string) => void;
  days: WorkoutDay[];
  setDays: (days: WorkoutDay[]) => void;
  addWorkoutDay: (name?:string) => number;
  addRestDay: () => void;
  AddExercises: (dayId: number,Exercises:{name:string,sets:number,reps:number}[]) => void;
  removeDay: (id: number) => void;
  updateDay: (id: number, updatedDay: Partial<WorkoutDay>) => void;
  exerciseNames: ExerciseNames;
  addExercise: (dayId: number, exercise: { name: string; sets: number; reps: number }) => void;
  removeExercise: (dayId: number, exerciseIndex: number) => void;
  updateExercise: (dayId: number,exerciseId:number,updatedExercise: Partial<{id:number, name: string; sets: number; reps: number }>) => void;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({
  children,
  exerciseNames
}: {
  children: React.ReactNode;
  exerciseNames: ExerciseNames;
}) {
  const [workoutName, setWorkoutName] = useState('');
  const [description, setDescription] = useState('');
  const [days, setDays] = useState<WorkoutDay[]>([]);

  const addWorkoutDay = (name?:string) => {
    const dayId = Date.now()
    setDays([...days, {
      id: dayId,
      type: 'workout',
      name: name ?? `Day ${days.length + 1}`,
      exercises: []
    }]);
    return dayId
  };

  const addRestDay = () => {
    setDays([...days, {
      id: Date.now(),
      type: 'rest',
      name: `Rest `
    }]);
  };
  const addExercise = (dayId: number, exercise: { name: string; sets: number; reps: number }) => {
    setDays(days.map(day =>
      day.id === dayId ? {...day, exercises: [...(day.exercises ?? []), {...exercise, id: Math.floor(Math.random() * 10000),isShown:false}]} : day
    ));
  };

  const removeDay = (id: number) => {
    setDays(days.filter(day => day.id !== id));
  };

  const updateDay = (id: number, updatedDay: Partial<WorkoutDay>) => {
    setDays(days.map(day => 
      day.id === id ? { ...day, ...updatedDay } : day
    ));
  };
  const removeExercise = (dayId: number, exerciseIndex: number) => {
    setDays(days.map(day =>
      day.id === dayId? {...day, exercises: day.exercises?.filter((_, index) => _.id !== exerciseIndex)} : day
    ));
  };
  const AddExercises = (dayId: number,Exercises:{name:string,sets:number,reps:number}[]) => {
    const newExercises = Exercises.map((exercise) => ({
      ...exercise,
      id: Math.floor(Math.random() * 10000),
    }))
    console.log(newExercises);
    setDays(days.map(day =>
      day.id === dayId? {...day, exercises: [...(day.exercises?? []), ...newExercises]} : day
    ));
  }

  const updateExercise = (dayId: number,exerciseId:number,updatedExercise: Partial<{id:number, name: string; sets: number; reps: number }>) => {
    setDays(days.map(day =>
      day.id === dayId? {...day, exercises: day.exercises?.map((exercise) =>
        exercise.id === exerciseId ? {...exercise, ...updatedExercise} : exercise
      )} : day
    ));  
  }

  return (
    <WorkoutContext.Provider
      value={{
        AddExercises,
        updateExercise,
        removeExercise,
        addExercise,
        workoutName,
        setWorkoutName,
        description,
        setDescription,
        days,
        setDays,
        addWorkoutDay,
        addRestDay,
        removeDay,
        updateDay,
        exerciseNames
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
}

export type {WorkoutDay}