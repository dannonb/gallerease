'use client'

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSiteParams } from "@/hooks/use-site-params";

import { CircleUser, Settings, HelpCircle, LogOut } from "lucide-react";

const handleSignout = async () => {
    signOut({
        callbackUrl: '/'
    })
}

export default function UserDropdown() {
    const router = useRouter();
    const { lastActiveSite } = useSiteParams();

    const handleSettingsClick = () => {
        router.push('/profile');
    };

    const handleSupportClick = () => {
        if (lastActiveSite) {
            router.push(`/dashboard/${lastActiveSite}/settings/support`);
        } else {
            // Fallback to general support page if no active site
            router.push('/contact');
        }
    };

    return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-[999]">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSettingsClick} className="cursor-pointer">
              <Settings className="w-4 h-4 mr-2" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSupportClick} className="cursor-pointer">
              <HelpCircle className="w-4 h-4 mr-2" />
              Support
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignout} className="cursor-pointer">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    )
}