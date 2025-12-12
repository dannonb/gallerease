import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ProfileSettings from "@/components/profile/profile-settings";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/10">
      <div className="py-16 px-6 mx-auto max-w-4xl">
        <ProfileSettings session={session} />
      </div>
    </div>
  );
}