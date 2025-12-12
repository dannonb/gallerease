'use client'

import UploadForm from "@/components/forms/upload-form";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useTempUploadModal } from "@/hooks/use-temp-upload";

export default function UploadPage() {
  const tempUpload = useTempUploadModal();

  const title = "Add images";
  const description = "Add new images to your collection and organize them beautifully";
  
  return (
    <div className="flex flex-col space-y-8 animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="animate-slide-up">
          <Heading title={title} description={description} />
        </div>
        <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <Button 
            variant="gradient" 
            onClick={() => tempUpload.onOpen()}
            className="shadow-glow"
          >
            Create Temp Link
          </Button>
        </div>
      </div>
      
      <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <UploadForm />
      </div>
    </div>
  );
}
