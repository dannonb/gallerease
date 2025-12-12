import { cn } from "@/lib/utils"

interface LoadingProps {
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "spinner" | "dots" | "pulse"
}

export function Loading({ className, size = "md", variant = "spinner" }: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  }

  if (variant === "spinner") {
    return (
      <div className={cn("animate-spin", sizeClasses[size], className)}>
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    )
  }

  if (variant === "dots") {
    return (
      <div className={cn("flex space-x-1", className)}>
        <div className={cn("bg-current rounded-full animate-pulse", sizeClasses[size])} />
        <div className={cn("bg-current rounded-full animate-pulse", sizeClasses[size])} style={{ animationDelay: "0.2s" }} />
        <div className={cn("bg-current rounded-full animate-pulse", sizeClasses[size])} style={{ animationDelay: "0.4s" }} />
      </div>
    )
  }

  if (variant === "pulse") {
    return (
      <div className={cn("bg-current rounded-full animate-pulse", sizeClasses[size], className)} />
    )
  }

  return null
}

export function LoadingScreen({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <Loading size="lg" />
      <p className="text-muted-foreground animate-pulse">{message}</p>
    </div>
  )
}