import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Users, 
  Globe, 
  Plus,
  Trash2,
  Copy,
  ExternalLink,
  AlertTriangle,
  Info,
  Clock
} from "lucide-react";

export default function AccessPage() {
  const corsOrigins = [
    { id: 1, origin: "https://mywebsite.com", status: "active", added: "2024-01-15" },
    { id: 2, origin: "https://staging.mywebsite.com", status: "active", added: "2024-01-20" },
    { id: 3, origin: "http://localhost:3000", status: "development", added: "2024-01-25" }
  ];

  const InfoBox = ({ 
    type = "info", 
    title, 
    children,
    icon: Icon = Info
  }: { 
    type?: "info" | "warning" | "success"; 
    title: string; 
    children: React.ReactNode;
    icon?: any;
  }) => {
    const styles = {
      info: { bg: "bg-blue-50 dark:bg-blue-950/30", border: "border-blue-200 dark:border-blue-800", iconColor: "text-blue-600" },
      warning: { bg: "bg-yellow-50 dark:bg-yellow-950/30", border: "border-yellow-200 dark:border-yellow-800", iconColor: "text-yellow-600" },
      success: { bg: "bg-green-50 dark:bg-green-950/30", border: "border-green-200 dark:border-green-800", iconColor: "text-green-600" }
    };
    
    const style = styles[type];

    return (
      <div className={`p-4 rounded-xl border ${style.bg} ${style.border}`}>
        <div className="flex items-start space-x-3">
          <Icon className={`w-5 h-5 mt-0.5 ${style.iconColor}`} />
          <div>
            <h4 className="font-medium mb-1">{title}</h4>
            <div className="text-sm text-muted-foreground">{children}</div>
          </div>
        </div>
      </div>
    );
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const variants = {
      active: { variant: "success" as const, text: "Active" },
      development: { variant: "secondary" as const, text: "Development" },
      expired: { variant: "destructive" as const, text: "Expired" }
    };
    
    const config = variants[status as keyof typeof variants] || variants.active;
    
    return <Badge variant={config.variant}>{config.text}</Badge>;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Access & Security
            </h1>
            <p className="text-muted-foreground">
              Manage permissions, CORS settings, and access controls
            </p>
          </div>
        </div>
      </div>

      {/* CORS Origins */}
      <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-soft">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>CORS Origins</span>
            </CardTitle>
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Origin
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Configure which domains can access your API from web browsers.
          </p>

          <div className="space-y-3">
            {corsOrigins.map((origin) => (
              <div key={origin.id} className="flex items-center justify-between p-4 border rounded-xl bg-muted/20">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <code className="text-sm bg-muted px-2 py-1 rounded">{origin.origin}</code>
                    <StatusBadge status={origin.status} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Added {new Date(origin.added).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="ghost">
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <InfoBox type="warning" title="Development vs Production" icon={AlertTriangle}>
            Use http://localhost:* for development only. Always use HTTPS origins for production.
          </InfoBox>
        </CardContent>
      </Card>

      {/* Access Logs */}
      <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Recent Access Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: "2 minutes ago", action: "API request", ip: "192.168.1.100", endpoint: "/galleries" },
              { time: "15 minutes ago", action: "Image upload", ip: "10.0.0.50", endpoint: "/upload" },
              { time: "1 hour ago", action: "API request", ip: "192.168.1.100", endpoint: "/images/123" }
            ].map((log, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <div>
                    <div className="text-sm font-medium">{log.action}</div>
                    <div className="text-xs text-muted-foreground">{log.endpoint}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">{log.time}</div>
                  <div className="text-xs text-muted-foreground">{log.ip}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}