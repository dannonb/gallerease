"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Button } from "../ui/button";

export default function DashboardNavbar() {
  const pathname = usePathname();
  const params = useParams();

  const determineLinkType = () => {
    switch (true) {
      case pathname.includes("overview"):
        return "overview";
      case pathname.includes("documentation"):
        return "documentation";
      case pathname.includes("settings"):
        return "settings";
      default:
        return "overview";
    }
  };

  const links = {
    overview: [
      {
        name: "Upload",
        href: "/overview/upload",
      },
      {
        name: "Images",
        href: "/overview/images",
      },
      {
        name: "Galleries",
        href: "/overview/galleries",
      },
      // {
      //   name: "Stats",
      //   href: "/overview/stats",
      // },
    ],
    documentation: [
      {
        name: "Uploads",
        href: "/documentation/uploading-images",
      },
      {
        name: "API",
        href: "/documentation/api",
      },
    ],
    settings: [
      // {
      //   name: "General",
      //   href: "/settings/general",
      // },
      // {
      //   name: "Access",
      //   href: "/settings/access",
      // },
      {
        name: "API Keys",
        href: "/settings/api-keys",
      },
      // {
      //   name: "Integrations",
      //   href: "/settings/integrations",
      // },
      {
        name: "Support",
        href: "/settings/support",
      },
      // {
      //   name: "Advanced",
      //   href: "/settings/advanced",
      // },
    ],
  };

  return (
    <nav className="flex overflow-x-auto md:overflow-hidden text-nowrap md:grid gap-3 text-sm no-scrollbar">
      {links[determineLinkType()].map((link, index) => {
        const isActive = pathname === `/dashboard/${params.siteId}${link.href}`;
        return (
          <Button 
            asChild 
            variant={isActive ? 'default' : 'ghost'} 
            size='sm' 
            key={link.href} 
            className={`
              min-w-fit justify-start transition-all duration-200 rounded-xl
              ${isActive 
                ? 'bg-primary text-primary-foreground shadow-soft' 
                : 'hover:bg-accent/50 text-muted-foreground hover:text-foreground'
              }
            `}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Link 
              href={`/dashboard/${params.siteId}${link.href}`} 
              className="w-full animate-slide-up"
            >
              {link.name}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}
