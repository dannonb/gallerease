import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Upload, 
  Image as ImageIcon, 
  Link2, 
  Settings, 
  Users, 
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

interface UploadingImagesDocsProps {
  params: any;
  session: any;
  site: any;
  apiKey: string | null;
  userId: string;
  siteId: string;
}

export default function UploadingImagesDocs({ 
  site, 
  siteId 
}: UploadingImagesDocsProps) {
  const galleries = site?.galleries || [];
  const hasGalleries = galleries.length > 0;

  const StepCard = ({ 
    number, 
    title, 
    children, 
    icon: Icon,
    status = "default"
  }: { 
    number: string; 
    title: string; 
    children: React.ReactNode;
    icon: any;
    status?: "default" | "success" | "warning";
  }) => {
    const statusColors = {
      default: "from-indigo-500 to-purple-600",
      success: "from-emerald-500 to-emerald-700", 
      warning: "from-amber-500 to-orange-600"
    };

    return (
      <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-soft">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 bg-gradient-to-r ${statusColors[status]} rounded-2xl flex items-center justify-center text-white relative`}>
              <Icon className="w-6 h-6" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-background border-2 border-primary rounded-full flex items-center justify-center text-xs font-bold text-primary">
                {number}
              </div>
            </div>
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    );
  };

  const InfoBox = ({ 
    type = "info", 
    title, 
    children 
  }: { 
    type?: "info" | "warning" | "success"; 
    title: string; 
    children: React.ReactNode;
  }) => {
    const styles = {
      info: { bg: "bg-blue-50 dark:bg-blue-950/30", border: "border-blue-200 dark:border-blue-800", icon: Info, iconColor: "text-blue-600" },
      warning: { bg: "bg-yellow-50 dark:bg-yellow-950/30", border: "border-yellow-200 dark:border-yellow-800", icon: AlertCircle, iconColor: "text-yellow-600" },
      success: { bg: "bg-green-50 dark:bg-green-950/30", border: "border-green-200 dark:border-green-800", icon: CheckCircle, iconColor: "text-green-600" }
    };
    
    const style = styles[type];
    const IconComponent = style.icon;

    return (
      <div className={`p-4 rounded-xl border ${style.bg} ${style.border}`}>
        <div className="flex items-start space-x-3">
          <IconComponent className={`w-5 h-5 mt-0.5 ${style.iconColor}`} />
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
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white">
            <Upload className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Uploading Images
            </h1>
            <p className="text-muted-foreground">
              Complete guide to uploading and managing images in your galleries
            </p>
          </div>
        </div>
      </div>

      {/* Quick Status */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold">{site?.galleries?.reduce((acc: number, gallery: any) => acc + (gallery.images?.length || 0), 0) || 0}</div>
                <div className="text-sm text-muted-foreground">Total Images</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold">{galleries.length}</div>
                <div className="text-sm text-muted-foreground">Active Galleries</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center text-white">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="font-semibold">Ready</div>
                <div className="text-sm text-muted-foreground">Upload Status</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Prerequisites Check */}
      {!hasGalleries && (
        <InfoBox type="warning" title="Create a Gallery First">
          You need to create at least one gallery before uploading images. 
          <Link href={`/dashboard/${siteId}/overview/galleries`} className="text-primary hover:underline ml-1">
            Create your first gallery here
          </Link>
        </InfoBox>
      )}

      {/* Step-by-Step Guide */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Step-by-Step Upload Guide</h2>
        
        <div className="space-y-6">
          <StepCard 
            number="1" 
            title="Prepare Your Images" 
            icon={ImageIcon}
            status="default"
          >
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Before uploading, ensure your images meet our requirements for optimal performance and quality.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-green-600">✅ Supported Formats</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• JPEG (.jpg, .jpeg)</li>
                    <li>• PNG (.png)</li>
                    <li>• WebP (.webp) - Recommended</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-blue-600">📏 Size Limits</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Maximum: 10MB per image</li>
                    <li>• Recommended: 2-5MB</li>
                    <li>• Batch limit: 30 images</li>
                  </ul>
                </div>
              </div>

              <InfoBox type="info" title="Pro Tip">
                For web use, compress images to 80-90% quality and resize to appropriate dimensions (e.g., 1920px width for full-screen images) before uploading to reduce file sizes and improve loading times.
              </InfoBox>
            </div>
          </StepCard>

          <StepCard 
            number="2" 
            title="Navigate to Upload Page" 
            icon={Upload}
            status={hasGalleries ? "success" : "warning"}
          >
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Access the upload interface from your dashboard navigation.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Dashboard</Badge>
                  <span className="text-muted-foreground">→</span>
                  <Badge variant="outline">Overview</Badge>
                  <span className="text-muted-foreground">→</span>
                  <Badge variant="secondary">Upload</Badge>
                </div>
                
                <Button asChild variant="outline" className="w-fit">
                  <Link href={`/dashboard/${siteId}/overview/upload`}>
                    <Upload className="w-4 h-4 mr-2" />
                    Go to Upload Page
                  </Link>
                </Button>
              </div>

              {hasGalleries && (
                <InfoBox type="success" title="Ready to Upload">
                  You have {galleries.length} {galleries.length === 1 ? 'gallery' : 'galleries'} available for uploads.
                </InfoBox>
              )}
            </div>
          </StepCard>

          <StepCard 
            number="3" 
            title="Select Target Gallery" 
            icon={Settings}
            status="default"
          >
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Choose which gallery will contain your uploaded images.
              </p>
              
              {hasGalleries ? (
                <div className="space-y-3">
                  <h4 className="font-medium">Your Available Galleries:</h4>
                  <div className="grid gap-3">
                    {galleries.slice(0, 3).map((gallery: any) => (
                      <div key={gallery.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div>
                          <div className="font-medium">{gallery.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {gallery.images?.length || 0} images • Created {new Date(gallery.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <Badge variant="secondary">{gallery.images?.length || 0}</Badge>
                      </div>
                    ))}
                    {galleries.length > 3 && (
                      <div className="text-sm text-muted-foreground">
                        +{galleries.length - 3} more galleries available
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <InfoBox type="warning" title="No Galleries Found">
                  Create a gallery first to organize your images.
                  <Button asChild variant="outline" size="sm" className="ml-2">
                    <Link href={`/dashboard/${siteId}/overview/galleries`}>
                      Create Gallery
                    </Link>
                  </Button>
                </InfoBox>
              )}
            </div>
          </StepCard>

          <StepCard 
            number="4" 
            title="Upload Your Images" 
            icon={Upload}
            status="default"
          >
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Use our drag-and-drop interface or click to select files from your computer.
              </p>
              
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/30 rounded-xl">
                    <h4 className="font-medium mb-2">🖱️ Drag & Drop</h4>
                    <p className="text-sm text-muted-foreground">
                      Simply drag images from your file explorer directly into the upload area.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-muted/30 rounded-xl">
                    <h4 className="font-medium mb-2">📁 File Browser</h4>
                    <p className="text-sm text-muted-foreground">
                      Click the upload area to open your file browser and select multiple images.
                    </p>
                  </div>
                </div>

                <InfoBox type="info" title="Batch Upload">
                  You can upload up to 30 images at once. For larger batches, repeat the process multiple times.
                </InfoBox>
              </div>
            </div>
          </StepCard>

          <StepCard 
            number="5" 
            title="Add Image Details" 
            icon={Settings}
            status="default"
          >
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Enhance your images with metadata for better organization and SEO.
              </p>
              
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="p-4 bg-muted/30 rounded-xl">
                    <h4 className="font-medium mb-2">Alt Text</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Describe the image for accessibility and SEO purposes.
                    </p>
                    <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded font-mono">
                      Example: "Modern living room with blue sofa and wooden coffee table"
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/30 rounded-xl">
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Provide additional context or details about the image.
                    </p>
                    <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded font-mono">
                      Example: "Interior design showcase featuring contemporary furniture and natural lighting"
                    </div>
                  </div>
                  
                  <div className="p-4 bg-muted/30 rounded-xl">
                    <h4 className="font-medium mb-2">Link (Optional)</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Add a URL to make the image clickable in your gallery.
                    </p>
                    <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded font-mono">
                      Example: "https://example.com/product-page"
                    </div>
                  </div>
                </div>

                <InfoBox type="info" title="Future Enhancement">
                  AI-powered alt text and description generation is coming soon to automatically enhance your images.
                </InfoBox>
              </div>
            </div>
          </StepCard>

          <StepCard 
            number="6" 
            title="Review & Upload" 
            icon={CheckCircle}
            status="success"
          >
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Review your images and metadata before finalizing the upload.
              </p>
              
              <div className="space-y-3">
                <h4 className="font-medium">Before clicking "Upload Images":</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Verify the correct gallery is selected</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Check image previews for quality</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Review alt text and descriptions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Ensure all required fields are filled</span>
                  </li>
                </ul>
              </div>

              <InfoBox type="success" title="Upload Process">
                Images are uploaded to AWS S3 and automatically optimized for web delivery via CloudFront CDN. The process typically takes 10-30 seconds per image depending on file size.
              </InfoBox>
            </div>
          </StepCard>
        </div>
      </div>

      {/* Client Upload Links */}
      <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Link2 className="w-5 h-5" />
            <span>Client Upload Links</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Allow clients to upload images directly to your galleries without needing an account.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted/30 rounded-xl">
              <h4 className="font-medium mb-2 flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Benefits</span>
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• No account required for clients</li>
                <li>• Time-limited access</li>
                <li>• Automatic organization</li>
                <li>• Upload restrictions</li>
              </ul>
            </div>
            
            <div className="p-4 bg-muted/30 rounded-xl">
              <h4 className="font-medium mb-2 flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Settings</span>
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Custom expiration dates</li>
                <li>• Maximum upload limits</li>
                <li>• File type restrictions</li>
                <li>• Password protection</li>
              </ul>
            </div>
          </div>

          <Button asChild variant="outline">
            <Link href={`/dashboard/${siteId}/overview/upload`}>
              <Link2 className="w-4 h-4 mr-2" />
              Create Temp Upload Link
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Troubleshooting */}
      <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-soft">
        <CardHeader>
          <CardTitle>Troubleshooting Common Issues</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="p-4 border border-destructive/20 bg-destructive/5 rounded-xl">
              <h4 className="font-medium text-destructive mb-2">Upload Failed</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Check file size (max 10MB per image)</li>
                <li>• Verify file format (JPG, PNG, WebP only)</li>
                <li>• Ensure stable internet connection</li>
                <li>• Try uploading fewer images at once</li>
              </ul>
            </div>
            
            <div className="p-4 border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/30 rounded-xl">
              <h4 className="font-medium text-yellow-600 mb-2">Slow Upload Speed</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Compress images before uploading</li>
                <li>• Upload during off-peak hours</li>
                <li>• Check your internet bandwidth</li>
                <li>• Upload in smaller batches</li>
              </ul>
            </div>
            
            <div className="p-4 border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
              <h4 className="font-medium text-blue-600 mb-2">Images Not Appearing</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Wait for CDN propagation (up to 5 minutes)</li>
                <li>• Refresh your browser cache</li>
                <li>• Check if images are in the correct gallery</li>
                <li>• Verify API integration is working</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="border-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border-primary/20 shadow-soft">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Upload?</h3>
          <p className="text-muted-foreground mb-6">
            Start uploading your images and see them delivered instantly via our global CDN.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="gradient">
              <Link href={`/dashboard/${siteId}/overview/upload`}>
                <Upload className="w-5 h-5 mr-2" />
                Start Uploading
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={`/dashboard/${siteId}/documentation/api`}>
                <ExternalLink className="w-5 h-5 mr-2" />
                View API Docs
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}