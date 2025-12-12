import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Upload, Settings, Code, Rocket } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload & Organize",
    description: "Create galleries and upload images with our intuitive interface. Add metadata, descriptions, and organize everything perfectly.",
    color: "from-slate-500 to-slate-700"
  },
  {
    number: "02", 
    icon: Settings,
    title: "Configure & Manage",
    description: "Set up API keys, configure gallery settings, and create temporary upload links for client collaboration.",
    color: "from-indigo-500 to-indigo-700"
  },
  {
    number: "03",
    icon: Code,
    title: "Integrate with API",
    description: "Use our REST API to seamlessly integrate galleries into any website. Full documentation and examples provided.",
    color: "from-purple-500 to-purple-700"
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch & Scale",
    description: "Go live with lightning-fast image delivery via global CDN. Scale effortlessly as your client base grows.",
    color: "from-indigo-600 to-purple-600"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-muted/20 to-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            🚀 Simple Process
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            How Gallerease Works
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get up and running in minutes with our streamlined workflow designed for developers.
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className="flex items-start space-x-4 sm:space-x-6 animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Step Number & Icon */}
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center text-white shadow-glow relative`}>
                    <step.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                    <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-background border-2 border-primary rounded-full flex items-center justify-center text-xs font-bold text-primary">
                      {step.number}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Visual Representation */}
          <div className="relative animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Card className="p-8 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-0 shadow-2xl">
              <CardContent className="p-0">
                <div className="space-y-6">
                  {/* Mock Interface */}
                  <div className="bg-muted/50 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-gradient-to-r from-blue-200 to-purple-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gradient-to-r from-purple-200 to-pink-200 rounded w-1/2"></div>
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 rounded"></div>
                        <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-200 rounded"></div>
                        <div className="aspect-square bg-gradient-to-br from-pink-100 to-pink-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* API Code Preview */}
                  <div className="bg-slate-900 rounded-xl p-4 text-green-400 font-mono text-sm">
                    <div className="text-slate-400 mb-2">{/* API Integration */}</div>
                    <div>GET /api/galleries/123/images</div>
                    <div className="text-slate-500">→ Returns optimized image URLs</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <Button asChild size="lg" variant="gradient" className="shadow-glow">
            <Link href="/getting-started">
              Get Started Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}