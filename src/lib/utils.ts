import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function removeRedundancy<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}
export function timeAgo(timestamp: Date): string {
  const now = new Date();
  const past = timestamp;
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const intervals: Record<string, number> = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const interval in intervals) {
    const intervalValue = intervals[interval];
    if (intervalValue !== undefined) {
      const value = Math.floor(diffInSeconds / intervalValue);
      if (value >= 1) {
        return `${value} ${interval}${value > 1 ? 's' : ''} ago`;
      }
    }
  }

  return 'just now';
}


      export const mainMuscleGroups = ['chest', 'shoulder', 'arms', 'legs', 'core', 'back', 'other']; // Added 'other' for unmapped groups

      // Helper function to map specific muscle groups to main ones
      export const mapToMainMuscleGroup = (specificGroup: string | undefined): string => {
        if (!specificGroup) return 'other';
        const lowerCaseGroup = specificGroup.toLowerCase();
        if (lowerCaseGroup.includes('chest')) return 'chest';
        if (lowerCaseGroup.includes('shoulder') || lowerCaseGroup.includes('deltoid')) return 'shoulder';
        if (lowerCaseGroup.includes('arm') || lowerCaseGroup.includes('bicep') || lowerCaseGroup.includes('tricep') || lowerCaseGroup.includes('forearm')) return 'arms';
        if (lowerCaseGroup.includes('leg') || lowerCaseGroup.includes('quad') || lowerCaseGroup.includes('hamstring') || lowerCaseGroup.includes('glute') || lowerCaseGroup.includes('calf')) return 'legs';
        if (lowerCaseGroup.includes('core') || lowerCaseGroup.includes('ab') || lowerCaseGroup.includes('oblique')) return 'core';
        if (lowerCaseGroup.includes('back') || lowerCaseGroup.includes('lat') || lowerCaseGroup.includes('trap') || lowerCaseGroup.includes('rhomboid')) return 'back';
        return 'other'; // Default category if no match
      };


      interface Exercise {
        name: string;
        reps: number;
        sets: number;
    }
    
    interface PromptAnalysis {
        targetMuscle?: string;
        excludedExercises: string[];
        requiredRepRange?: [number, number];
        requiredSetRange?: [number, number];
    }

export function stringToAscii(input: string): number {
  return parseInt(input
    .split('')
    .map(char => char.charCodeAt(0))
    .join(' '))
}
    
  