"use client";

import { createApiKey, deleteApiKey } from "@/actions/api-keys";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Key, Trash2, Plus, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

export default function ApiKeyButtons({
  siteId,
  userId,
  apikey
}: {
  siteId: string;
  userId: string;
  apikey: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onCreateKey = async () => {
    setLoading(true);
    try {
      if (!userId || !siteId) return;
      
      const newKey = await createApiKey(siteId as string, userId);
      
      if (!newKey) {
        toast.error("Failed to generate API key");
        return;
      }

      toast.success("API key generated successfully!");
      router.refresh();

    } catch (error) {
      console.error(error);
      toast.error("Failed to generate API key");
    } finally {
      setLoading(false);
    }
  };

  const onDeleteKey = async () => {
    if (!confirm("Are you sure you want to delete this API key? This action cannot be undone and will break any existing integrations.")) {
      return;
    }

    setLoading(true);
    try {
      if (!userId || !siteId || !apikey) return;
      
      const deletedKey = await deleteApiKey(siteId, apikey);
      
      if (!deletedKey) {
        toast.error("Failed to delete API key");
        return;
      }

      toast.success("API key deleted successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete API key");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {!apikey ? (
        <Button 
          disabled={loading} 
          onClick={onCreateKey}
          size="lg"
          variant="gradient"
          className="shadow-glow"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Generate API Key
            </>
          )}
        </Button>
      ) : (
        <>
          <Button 
            disabled={loading} 
            onClick={onCreateKey}
            size="lg"
            variant="outline"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Regenerating...
              </>
            ) : (
              <>
                <Key className="w-4 h-4 mr-2" />
                Regenerate Key
              </>
            )}
          </Button>
          
          <Button 
            disabled={loading} 
            onClick={onDeleteKey} 
            variant="destructive"
            size="lg"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Key
          </Button>
        </>
      )}
    </div>
  );
}
