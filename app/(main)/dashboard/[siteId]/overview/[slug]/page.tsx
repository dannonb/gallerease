import OverviewProvider from "@/providers/overview-provider";
import UploadPage from "@/components/dashboard/overview/upload";
import ImagesPage from "@/components/dashboard/overview/images";
import GalleriesPage from "@/components/dashboard/overview/galleries";
import Stats from "@/components/dashboard/overview/stats";
import NotFoundPage from "@/components/dashboard/not-found";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function Overview({
  params,
}: {
  params: { siteId: string; slug: string };
}) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/auth/login");
  }

  const images = await prisma.image.findMany({
    where: {
        siteId: params.siteId
    }
  });

  const galleries = await prisma.gallery.findMany({
    where: {
        siteId: params.siteId
    },
    include: {
      images: true
    }
  });

  const renderComponent = () => {
    switch (params.slug) {
      case "upload":
        return <UploadPage />;
      case "images":
        return <ImagesPage />;
      case "galleries":
        return <GalleriesPage />;
      case "stats":
        return <Stats params={params} />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <OverviewProvider images={images} galleries={galleries}>
      {renderComponent()}
    </OverviewProvider>
  );
}
