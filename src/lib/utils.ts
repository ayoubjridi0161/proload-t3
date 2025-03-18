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