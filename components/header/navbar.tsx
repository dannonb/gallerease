"use client";

import Link from "next/link";
import { Menu, Image as ImageIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

import { usePathname, useParams } from "next/navigation";
import { useEffect, useCallback, useState } from "react";
import { useSiteParams } from "@/hooks/use-site-params";
import Image from "next/image";

interface NavbarProps {
  isLoggedIn: boolean;
}

export default function Navbar({ isLoggedIn }: NavbarProps) {
  const pathname = usePathname();
  const params = useParams();
  const [isLoadingSite, setIsLoadingSite] = useState(false);

  const { lastActiveSite, setLastActiveSite } = useSiteParams((state) => state);

  const handleCurrentSite = useCallback(async () => {
    if (isLoggedIn) {
      const siteParam = params.siteId

      if (siteParam && siteParam !== null && siteParam !== lastActiveSite) {
        const param = typeof siteParam === "string" ? siteParam : siteParam[0]
        setLastActiveSite(param)
      } else if (!lastActiveSite && !siteParam && !isLoadingSite) {
        // If no active site is stored and we're not on a site page, fetch the first site
        setIsLoadingSite(true);
        try {
          const response = await fetch('/api/user/sites');
          if (response.ok) {
            const sites = await response.json();
            if (sites.length > 0) {
              setLastActiveSite(sites[0].id);
            }
          }
        } catch (error) {
          console.error('Failed to fetch user sites:', error);
        } finally {
          setIsLoadingSite(false);
        }
      }

    } else {
      setLastActiveSite(null)
    }
  }, [isLoggedIn, params.siteId, lastActiveSite, setLastActiveSite, isLoadingSite]);

  useEffect(() => {
    handleCurrentSite()
  }, [handleCurrentSite]);

  // Use lastActiveSite from store if no siteId in current URL (e.g., on profile page)
  const currentSiteId = params.siteId || lastActiveSite;
  
  const dashboardLinks = (currentSiteId && !isLoadingSite) ? [
    {
      name: "Overview",
      href: `/dashboard/${currentSiteId}/overview/upload`,
    },
    {
      name: "Documentation",
      href: `/dashboard/${currentSiteId}/documentation/uploading-images`,
    },
    {
      name: "Settings",
      href: `/dashboard/${currentSiteId}/settings/api-keys`,
    },
  ] : isLoadingSite ? [
    {
      name: "Loading...",
      href: "#",
    },
  ] : [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
  ];

  const landingLinks = [
    {
      name: "Getting Started",
      href: "/getting-started",
    },
    {
      name: "Pricing",
      href: "/pricing",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];

  const links = isLoggedIn ? dashboardLinks : landingLinks;

  return (
    <div className="w-full">
      <nav className="hidden flex-col gap-8 text-lg font-medium md:flex md:flex-row md:items-center md:gap-6 md:text-sm lg:gap-8">
        <Link
          href={isLoggedIn ? "/dashboard" : "/"}
          className="flex items-center text-lg font-semibold md:text-base transition-all duration-300 hover:scale-105 group"
        >
          <span className="font-bold text-xl bg-gradient-to-r from-slate-900 to-indigo-900 dark:from-slate-100 dark:to-indigo-100 text-transparent bg-clip-text">
            Gallerease
          </span>
        </Link>
        <div className="flex items-center gap-6 lg:gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-3 py-2 rounded-lg transition-all duration-200 hover:bg-accent/50",
                pathname === link.href
                  ? "text-primary font-medium bg-accent/30"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.name}
              {pathname === link.href && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </div>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden rounded-xl">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="z-[999] w-80">
          <nav className="grid gap-8 text-lg font-medium pt-8">
            <SheetClose asChild>
              <Link
                href={isLoggedIn ? "/dashboard" : "/"}
                className="flex items-center text-lg font-semibold pb-4 border-b"
              >
                <span className="font-bold text-xl bg-gradient-to-r from-slate-900 to-indigo-900 dark:from-slate-100 dark:to-indigo-100 text-transparent bg-clip-text">
                  Gallerease
                </span>
              </Link>
            </SheetClose>
            {links.map((link) => (
              <SheetClose key={link.href} asChild>
                <Link
                  href={link.href}
                  className={cn(
                    "px-4 py-3 rounded-xl transition-all duration-200 hover:bg-accent",
                    pathname === link.href
                      ? "text-primary font-medium bg-accent"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.name}
                </Link>
              </SheetClose>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
