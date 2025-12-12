import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-muted/20 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-slate-400/5 to-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <Card className="border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm shadow-2xl overflow-hidden">
          <CardContent className="p-12 lg:p-16 text-center">
            {/* Header */}
            <div className="animate-fade-in mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600/90 to-purple-600/90 text-white text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Ready to Get Started?
              </div>
              <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Start building better galleries today
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Join thousands of developers who trust Gallerease for their image management needs. 
                Get started for free and scale as you grow.
              </p>
            </div>

            {/* Features Highlight */}
            <div className="grid md:grid-cols-3 gap-6 mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-center space-x-3 p-4 rounded-2xl bg-muted/30">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl flex items-center justify-center text-white">
                  <Zap className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Free to Start</div>
                  <div className="text-sm text-muted-foreground">No credit card required</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3 p-4 rounded-2xl bg-muted/30">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Enterprise Security</div>
                  <div className="text-sm text-muted-foreground">AWS S3 & CloudFront</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3 p-4 rounded-2xl bg-muted/30">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Developer First</div>
                  <div className="text-sm text-muted-foreground">Built by developers</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Button asChild size="lg" variant="gradient" className="shadow-glow px-8">
                <Link href="/auth/login">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/getting-started">
                  View Documentation
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-border/50 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <p className="text-sm text-muted-foreground mb-4">Trusted by developers at</p>
              <div className="flex items-center justify-center space-x-8 opacity-60">
                <div className="text-lg font-semibold">Startup Inc.</div>
                <div className="text-lg font-semibold">Design Co.</div>
                <div className="text-lg font-semibold">Dev Agency</div>
                <div className="text-lg font-semibold">Photo Studio</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}