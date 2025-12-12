import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function newAPIKey(){
  return "sk_gal_" + crypto.randomUUID().replaceAll("-", "")
}
