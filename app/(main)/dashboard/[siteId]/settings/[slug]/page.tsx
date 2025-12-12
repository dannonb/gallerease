import { auth } from "@/auth";
import React from 'react'
import GeneralSiteSettingsPage from "@/components/dashboard/settings/general";
import APIKeysPage from "@/components/dashboard/settings/api-keys";
import AccessPage from "@/components/dashboard/settings/access";
import IntegrationsPage from "@/components/dashboard/settings/integrations";
import SupportPage from "@/components/dashboard/settings/support";
import AdvancedSettingsPage from "@/components/dashboard/settings/advanced";
import NotFoundPage from "@/components/dashboard/not-found";

export default async function Settings({ params }: { params: { slug: string, siteId: string } }) {
    const session = await auth()
    
    switch (params.slug) {
        case "general":
            return <GeneralSiteSettingsPage params={params} session={session} />;
        case "api-keys":
            return <APIKeysPage params={params} session={session} />;
        case "access":
            return <AccessPage />;
        case "integrations":
            return <IntegrationsPage />;
        case "support":
            return <SupportPage />;
        case "advanced":
            return <AdvancedSettingsPage />;
        default:
            return <NotFoundPage />;
    }
}