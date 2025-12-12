"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Copy, ExternalLink, Key, Database, Image as ImageIcon, Globe } from "lucide-react";
import { ApiAlert } from "@/components/ui/api-alert";
import { useState } from "react";

interface APIDocsPageProps {
  params: any;
  session: any;
  site: any;
  apiKey: string | null;
  userId: string;
  siteId: string;
}

export default function APIDocsPage({ 
  site, 
  apiKey, 
  siteId 
}: APIDocsPageProps) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || (typeof window !== 'undefined' ? window.location.origin : 'https://gallerease.dev');
  const sampleGallery = site?.galleries?.[0];
  const sampleImage = sampleGallery?.images?.[0];

  const endpoints = [
    {
      method: "GET", 
      path: `/api/${siteId}/galleries`,
      title: "List All Galleries",
      description: "Get all galleries for your site",
      response: site?.galleries?.map((gallery: any) => ({
        id: gallery.id,
        name: gallery.name,
        description: gallery.description,
        imageCount: gallery.images?.length || 0,
        createdAt: gallery.createdAt,
        updatedAt: gallery.updatedAt
      })) || [
        {
          id: "gallery_123",
          name: "Sample Gallery",
          description: "A sample gallery",
          imageCount: 5,
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-01-01T00:00:00Z"
        }
      ]
    },
    {
      method: "GET",
      path: `/api/${siteId}/galleries/${sampleGallery?.id || "{gallery_id}"}/images`,
      title: "Get Gallery Images",
      description: "Retrieve all images from a specific gallery",
      response: {
        gallery: {
          id: sampleGallery?.id || "gallery_123",
          name: sampleGallery?.name || "Sample Gallery",
          description: sampleGallery?.description || "Gallery description"
        },
        images: sampleGallery?.images?.slice(0, 3).map((image: any) => ({
          id: image.id,
          originalUrl: image.originalUrl,
          cdnUrl: image.cdnUrl,
          alt: image.alt || "",
          description: image.description || "",
          link: image.link || "",
          createdAt: image.createdAt,
          updatedAt: image.updatedAt
        })) || [
          {
            id: "img_123",
            originalUrl: "https://s3.amazonaws.com/bucket/image1.jpg",
            cdnUrl: "https://cdn.gallerease.dev/optimized/image1.jpg",
            alt: "Sample image",
            description: "A beautiful sample image",
            link: "",
            createdAt: "2024-01-01T00:00:00Z",
            updatedAt: "2024-01-01T00:00:00Z"
          }
        ]
      }
    },
    {
      method: "GET",
      path: `/api/${siteId}/images/${sampleImage?.id || "{image_id}"}`,
      title: "Get Single Image",
      description: "Retrieve details for a specific image",
      response: {
        id: sampleImage?.id || "img_123",
        originalUrl: sampleImage?.originalUrl || "https://s3.amazonaws.com/bucket/image1.jpg",
        cdnUrl: sampleImage?.cdnUrl || "https://cdn.gallerease.dev/optimized/image1.jpg",
        alt: sampleImage?.alt || "Sample image",
        description: sampleImage?.description || "A beautiful sample image",
        link: sampleImage?.link || "",
        gallery: {
          id: sampleGallery?.id || "gallery_123",
          name: sampleGallery?.name || "Sample Gallery"
        },
        createdAt: sampleImage?.createdAt || "2024-01-01T00:00:00Z",
        updatedAt: sampleImage?.updatedAt || "2024-01-01T00:00:00Z"
      }
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const CodeBlock = ({ children, title }: { children: string; title?: string }) => (
    <div className="relative group">
      {title && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(children)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      )}
      <pre className="bg-card border rounded-xl p-4 overflow-x-auto text-sm">
        <code className="text-foreground/90 font-mono">
          {children}
        </code>
      </pre>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              API Documentation
            </h1>
            <p className="text-muted-foreground">
              Complete API reference with your personalized endpoints and data
            </p>
          </div>
        </div>
      </div>

      {/* API Key Section */}
      <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Key className="w-5 h-5" />
            <span>Authentication</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            All API requests require authentication using your API key in the request headers.
          </p>
          
          {apiKey ? (
            <ApiAlert
              title="Your API Key"
              description={apiKey}
              variant="secret"
            />
          ) : (
            <div className="p-4 bg-muted/50 rounded-xl border border-dashed">
              <p className="text-sm text-muted-foreground mb-2">
                No API key found. Generate one in the Settings → API Keys section.
              </p>
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-2" />
                Go to API Keys
              </Button>
            </div>
          )}

          <CodeBlock title="Authentication Header">
{`curl -H "x-api-key: ${apiKey || 'your_api_key_here'}" \\
     -H "Content-Type: application/json" \\
     ${baseUrl}/v1/sites/${siteId}`}
          </CodeBlock>
        </CardContent>
      </Card>

      {/* Base URL */}
      <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Base URL</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CodeBlock>
{baseUrl}
          </CodeBlock>
          <p className="text-sm text-muted-foreground mt-2">
            All API endpoints are relative to this base URL.
          </p>
        </CardContent>
      </Card>

      {/* Endpoints */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">API Endpoints</h2>
        
        {endpoints.map((endpoint, index) => (
          <Card key={index} className="border-0 bg-card/50 backdrop-blur-sm shadow-soft animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-3">
                  <Badge variant={endpoint.method === 'GET' ? 'secondary' : 'default'}>
                    {endpoint.method}
                  </Badge>
                  <span>{endpoint.title}</span>
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(`${baseUrl}${endpoint.path}`)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-muted-foreground">{endpoint.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Endpoint URL */}
              <div>
                <h4 className="font-medium mb-2">Endpoint</h4>
                <CodeBlock>
{`${endpoint.method} ${baseUrl}${endpoint.path}`}
                </CodeBlock>
              </div>

              {/* cURL Example */}
              <div>
                <h4 className="font-medium mb-2">cURL Example</h4>
                <CodeBlock>
{`curl -X ${endpoint.method} \\
     -H "x-api-key: ${apiKey || 'your_api_key_here'}" \\
     -H "Content-Type: application/json" \\
     "${baseUrl}${endpoint.path}"`}
                </CodeBlock>
              </div>

              {/* JavaScript Example */}
              <div>
                <h4 className="font-medium mb-2">JavaScript Example</h4>
                <CodeBlock>
{`const response = await fetch('${baseUrl}${endpoint.path}', {
  method: '${endpoint.method}',
  headers: {
    'x-api-key': '${apiKey || 'your_api_key_here'}',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);`}
                </CodeBlock>
              </div>

              {/* Response Example */}
              <div>
                <h4 className="font-medium mb-2">Response Example</h4>
                <CodeBlock>
{JSON.stringify(endpoint.response, null, 2)}
                </CodeBlock>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Rate Limits */}
      <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-soft">
        <CardHeader>
          <CardTitle>Rate Limits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted/30 rounded-xl">
              <h4 className="font-medium mb-2">Free Tier</h4>
              <p className="text-sm text-muted-foreground">1,000 requests per hour</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-xl">
              <h4 className="font-medium mb-2">Paid Plans</h4>
              <p className="text-sm text-muted-foreground">10,000 requests per hour</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Rate limit headers are included in all responses: <code>X-RateLimit-Limit</code>, <code>X-RateLimit-Remaining</code>, <code>X-RateLimit-Reset</code>
          </p>
        </CardContent>
      </Card>

      {/* Error Handling */}
      <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-soft">
        <CardHeader>
          <CardTitle>Error Handling</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The API uses conventional HTTP response codes to indicate success or failure.
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Badge variant="secondary">200</Badge>
              <span className="text-sm">Success - Request completed successfully</span>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="destructive">401</Badge>
              <span className="text-sm">Unauthorized - Invalid or missing API key</span>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="destructive">404</Badge>
              <span className="text-sm">Not Found - Resource doesn't exist</span>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="destructive">429</Badge>
              <span className="text-sm">Rate Limited - Too many requests</span>
            </div>
          </div>

          <CodeBlock title="Error Response Format">
{`{
  "error": {
    "code": "not_found",
    "message": "Gallery not found",
    "details": "The requested gallery does not exist or you don't have access to it"
  }
}`}
          </CodeBlock>
        </CardContent>
      </Card>
    </div>
  );
}