'use client'

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { usePathname } from "next/navigation"

export function Breadcrumbs() {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(path => path !== '')

  if (paths.length === 0) return null

  return (
    <nav className="flex items-center gap-2 text-xs font-mono text-text-muted mb-6 overflow-x-auto whitespace-nowrap pb-2 scrollbar-none">
      <Link 
        href="/" 
        className="flex items-center gap-1 hover:text-accent transition-colors"
      >
        <Home className="h-3 w-3" />
        <span className="hidden sm:inline">Home</span>
      </Link>
      
      {paths.map((path, index) => {
        const href = `/${paths.slice(0, index + 1).join('/')}`
        const isLast = index === paths.length - 1
        const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ')

        return (
          <div key={path} className="flex items-center gap-2">
            <ChevronRight className="h-3 w-3 shrink-0 text-border" />
            {isLast ? (
              <span className="text-text-primary font-bold">{label}</span>
            ) : (
              <Link 
                href={href}
                className="hover:text-accent transition-colors"
              >
                {label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
