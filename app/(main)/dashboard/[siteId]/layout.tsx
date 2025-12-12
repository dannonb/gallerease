import { auth } from "@/auth";
import { redirect } from "next/navigation";

import SiteSwitcher from "@/components/header/site-switcher";
import prisma from "@/lib/prisma";
import DashboardNavbar from "@/components/header/dashboard-navbar";
import Heading from "@/components/dashboard/heading";
import { EditImageModalProvider } from "@/providers/edit-image-modal-provider";

export default async function DashboardLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { siteId: string | null }
}>) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!session) {
    redirect("/api/auth/login?callbackUrl=/dashboard");
  }

  if (!params.siteId || params.siteId === 'null') {
    const site = await prisma.site.findFirst({
      where: {
        userId,
      }
    })

    if (!site) {
      redirect('/')
    }

    redirect(`/dashboard/${site.id}/overview/upload`)
  }

  const sites = await prisma.site.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="flex w-full min-h-[calc(100vh-4rem)] bg-gradient-to-br from-background via-background to-muted/10">
      <EditImageModalProvider />
      
      {/* Sidebar */}
      <div className="flex min-h-[calc(100vh-4rem)] flex-col gap-6 bg-card/50 backdrop-blur-sm border-r p-6 md:w-96 w-full md:max-w-96 shadow-soft overflow-hidden">
        <div className="space-y-6 min-w-0">
          <div className="animate-slide-up">
            <SiteSwitcher items={sites} />
          </div>
          <div className="animate-slide-up min-w-0" style={{ animationDelay: '0.1s' }}>
            <Heading />
          </div>
        </div>
        
        <div className="flex-1 animate-slide-up min-w-0" style={{ animationDelay: '0.2s' }}>
          <DashboardNavbar />
        </div>
        
        {/* Mobile Content */}
        <div className="grid gap-6 md:hidden animate-fade-in">
          {children}
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="hidden w-full p-8 md:block flex-1">
        <div className="grid gap-8 animate-fade-in max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
