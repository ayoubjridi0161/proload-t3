import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function removeRedundancy<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}
