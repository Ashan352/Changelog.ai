'use client'
import { Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar"
import { GitBranch, User, Settings, CreditCard, LogOut, Terminal, Layers, TrendingUp } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { UpgradeButton } from "@/components/ui/UpgradeButton"
import { signOut } from "next-auth/react"
import { Logo } from "@/components/ui/Logo"


export function AppSidebar({ plan, generations, maxGenerations, userName, userImage }: { plan: string, generations: number, maxGenerations: number, userName: string, userImage: string }) {
  const pathname = usePathname()

  const navItems = [
    { label: "Generator", icon: Terminal, href: "/dashboard" },
    { label: "History", icon: Layers, href: "/dashboard/history" },
    { label: "Usage", icon: TrendingUp, href: "/dashboard/usage" },
    { label: "Settings", icon: Settings, href: "/dashboard/settings" },
    { label: "Billing", icon: CreditCard, href: "/dashboard/billing" }
  ]

  return (
    <Sidebar className="border-r border-border bg-bg-surface/50 backdrop-blur-xl">
      <SidebarHeader className="p-4 border-b border-border/50">
        <Logo hideTagline={true} className="!gap-2" />
      </SidebarHeader>

      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
        <div className="font-mono text-[12px] text-text-muted uppercase tracking-widest mb-4 px-2">Menu</div>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton 
                  isActive={pathname === item.href}
                  className={`font-mono text-sm transition-all hover:bg-bg-hover hover:text-text-primary active:scale-[0.98] ${pathname === item.href ? 'text-accent border border-accent/20 bg-accent/5' : ''}`}
                  render={
                    <Link href={item.href} className="flex items-center gap-3 w-full">
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span>{item.label}</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t border-border/50 bg-bg">
        {/* Modern Usage Chart */}
        {plan === "free" && (
          <div className="mb-6 rounded-2xl bg-bg-surface border border-border shadow-sm overflow-hidden pt-4">
             <div className="text-center px-4">
               <div className="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em] mb-1 leading-none">Usage Stats</div>
               <div className="font-serif italic text-lg text-text-primary">{generations} / {maxGenerations}</div>
             </div>
             
             <div className="px-4 py-4 space-y-2">
                <div className="flex justify-between items-end mb-1">
                  <span className="font-mono text-[10px] text-text-muted">Generations</span>
                  <span className="font-mono text-xs text-text-primary font-bold">{Math.round((generations/maxGenerations)*100)}%</span>
                </div>
                <div className="w-full bg-bg border border-border h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent transition-all duration-1000 ease-in-out" 
                    style={{ width: `${Math.min((generations / maxGenerations) * 100, 100)}%` }}
                  />
                </div>
             </div>
             
             <div className="p-4 pt-0">
                <UpgradeButton />
             </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-bg-surface border border-border overflow-hidden shrink-0">
             {userImage ? (
                <img src={userImage} alt={userName} className="w-full h-full object-cover" />
             ) : (
                <div className="w-full h-full flex items-center justify-center text-text-muted">
                  <User className="h-5 w-5" />
                </div>
             )}
          </div>
          <div className="flex flex-col min-w-0">
             <span className="text-sm font-mono text-text-primary truncate">{userName?.split(' ')[0] || "Developer"}</span>
             <span className="text-[11px] font-mono text-accent truncate capitalize">{plan} Plan</span>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="ml-auto p-2 rounded-lg text-text-muted hover:bg-bg-hover hover:text-danger transition-colors group"
          >
             <LogOut className="h-4 w-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
