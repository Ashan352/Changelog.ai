import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/dashboard/AppSidebar"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { plan: true, generations: true, name: true, image: true }
  })

  // Fallback to session if somehow DB read fails, though it shouldn't
  const plan = dbUser?.plan || session.user.plan || "free"
  const generations = dbUser?.generations ?? session.user.generations ?? 0
  const maxGenerations = 5
  const userName = dbUser?.name || session.user.name || "Developer"
  const userImage = dbUser?.image || session.user.image || ""

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-bg w-full">
        <AppSidebar 
          plan={plan} 
          generations={generations} 
          maxGenerations={maxGenerations} 
          userName={userName} 
          userImage={userImage} 
        />
        <main className="flex-1 flex flex-col min-w-0 max-h-screen overflow-hidden">
          <header className="h-14 border-b border-border bg-bg-surface/50 backdrop-blur-md flex items-center px-4 shrink-0">
             <SidebarTrigger className="hover:bg-bg-hover text-text-muted transition-colors rounded-md p-1 -ml-1 mr-4" />
          </header>
          <div className="flex-1 overflow-auto bg-bg p-4 md:p-6 lg:p-8">
             {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
