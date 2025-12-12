'use client'

import { usePathname } from "next/navigation"

export default function Heading() {
    const pathname = usePathname()

    const getHeading = () => {
        switch (true) {
            case pathname.includes('overview'):
                return 'Overview'
            case pathname.includes('documentation'):
                return 'Documentation'
            case pathname.includes('settings'):
                return 'Settings'
            default: 
                'Dashboard'
        }
    }
    const heading = getHeading();
    const isLongHeading = heading && heading.length > 8;
    
    return (
        <div className="hidden md:flex flex-col space-y-2 animate-slide-up min-w-0">
            <h1 className={`font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight break-words ${
                isLongHeading ? 'text-3xl' : 'text-4xl'
            }`}>
                {heading}
            </h1>
            <div className="h-1 w-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
        </div>
    )
}