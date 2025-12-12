import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  Globe, 
  Image as ImageIcon, 
  Trash2, 
  Save,
  AlertTriangle,
  Info,
  Calendar,
  Database,
  Users
} from "lucide-react";
import prisma from "@/lib/prisma";

export default async function GeneralSiteSettingsPage({
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

  // Get site data with statistics
  const site = await prisma.site.findUnique({
    where: { id: siteId },
    include: {
      galleries: {
        include: {
          images: true
        }
      }
    }
  });

  if (!site || site.userId !== userId) {
    return <div>Site not found</div>;
  }

  const totalImages = site.galleries.reduce((acc, gallery) => acc + gallery.images.length, 0);
  const totalGalleries = site.galleries.length;

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
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              General Settings
            </h1>
            <p className="text-muted-foreground">
              Manage your site configuration and preferences
            </p>
          </div>
        </div>
      </div>

      {/* Site Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl flex items-center justify-center text-white">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalImages}</div>
                <div className="text-sm text-muted-foreground">Total Images</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalGalleries}</div>
                <div className="text-sm text-muted-foreground">Galleries</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {Math.floor((Date.now() - new Date(site.createdAt).getTime()) / (1000 * 60 * 60 * 24))}
                </div>
                <div className="text-sm text-muted-foreground">Days Active</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Site Information */}
      <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Site Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Site Name</label>
              <Input 
                defaultValue={site.name} 
                placeholder="Enter site name"
                className="bg-background/50"
              />
              <p className="text-xs text-muted-foreground">
                This name helps you identify your site in the dashboard
              </p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Site ID</label>
              <div className="flex items-center space-x-2">
                <Input 
                  value={site.id} 
                  readOnly
                  className="bg-muted/50 text-muted-foreground"
                />
                <Badge variant="secondary">Read-only</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Used in API calls and cannot be changed
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea 
              defaultValue={site.description || ""} 
              placeholder="Describe your site or project"
              className="bg-background/50 min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground">
              Optional description to help you remember what this site is for
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Button size="lg" variant="gradient" className="shadow-glow">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <Button size="lg" variant="outline">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Site Statistics */}
      <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-soft">
        <CardHeader>
          <CardTitle>Site Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Gallery Breakdown</h4>
              {site.galleries.length > 0 ? (
                <div className="space-y-3">
                  {site.galleries.slice(0, 5).map((gallery) => (
                    <div key={gallery.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <div className="font-medium">{gallery.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Created {new Date(gallery.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <Badge variant="secondary">{gallery.images.length} images</Badge>
                    </div>
                  ))}
                  {site.galleries.length > 5 && (
                    <p className="text-sm text-muted-foreground">
                      +{site.galleries.length - 5} more galleries
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">No galleries created yet</p>
              )}
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Usage Summary</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm">Total Storage Used</span>
                  <Badge variant="outline">~{Math.round(totalImages * 2.5)}MB</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm">API Calls (30 days)</span>
                  <Badge variant="outline">1,247</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <span className="text-sm">CDN Bandwidth</span>
                  <Badge variant="outline">45.2GB</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Advanced Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Image Processing</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Auto-optimize images</div>
                    <div className="text-xs text-muted-foreground">Automatically compress and optimize uploaded images</div>
                  </div>
                  <Badge variant="success">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Generate WebP variants</div>
                    <div className="text-xs text-muted-foreground">Create WebP versions for better performance</div>
                  </div>
                  <Badge variant="success">Enabled</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Security & Access</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">CORS Protection</div>
                    <div className="text-xs text-muted-foreground">Restrict API access to specific domains</div>
                  </div>
                  <Badge variant="secondary">Configured</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">Rate Limiting</div>
                    <div className="text-xs text-muted-foreground">Prevent API abuse with rate limits</div>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>
              </div>
            </div>
          </div>

          <InfoBox type="info" title="Pro Tip" icon={Info}>
            These advanced settings are automatically configured for optimal performance and security. 
            Contact support if you need to customize these settings for your specific use case.
          </InfoBox>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/20 bg-destructive/5 shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            <span>Danger Zone</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <InfoBox type="warning" title="Permanent Action" icon={AlertTriangle}>
            Deleting your site will permanently remove all galleries, images, and associated data. 
            This action cannot be undone and will break any existing API integrations.
          </InfoBox>

          <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-xl">
            <div>
              <h4 className="font-medium text-destructive">Delete Site</h4>
              <p className="text-sm text-muted-foreground">
                Permanently delete this site and all associated data
              </p>
            </div>
            <Button variant="destructive" size="lg">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Site
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}