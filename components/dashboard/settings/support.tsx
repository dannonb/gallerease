import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Mail, 
  Book, 
  ExternalLink, 
  Clock, 
  CheckCircle,
  AlertCircle,
  HelpCircle,
  FileText,
  Video,
  Users
} from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";

export default function SupportPage() {
  const supportChannels = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "9 AM - 5 PM EST",
      responseTime: "< 5 minutes",
      status: "online",
      action: "Start Chat",
      href: "#"
    },
    {
      icon: Mail,
      title: "Email Support", 
      description: "Send us a detailed message about your issue",
      availability: "24/7",
      responseTime: "< 4 hours",
      status: "available",
      action: "Send Email",
      href: "mailto:support@gallerease.dev"
    },
    {
      icon: Book,
      title: "Documentation",
      description: "Browse our comprehensive guides and API docs",
      availability: "Always available",
      responseTime: "Instant",
      status: "available", 
      action: "Browse Docs",
      href: "/dashboard/documentation/uploading-images"
    }
  ];

  const resources = [
    {
      icon: FileText,
      title: "Getting Started Guide",
      description: "Step-by-step instructions to set up your first gallery",
      href: "/getting-started"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Watch detailed walkthroughs of key features",
      href: "#"
    },
    {
      icon: Users,
      title: "Community Forum",
      description: "Connect with other developers and share tips",
      href: "#"
    },
    {
      icon: HelpCircle,
      title: "FAQ",
      description: "Find answers to commonly asked questions",
      href: "#"
    }
  ];

  const commonIssues = [
    {
      title: "API Authentication Issues",
      description: "Problems with API key authentication or permissions",
      solution: "Check that your API key is correctly set in the x-api-key header and hasn't expired.",
      severity: "high"
    },
    {
      title: "Image Upload Failures",
      description: "Images not uploading or processing correctly",
      solution: "Verify file size (max 10MB), format (JPG/PNG/WebP), and internet connection stability.",
      severity: "medium"
    },
    {
      title: "CDN Delivery Delays",
      description: "Images taking time to appear or load slowly",
      solution: "CDN propagation can take up to 5 minutes. Clear browser cache and try again.",
      severity: "low"
    },
    {
      title: "Gallery Integration Issues",
      description: "Problems integrating galleries into websites",
      solution: "Review API documentation and ensure correct endpoint URLs and parameters.",
      severity: "medium"
    }
  ];

  const StatusBadge = ({ status }: { status: string }) => {
    const variants = {
      online: { variant: "default" as const, text: "Online" },
      available: { variant: "secondary" as const, text: "Available" },
      offline: { variant: "destructive" as const, text: "Offline" }
    };
    
    const config = variants[status as keyof typeof variants] || variants.available;
    
    return <Badge variant={config.variant}>{config.text}</Badge>;
  };

  const SeverityBadge = ({ severity }: { severity: string }) => {
    const variants = {
      high: { variant: "destructive" as const, text: "High Priority" },
      medium: { variant: "secondary" as const, text: "Medium" },
      low: { variant: "outline" as const, text: "Low Priority" }
    };
    
    const config = variants[severity as keyof typeof variants] || variants.medium;
    
    return <Badge variant={config.variant}>{config.text}</Badge>;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white">
            <MessageCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Support Center
            </h1>
            <p className="text-muted-foreground">
              Get help when you need it with our comprehensive support options
            </p>
          </div>
        </div>
      </div>

      {/* Support Channels */}
      <div className="grid md:grid-cols-3 gap-6">
        {supportChannels.map((channel, index) => (
          <Card 
            key={channel.title}
            className="border-0 bg-card/50 backdrop-blur-sm shadow-soft hover:shadow-glow transition-all duration-300 hover:scale-105 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl flex items-center justify-center text-white">
                    <channel.icon className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-lg">{channel.title}</CardTitle>
                </div>
                <StatusBadge status={channel.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm">
                {channel.description}
              </p>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{channel.availability}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-muted-foreground">Response: {channel.responseTime}</span>
                </div>
              </div>

              <Button asChild className="w-full" variant={channel.status === 'online' ? 'gradient' : 'outline'}>
                <Link href={channel.href}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {channel.action}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Form */}
      <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="w-5 h-5" />
            <span>Send us a Message</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Can&apos;t find what you&apos;re looking for? Send us a detailed message and we&apos;ll get back to you as soon as possible.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Average response time: 4 hours</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">24/7 email support</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm">Expert technical assistance</span>
                </div>
              </div>
            </div>
            
            <ContactForm />
          </div>
        </CardContent>
      </Card>

      {/* Resources */}
      <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-soft">
        <CardHeader>
          <CardTitle>Helpful Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {resources.map((resource, index) => (
              <Link 
                key={resource.title}
                href={resource.href}
                className="flex items-center space-x-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <resource.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium group-hover:text-primary transition-colors">{resource.title}</h4>
                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Common Issues */}
      <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5" />
            <span>Common Issues & Solutions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {commonIssues.map((issue, index) => (
              <div 
                key={issue.title}
                className="p-4 border rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium">{issue.title}</h4>
                  <SeverityBadge severity={issue.severity} />
                </div>
                <p className="text-sm text-muted-foreground mb-3">{issue.description}</p>
                <div className="p-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-medium text-green-800 dark:text-green-200">Solution</h5>
                      <p className="text-sm text-green-700 dark:text-green-300">{issue.solution}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card className="border-0 bg-gradient-to-r from-green-500/10 to-emerald-600/10 border-green-200 dark:border-green-800 shadow-soft">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <h3 className="text-2xl font-bold">All Systems Operational</h3>
          </div>
          <p className="text-muted-foreground mb-6">
            All Gallerease services are running smoothly. Check our status page for real-time updates.
          </p>
          <Button asChild variant="outline" size="lg">
            <Link href="#">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Status Page
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}