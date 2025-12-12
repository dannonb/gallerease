import { auth } from "@/auth";
import LandingHeading from "@/components/landing/landing-heading";
import Features from "@/components/landing/features";
import HowItWorks from "@/components/landing/how-it-works";
import Testimonials from "@/components/landing/testimonials";
import CTASection from "@/components/landing/cta-section";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session?.user?.id) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden flex items-center justify-center">
        {/* Modern Gradient Background */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 z-0" />
        
        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 z-10">
          {/* Large floating orb - top left */}
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-slate-400/20 to-slate-600/20 rounded-full blur-3xl animate-pulse" 
               style={{ animation: 'float 6s ease-in-out infinite' }} />
          
          {/* Medium orb - top right */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-r from-indigo-400/15 to-purple-400/15 rounded-full blur-2xl animate-pulse" 
               style={{ animation: 'float 8s ease-in-out infinite reverse', animationDelay: '2s' }} />
          
          {/* Small orb - bottom left */}
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-r from-indigo-300/10 to-purple-300/10 rounded-full blur-3xl animate-pulse" 
               style={{ animation: 'float 10s ease-in-out infinite', animationDelay: '4s' }} />
          
          {/* Accent orb - center right */}
          <div className="absolute top-1/2 -right-48 w-72 h-72 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse" 
               style={{ animation: 'float 7s ease-in-out infinite reverse', animationDelay: '1s' }} />
        </div>

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 z-10 opacity-30">
          {/* Cascading Grid Animation */}
          <div className="absolute inset-0 grid-cascade-container">
            {Array.from({ length: 25 }, (_, row) => (
              <div key={row} className="grid-row" style={{ '--row': row } as React.CSSProperties}>
                {Array.from({ length: 40 }, (_, col) => (
                  <div 
                    key={col} 
                    className="grid-square"
                    style={{ 
                      '--col': col,
                      '--delay': `${(row + col) * 0.08}s`
                    } as React.CSSProperties}
                  />
                ))}
              </div>
            ))}
          </div>
          
          {/* Diagonal Lines */}
          <div className="absolute top-0 left-0 w-full h-full"
               style={{
                 backgroundImage: `repeating-linear-gradient(
                   45deg,
                   transparent,
                   transparent 100px,
                   rgba(139, 92, 246, 0.05) 100px,
                   rgba(139, 92, 246, 0.05) 101px
                 )`
               }} />
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 z-10">
          {/* Floating squares with modern colors */}
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-gradient-to-r from-indigo-500/40 to-purple-500/40 rounded-lg rotate-45 animate-bounce" 
               style={{ animationDelay: '0s', animationDuration: '3s' }} />
          <div className="absolute top-3/4 left-3/4 w-6 h-6 bg-gradient-to-r from-slate-500/30 to-slate-700/30 rounded-lg rotate-12 animate-bounce" 
               style={{ animationDelay: '1s', animationDuration: '4s' }} />
          <div className="absolute top-1/2 left-1/6 w-3 h-3 bg-gradient-to-r from-purple-500/50 to-pink-500/50 rounded-full animate-bounce" 
               style={{ animationDelay: '2s', animationDuration: '5s' }} />
          
          {/* Floating circles with modern colors */}
          <div className="absolute top-1/3 right-1/4 w-8 h-8 border-2 border-indigo-400/30 rounded-full animate-spin" 
               style={{ animationDuration: '20s' }} />
          <div className="absolute bottom-1/3 left-1/3 w-12 h-12 border border-purple-400/20 rounded-full animate-spin" 
               style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
        </div>

        {/* Subtle Noise Texture Overlay */}
        <div className="absolute inset-0 z-10 opacity-[0.015] mix-blend-overlay"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
             }} />
        
        {/* Hero Content */}
        <div className="relative z-20 w-full">
          <LandingHeading />
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
