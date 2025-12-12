import { auth } from "@/auth";
import { getApiKey } from "@/actions/api-keys";
import { redirect } from "next/navigation";
import UploadingImagesDocs from "@/components/dashboard/documentation/uploading-images";
import APIDocsPage from "@/components/dashboard/documentation/api";
import NotFoundPage from "@/components/dashboard/not-found";
import prisma from "@/lib/prisma";

export default async function Documentation({ 
  params 
}: { 
  params: { slug: string; siteId: string } 
}) {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const userId = session.user.id;
  const siteId = params.siteId;

  // Get site data
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
    return <NotFoundPage />;
  }

  // Get API key
  const apiKeyResult = await getApiKey(siteId);
  const apiKey = apiKeyResult || null;

  const componentProps = {
    params,
    session,
    site,
    apiKey,
    userId,
    siteId
  };

  switch (params.slug) {
    case "uploading-images":
      return <UploadingImagesDocs {...componentProps} />;
    case "api":
      return <APIDocsPage {...componentProps} />;
    default:
      return <NotFoundPage />;
  }
}