import { FaDiscord, FaGithub, FaTwitter } from "react-icons/fa";
import { ContactForm } from "../forms/contact-form";
import { Button } from "../ui/button";
import { Mail, MessageCircle, Github } from "lucide-react";

export default function Contact() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      <div className="py-16 px-6 mx-auto max-w-6xl lg:py-24">
        {/* Hero Section */}
        <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-20 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            💬 Get in Touch
          </div>
          <h1 className="mb-6 text-5xl lg:text-6xl tracking-tight font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="mb-8 text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Got a technical issue? Want to send feedback about a feature? Need details about our plans? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div className="animate-slide-up">
            <div className="bg-card/50 backdrop-blur-sm rounded-3xl border p-8 shadow-soft">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Send us a message</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>

          {/* Contact Info & Social Links */}
          <div className="space-y-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {/* Quick Contact Options */}
            <div className="bg-card/50 backdrop-blur-sm rounded-3xl border p-8 shadow-soft">
              <h3 className="text-2xl font-bold mb-6">Other ways to reach us</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email Support</h4>
                    <p className="text-muted-foreground text-sm">support@gallerease.dev</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Live Chat</h4>
                    <p className="text-muted-foreground text-sm">Available 9 AM - 5 PM EST</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-card/50 backdrop-blur-sm rounded-3xl border p-8 shadow-soft">
              <h3 className="text-2xl font-bold mb-6">Connect with us</h3>
              <p className="text-muted-foreground mb-6">
                Follow us on social media for updates, tips, and community discussions.
              </p>
              <div className="flex space-x-4">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="flex-1 group hover:border-[#1DA1F2]/50"
                >
                  <FaTwitter className="h-5 w-5 mr-2 group-hover:text-[#1DA1F2] transition-colors" />
                  Twitter
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="flex-1 group hover:border-[#333]/50"
                >
                  <FaGithub className="h-5 w-5 mr-2 group-hover:text-[#333] dark:group-hover:text-white transition-colors" />
                  GitHub
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="flex-1 group hover:border-[#5865F2]/50"
                >
                  <FaDiscord className="h-5 w-5 mr-2 group-hover:text-[#5865F2] transition-colors" />
                  Discord
                </Button>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-3xl border border-primary/20 p-8">
              <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
              <p className="text-muted-foreground mb-6">
                Check out our FAQ section for quick answers to common questions.
              </p>
              <Button variant="outline" size="lg">
                View FAQ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}