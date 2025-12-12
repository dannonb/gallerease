// import { getCheckoutSession, getUserTier } from "@/actions/payments";
import { auth } from "@/auth";
import { tierData } from '@/lib/constants'
import { Button } from "../ui/button";
import { Check, Star, Zap, Users } from "lucide-react";

export default async function Pricing() {
  const session = await auth();
  const userId = session?.user?.id;

  // const getNextPath = (priceId: string | null) => {
  //   if (!userId) {
  //     return '/sign-in?redirect="/pricing"';
  //   }
  //   return `/payments/checkout?id=${priceId}`
  // };

  const getPlanIcon = (label: string) => {
    switch (label) {
      case "Starter":
        return <Star className="w-6 h-6" />;
      case "Basic":
        return <Zap className="w-6 h-6" />;
      case "Company":
        return <Users className="w-6 h-6" />;
      default:
        return <Star className="w-6 h-6" />;
    }
  };

  const getPlanGradient = (label: string) => {
    switch (label) {
      case "Starter":
        return "from-slate-500 to-slate-700";
      case "Basic":
        return "from-indigo-500 to-purple-600";
      case "Company":
        return "from-purple-600 to-pink-600";
      default:
        return "from-indigo-500 to-purple-600";
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      <div className="py-16 px-6 mx-auto max-w-7xl lg:py-24">
        {/* Hero Section */}
        <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-20 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            💎 Simple Pricing
          </div>
          <h1 className="mb-6 text-5xl lg:text-6xl tracking-tight font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Designed for teams like yours
          </h1>
          <p className="mb-8 text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Choose the perfect plan for your needs. Start free and scale as you grow. All plans include our core features with no hidden fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
          {tierData.map((tier, index) => {
            const isPopular = tier.label === "Basic";
            return (
              <div 
                key={tier.priceId || tier.label} 
                className={`
                  relative group rounded-3xl border bg-card/50 backdrop-blur-sm p-8 shadow-soft hover:shadow-glow transition-all duration-300 hover:scale-105 animate-slide-up
                  ${isPopular ? 'ring-2 ring-primary/20 shadow-glow' : ''}
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-glow">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${getPlanGradient(tier.label)} text-white mb-4 shadow-glow`}>
                    {getPlanIcon(tier.label)}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{tier.label}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                      {tier.price}
                    </span>
                    {tier.price !== "Free" && (
                      <span className="text-muted-foreground ml-2">/month</span>
                    )}
                  </div>
                  {tier.price === "Free" && (
                    <p className="text-sm text-muted-foreground">Forever free</p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-muted-foreground leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  disabled={true}
                  variant={isPopular ? "gradient" : "outline"}
                  size="lg"
                  className="w-full"
                >
                  {tier.label !== "Starter" ? "Coming Soon" : "Current Plan"}
                </Button>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-2xl font-bold mb-4">Questions?</h3>
          <p className="text-muted-foreground mb-6">
            Need help choosing the right plan? We're here to help.
          </p>
          <Button variant="outline" size="lg">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
}