"use client"
import React, { useMemo } from 'react'
import Container from './Container'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

// Add ChartTypeRegistry type
import type { ChartData, ChartOptions, TooltipItem } from 'chart.js';

type Props = {
  workoutDates: {
    date: Date;
  }[] | null | undefined
}

const ChartData = (props: Props) => {
  const chartData = useMemo(() => {
    if (!props.workoutDates || props.workoutDates.length === 0) {
      return {
        labels: [],
        datasets: [{
          data: [],
          borderColor: '#4e9750',
          backgroundColor: 'rgba(231, 243, 232, 0.5)',
          tension: 0.4,
          fill: true,
        }]
      }
    }

    // Sort dates and get first and last workout dates
    const sortedDates = [...props.workoutDates].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    const firstWorkoutDate = new Date(sortedDates[0]?.date ?? new Date());
    const lastWorkoutDate = new Date(sortedDates[sortedDates.length - 1]?.date ?? new Date());

    // Calculate number of weeks between first and last workout
    const totalDays = Math.ceil((lastWorkoutDate.getTime() - firstWorkoutDate.getTime()) / (1000 * 60 * 60 * 24));
    const numberOfWeeks = Math.max(Math.ceil(totalDays / 7), 1);

    // Generate weeks array
    const weeks: Date[] = [];
    const startDate = new Date(firstWorkoutDate);
    startDate.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < numberOfWeeks; i++) {
      const weekStart = new Date(startDate);
      weekStart.setDate(startDate.getDate() + (i * 7));
      weeks.push(weekStart);
    }

    const dateLabels = weeks.map((weekStart) => {
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { day: 'numeric' })}`;
    });

    const workoutCounts = new Array(numberOfWeeks).fill(0);
    
    props.workoutDates.forEach(({ date }) => {
      const workoutDate = new Date(date);
      
      for (let i = 0; i < numberOfWeeks; i++) {
        const weekStart = weeks[i] ? new Date(weeks[i] ?? "") : new Date();
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 7);
        
        if (workoutDate >= weekStart && workoutDate < weekEnd) {
          workoutCounts[i]++;
          break;
        }
      }
    });

    return {
      labels: dateLabels,
      datasets: [{
        data: workoutCounts,
        borderColor: '#4e9750',
        backgroundColor: 'rgba(231, 243, 232, 0.5)',
        tension: 0.4,
        fill: true,
      }]
    }
  }, [props.workoutDates]);

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#0e1b0e',
        bodyColor: '#4e9750',
        borderColor: '#d0e7d1',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          title: () => 'Workouts',
          label: (context: TooltipItem<'line'>) => {
            const value = context.raw as number;
            return `${value} workout${value !== 1 ? 's' : ''}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(208, 231, 209, 0.3)'
        },
        ticks: {
          precision: 0
        }
      }
    }
  };

  if (!props.workoutDates) {
    return (
      <Container className="space-y-2 w-full">
        <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#d0e7d1] p-6">
          <p>No workout data available</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="space-y-2 w-full">
      <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#d0e7d1] p-6">
        <p className="text-[#0e1b0e] dark:text-xtraDarkText text-base font-medium leading-normal">Workout frequency per week</p>
        <div className="flex min-h-[180px] flex-1 flex-col gap-8 py-4">
          <div 
            className="relative h-48 w-full" 
            role="img" 
            aria-label="Line chart showing workout frequency per week"
          >
            <Line 
              data={chartData} 
              options={chartOptions} 
              aria-label="Workout frequency chart"
            />
          </div>
          {/* Removed the duplicate date labels div */}
        </div>
      </div>
    </Container>
  );
}

export default ChartData