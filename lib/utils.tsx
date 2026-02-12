import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// lib/storage.ts
export const getLocalStorage = (key: string) => {
  if (typeof window === "undefined") {
    return null; // ✅ Return null on server
  }
  return localStorage.getItem(key);
};

export const setLocalStorage = (key: string, value: string) => {
  if (typeof window === "undefined") {
    return; // ✅ Don't run on server
  }
  localStorage.setItem(key, value);
};
