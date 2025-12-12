export default function GettingStarted() {
    return (
        <section className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
            <div className="py-16 px-6 mx-auto max-w-7xl lg:py-24">
                {/* Hero Section */}
                <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-20 animate-fade-in">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                        🚀 Getting Started Guide
                    </div>
                    <h1 className="mb-6 text-5xl lg:text-6xl tracking-tight font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Welcome to Gallerease!
                    </h1>
                    <p className="mb-8 text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                        Manage and integrate image galleries with ease. Our platform simplifies gallery management for developers working on client websites. Follow these steps to get started.
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="max-w-6xl mx-auto space-y-8">
                    <div className="grid gap-8 lg:gap-12">
                        <StepCard 
                            stepNumber="01" 
                            title="Creating an Account"
                            delay="0s"
                        >
                            <ol className="list-decimal ml-6 space-y-3 text-muted-foreground">
                                <li>
                                    Visit{" "}
                                    <a
                                        href="https://gallerease.dev/auth/login"
                                        className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
                                    >
                                        gallerease.dev/auth/login
                                    </a>{" "}
                                    and select an OAuth Provider.
                                </li>
                                <li>Verify your email address using the link sent to your inbox.</li>
                            </ol>
                        </StepCard>

                        <StepCard 
                            stepNumber="02" 
                            title="Creating Sites and Galleries"
                            delay="0.1s"
                        >
                            <ol className="list-decimal ml-6 space-y-3 text-muted-foreground">
                                <li>
                                    Log in and go to the <span className="font-semibold text-foreground">Overview</span>{" "}
                                    section.
                                </li>
                                <li>
                                    Click <span className="font-semibold text-foreground">Create New Site</span> and
                                    provide a site name and optional description.
                                </li>
                                <li>
                                    Select the site and click <span className="font-semibold text-foreground">Add Gallery</span>.
                                </li>
                            </ol>
                        </StepCard>

                        <StepCard 
                            stepNumber="03" 
                            title="Adding and Configuring Images"
                            delay="0.2s"
                        >
                            <ol className="list-decimal ml-6 space-y-3 text-muted-foreground">
                                <li>
                                    Open the gallery and click{" "}
                                    <span className="font-semibold text-foreground">Upload Images</span>.
                                </li>
                                <li>Drag-and-drop or select files from your computer.</li>
                                <li>Configure image settings (titles, descriptions, tags).</li>
                            </ol>
                        </StepCard>

                        <StepCard 
                            stepNumber="04" 
                            title="Allowing Users to Add Images"
                            delay="0.3s"
                        >
                            <ol className="list-decimal ml-6 space-y-3 text-muted-foreground">
                                <li>
                                    Select the gallery and click{" "}
                                    <span className="font-semibold text-foreground">Generate Temporary Link</span>.
                                </li>
                                <li>
                                    Set expiration and optional restrictions (max uploads, file types).
                                </li>
                                <li>
                                    Share the link with clients so they can upload directly.
                                </li>
                            </ol>
                        </StepCard>

                        <StepCard 
                            stepNumber="05" 
                            title="Creating an API Key"
                            delay="0.4s"
                        >
                            <ol className="list-decimal ml-6 space-y-3 text-muted-foreground">
                                <li>
                                    Go to <span className="font-semibold text-foreground">Account Settings → API Keys</span>.
                                </li>
                                <li>
                                    Click <span className="font-semibold text-foreground">Generate New Key</span> and
                                    give it a name (e.g., <code className="px-2 py-1 bg-muted rounded text-sm">Client A Gallery</code>).
                                </li>
                                <li>Copy and securely store the key for API access.</li>
                            </ol>
                        </StepCard>

                        <StepCard 
                            stepNumber="06" 
                            title="Retrieving Image Data via REST API"
                            delay="0.5s"
                        >
                            <p className="mb-4 text-muted-foreground">Use the following endpoint to fetch gallery images:</p>
                            <CodeBlock>
                                {`GET https://gallerease.dev/api/{site_id}/galleries/{gallery_id}/images
Headers:
  x-api-key: YOUR_API_KEY`}
                            </CodeBlock>
                            <p className="mt-4 mb-4 text-muted-foreground">Example JSON response:</p>
                            <CodeBlock>
                                {`{
  "images": [
    {
      "id": "12345",
      "title": "Sunset",
      "description": "A beautiful sunset.",
      "url": "https://cdn.gallerease.dev/optimized/sunset.jpg"
    }
  ]
}`}
                            </CodeBlock>
                        </StepCard>
                    </div>
                </div>
            </div>
        </section>
    )
}

/* ---- Helper Components ---- */

interface StepCardProps {
    stepNumber: string;
    title: string;
    children: React.ReactNode;
    delay?: string;
}

function StepCard({ stepNumber, title, children, delay = "0s" }: StepCardProps) {
    return (
        <div 
            className="group relative rounded-3xl border bg-card/50 backdrop-blur-sm p-8 shadow-soft hover:shadow-glow transition-all duration-300 hover:scale-[1.02] animate-slide-up"
            style={{ animationDelay: delay }}
        >
            {/* Step Number */}
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-glow">
                {stepNumber}
            </div>
            
            {/* Content */}
            <div className="ml-4">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                    {title}
                </h3>
                <div className="space-y-2">
                    {children}
                </div>
            </div>
        </div>
    );
}

function CodeBlock({ children }: { children: string }) {
    return (
        <div className="relative group">
            <pre className="bg-card border rounded-2xl p-6 overflow-x-auto text-sm leading-relaxed shadow-soft">
                <code className="text-foreground/90 font-mono">
                    {children}
                </code>
            </pre>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="px-3 py-1 bg-primary/10 hover:bg-primary/20 rounded-lg text-xs text-primary transition-colors">
                    Copy
                </button>
            </div>
        </div>
    );
}