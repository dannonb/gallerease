import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Freelance Web Developer",
    avatar: "/avatars/sarah.jpg",
    initials: "SC",
    content: "Gallerease has completely transformed how I handle client galleries. The API integration is seamless, and my clients love the temporary upload links. It's saved me countless hours!",
    rating: 5
  },
  {
    name: "Marcus Rodriguez", 
    role: "Agency Owner",
    avatar: "/avatars/marcus.jpg",
    initials: "MR",
    content: "We've been using Gallerease for all our client projects. The CDN delivery is lightning fast, and the developer experience is top-notch. Highly recommended for any web agency.",
    rating: 5
  },
  {
    name: "Emily Watson",
    role: "Full-Stack Developer",
    avatar: "/avatars/emily.jpg", 
    initials: "EW",
    content: "The documentation is excellent and the API is so well designed. I was able to integrate it into my React app in under an hour. The client collaboration features are a game-changer.",
    rating: 5
  },
  {
    name: "David Kim",
    role: "Photography Studio",
    avatar: "/avatars/david.jpg",
    initials: "DK", 
    content: "As a photographer working with web developers, Gallerease bridges the gap perfectly. My developers can easily integrate my work, and I can manage everything from one dashboard.",
    rating: 5
  },
  {
    name: "Lisa Thompson",
    role: "Digital Marketing Agency",
    avatar: "/avatars/lisa.jpg",
    initials: "LT",
    content: "The temporary upload links have revolutionized our client workflow. Clients can upload assets directly without needing accounts, and everything stays organized automatically.",
    rating: 5
  },
  {
    name: "Alex Johnson",
    role: "Startup CTO",
    avatar: "/avatars/alex.jpg",
    initials: "AJ",
    content: "Scalable, reliable, and developer-friendly. Gallerease handles our image management so we can focus on building our core product. The pricing is fair and transparent.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            💬 What Developers Say
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Trusted by developers worldwide
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join thousands of developers who have streamlined their gallery management workflow with Gallerease.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.name}
              className="group hover:shadow-glow transition-all duration-300 hover:scale-105 animate-slide-up border-0 bg-card/50 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-4 sm:p-6 lg:p-8">
                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-muted-foreground leading-relaxed mb-6">
                  &quot;{testimonial.content}&quot;
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-gradient-to-br from-slate-600 to-slate-800 text-white font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent mb-2">
              10,000+
            </div>
            <div className="text-muted-foreground">Images Delivered Daily</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent mb-2">
              500+
            </div>
            <div className="text-muted-foreground">Active Developers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              99.9%
            </div>
            <div className="text-muted-foreground">Uptime Guarantee</div>
          </div>
        </div>
      </div>
    </section>
  );
}