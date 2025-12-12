"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSiteParams } from "@/hooks/use-site-params";
import { Loader2 } from "lucide-react";

export default function DashboardRedirectPage() {
  const router = useRouter();
  const { lastActiveSite } = useSiteParams();

  useEffect(() => {
    if (lastActiveSite) {
      // Redirect to the last active site's overview page
      router.replace(`/dashboard/${lastActiveSite}/overview/upload`);
    } else {
      // No active site, redirect to setup page to create/select a site
      router.replace('/dashboard/(setup)');
    }
  }, [lastActiveSite, router]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}