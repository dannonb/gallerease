import { getApiKey } from "@/actions/api-keys";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ApiAlert } from "@/components/ui/api-alert";
import { Key, Shield, Code, AlertTriangle, Info, ExternalLink } from "lucide-react";
import ApiKeyButtons from "./api-key-buttons";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function APIKeysPage({
  params,
  session,
}: {
  params: any;
  session: any;
}) {
  const userId = session?.user?.id;
  const siteId = params?.siteId;

  if (!userId || !siteId) {
    return <div>Loading...</div>;
  }

  const key = await getApiKey(siteId);

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

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white">
            <Key className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              API Keys
            </h1>
            <p className="text-muted-foreground">
              Manage your API keys for secure access to your galleries
            </p>
          </div>
        </div>
      </div>

      {/* Current API Key Status */}
      <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>API Key Status</span>
            </div>
            <Badge variant={key ? "success" : "secondary"}>
              {key ? "Active" : "No Key"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Current API Key</h3>
              <p className="text-sm text-muted-foreground">
                {key ? "Your API key is active and ready to use" : "No API key has been generated yet"}
              </p>
            </div>
          </div>

          <ApiKeyButtons siteId={siteId} userId={userId} apikey={key || ""} />

          {key && (
            <div className="space-y-4">
              <Separator />
              <ApiAlert
                title="Your API Key"
                description={key}
                variant="secret"
              />
            </div>
          )}

          {!key && (
            <InfoBox type="info" title="Get Started" icon={Info}>
              Generate your first API key to start integrating Gallerease with your applications. 
              API keys provide secure access to your galleries and images.
            </InfoBox>
          )}
        </CardContent>
      </Card>

      {/* Security Best Practices */}
      <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Security Best Practices</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-green-600">✅ Do</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Store API keys securely in environment variables</li>
                <li>• Use HTTPS for all API requests</li>
                <li>• Regenerate keys if compromised</li>
                <li>• Monitor API usage regularly</li>
                <li>• Use different keys for different environments</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-red-600">❌ Don't</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Commit API keys to version control</li>
                <li>• Share keys in public forums or chat</li>
                <li>• Use keys in client-side JavaScript</li>
                <li>• Leave unused keys active</li>
                <li>• Use the same key across multiple projects</li>
              </ul>
            </div>
          </div>

          <InfoBox type="warning" title="Important Security Note" icon={AlertTriangle}>
            API keys provide full access to your galleries. Treat them like passwords and never expose them in client-side code or public repositories.
          </InfoBox>
        </CardContent>
      </Card>

      {/* Usage Examples */}
      <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code className="w-5 h-5" />
            <span>Usage Examples</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Here's how to use your API key in different environments:
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Environment Variables</h4>
              <pre className="bg-card border rounded-xl p-4 text-sm overflow-x-auto">
                <code>{`# .env file
GALLEREASE_API_KEY=${key || 'your_api_key_here'}
GALLEREASE_SITE_ID=${siteId}`}</code>
              </pre>
            </div>

            <div>
              <h4 className="font-medium mb-2">JavaScript/Node.js</h4>
              <pre className="bg-card border rounded-xl p-4 text-sm overflow-x-auto">
                <code>{`const response = await fetch('${typeof window !== 'undefined' ? window.location.origin : 'https://gallerease.dev'}/api/${siteId}/galleries', {
  headers: {
    'x-api-key': process.env.GALLEREASE_API_KEY,
    'Content-Type': 'application/json'
  }
});`}</code>
              </pre>
            </div>

            <div>
              <h4 className="font-medium mb-2">cURL</h4>
              <pre className="bg-card border rounded-xl p-4 text-sm overflow-x-auto">
                <code>{`curl -H "x-api-key: ${key || 'your_api_key_here'}" \\
     -H "Content-Type: application/json" \\
     ${typeof window !== 'undefined' ? window.location.origin : 'https://gallerease.dev'}/api/${siteId}/galleries`}</code>
              </pre>
            </div>
          </div>

          <div className="flex items-center space-x-4 pt-4">
            <Button asChild variant="outline">
              <Link href={`/dashboard/${siteId}/documentation/api`}>
                <ExternalLink className="w-4 h-4 mr-2" />
                View Full API Documentation
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Rate Limits & Quotas */}
      <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-soft">
        <CardHeader>
          <CardTitle>Rate Limits & Quotas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/30 rounded-xl text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">1,000</div>
              <div className="text-sm text-muted-foreground">Requests per hour</div>
              <div className="text-xs text-muted-foreground mt-1">Free tier</div>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-xl text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">10,000</div>
              <div className="text-sm text-muted-foreground">Requests per hour</div>
              <div className="text-xs text-muted-foreground mt-1">Paid plans</div>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-xl text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime SLA</div>
              <div className="text-xs text-muted-foreground mt-1">All plans</div>
            </div>
          </div>

          <InfoBox type="info" title="Rate Limit Headers" icon={Info}>
            All API responses include rate limit headers: <code>X-RateLimit-Limit</code>, <code>X-RateLimit-Remaining</code>, and <code>X-RateLimit-Reset</code> to help you manage your usage.
          </InfoBox>
        </CardContent>
      </Card>
    </div>
  );
}