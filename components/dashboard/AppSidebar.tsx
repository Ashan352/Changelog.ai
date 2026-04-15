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
    <Sidebar className="border-r border-border bg-bg-surface lg:bg-bg-surface/50 lg:backdrop-blur-xl">
      <SidebarHeader className="p-4 border-b border-border/50">
        <Logo hideTagline={true} className="!gap-2" />
      </SidebarHeader>

      <SidebarContent className="px-4 py-6 overflow-y-auto">
        <SidebarGroup>
          <div className="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em] mb-4 px-2 opacity-60">Main Menu</div>
          <SidebarMenu className="gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton 
                    isActive={isActive}
                    className={`relative overflow-hidden font-mono text-sm transition-all hover:bg-bg-hover hover:text-text-primary active:scale-[0.98] group rounded-xl px-4 h-11 ${isActive ? 'text-accent border border-accent/20 bg-accent/5 font-bold shadow-sm' : ''}`}
                    render={
                      <Link href={item.href} className="flex items-center gap-3 w-full">
                        {/* Sliding green left-border indicator */}
                        {isActive && <span className="nav-active-indicator" />}
                        <item.icon className={`h-4 w-4 shrink-0 transition-colors ${isActive ? 'text-accent' : 'text-text-muted group-hover:text-text-primary'}`} />
                        <span>{item.label}</span>
                      </Link>
                    }
                  />
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t border-border/50 bg-bg-surface lg:bg-transparent">
        {/* Modern Usage Chart */}
        {plan === "free" && (
          <div className="mb-6 rounded-2xl bg-bg border border-border shadow-sm overflow-hidden p-4 group hover:border-accent/30 transition-colors">
             <div className="flex items-center justify-between mb-4">
               <div>
                  <div className="font-mono text-[10px] text-text-muted uppercase tracking-[0.2em] mb-0.5 opacity-60">Usage Stats</div>
                  <div className="font-serif italic text-xl text-text-primary">{generations} <span className="text-text-muted text-xs font-mono not-italic uppercase opacity-30">/ {maxGenerations}</span></div>
               </div>
               <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-accent" />
               </div>
             </div>
             
             <div className="space-y-1.5 pt-1">
                <div className="w-full bg-bg-elevated h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-accent transition-all duration-1000 ease-in-out shadow-[0_0_10px_rgba(155,177,94,0.4)]" 
                    style={{ width: `${Math.min((generations / maxGenerations) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between items-center px-0.5">
                   <span className="font-mono text-[9px] text-text-muted uppercase tracking-tight">Cap reached</span>
                   <span className="font-mono text-[10px] text-text-primary font-bold">{Math.round((generations/maxGenerations)*100)}%</span>
                </div>
             </div>
             
             <div className="mt-4 relative overflow-hidden rounded-xl">
                <div className="shimmer-btn absolute inset-0 rounded-xl pointer-events-none opacity-20" />
                <UpgradeButton />
             </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-bg border border-border overflow-hidden shrink-0 ring-1 ring-border shadow-sm">
             {userImage ? (
                <img src={userImage} alt={userName} className="w-full h-full object-cover" />
             ) : (
                <div className="w-full h-full flex items-center justify-center text-text-muted">
                  <User className="h-5 w-5" />
                </div>
             )}
          </div>
          <div className="flex flex-col min-w-0">
             <span className="text-sm font-mono text-text-primary truncate font-bold leading-tight">{userName?.split(' ')[0] || "Developer"}</span>
             <span className="text-[10px] font-mono text-accent truncate capitalize tracking-widest leading-none mt-1">{plan} Plan</span>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="ml-auto p-2.5 rounded-xl text-text-muted hover:bg-danger/10 hover:text-danger transition-all group border border-transparent hover:border-danger/10"
          >
             <LogOut className="h-4 w-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
