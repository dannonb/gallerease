import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  Image as ImageIcon, 
  Link2, 
  Shield, 
  Zap, 
  Users,
  Code,
  Palette,
  Globe
} from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Drag & Drop Upload",
    description: "Effortlessly upload multiple images with our intuitive drag-and-drop interface. Support for PNG, JPG, and JPEG formats.",
    badge: "Easy"
  },
  {
    icon: ImageIcon,
    title: "Smart Gallery Management",
    description: "Organize your images into galleries with custom metadata, descriptions, and tags for better organization.",
    badge: "Organized"
  },
  {
    icon: Link2,
    title: "Temporary Upload Links",
    description: "Generate secure, time-limited links for clients to upload images directly to your galleries without account access.",
    badge: "Secure"
  },
  {
    icon: Code,
    title: "REST API Integration",
    description: "Seamlessly integrate galleries into any website using our comprehensive REST API with detailed documentation.",
    badge: "Developer-Friendly"
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security with AWS S3 storage, CDN delivery, and robust authentication systems.",
    badge: "Trusted"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized image delivery through CloudFront CDN ensures your galleries load instantly worldwide.",
    badge: "Fast"
  },
  {
    icon: Users,
    title: "Client Collaboration",
    description: "Share galleries with clients, collect feedback, and manage approvals all in one streamlined workflow.",
    badge: "Collaborative"
  },
  {
    icon: Palette,
    title: "Customizable Display",
    description: "Flexible API responses allow you to display images exactly how you want on your client's website.",
    badge: "Flexible"
  },
  {
    icon: Globe,
    title: "Global CDN",
    description: "Images are delivered from the nearest edge location for optimal performance regardless of visitor location.",
    badge: "Global"
  }
];

export default function Features() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            ✨ Powerful Features
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Everything you need for gallery management
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From upload to delivery, we've built every feature with developers and their clients in mind.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="group hover:shadow-glow transition-all duration-300 hover:scale-105 animate-slide-up border-0 bg-card/50 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}