import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { SettingsClient } from "@/components/dashboard/SettingsClient";

export default async function SettingsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, email: true, image: true }
  });

  if (!user) redirect("/login");

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-serif italic text-text-primary">Settings</h1>
        <p className="font-mono text-xs text-text-muted mt-1 uppercase tracking-widest">
          Manage your account and preferences
        </p>
      </div>

      <SettingsClient user={user as any} />
    </div>
  );
}
