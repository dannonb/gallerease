import Header from "@/components/header/header";
import { Analytics } from "@vercel/analytics/next"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20">
      <Analytics />
      <Header />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
