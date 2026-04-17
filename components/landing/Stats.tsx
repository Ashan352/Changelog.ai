'use client'
import { useState, useEffect } from 'react'
import { GitCommit, Clock, Users, Zap, Layers } from 'lucide-react'
import { CountUp } from '@/components/motion/CountUp'
import { FadeUp } from '@/components/motion/FadeUp'
import { TiltedCard } from '@/components/motion/TiltedCard'
import { getLiveStats } from '@/app/actions/stats'

export function Stats() {
  const [data, setData] = useState({
    userCount: 0,
    totalGenerations: 0,
    avgTime: 0,
    successRate: 0
  })

  useEffect(() => {
    getLiveStats().then(setData)
  }, [])

  const stats = [
    { label: 'Changelogs shipped', value: data.totalGenerations, icon: GitCommit },
    { label: 'Avg speed to ship', value: data.avgTime, icon: Clock, suffix: 's', decimal: true },
    { label: 'Developers on board', value: data.userCount, icon: Users },
    { label: 'Success rate', value: data.successRate, icon: Zap, suffix: '%', decimal: true },
  ]

  return (
    <section id="stats" className="bg-bg-surface py-14 sm:py-20 px-4 sm:px-6 border-y border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
        {stats.map((stat, i) => (
          <FadeUp key={i} delay={i * 0.1}>
            <TiltedCard>
              <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3 p-4 sm:p-6 rounded-2xl bg-bg-elevated/40 border border-border hover:bg-bg-elevated/60 hover:border-accent/20 transition-all group relative overflow-hidden h-full">
                <div className="absolute top-2 right-2 flex items-center gap-1">
                   <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent"></span>
                   </span>
                   <span className="font-mono text-[8px] text-accent uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">Live</span>
                </div>
                <div className="p-2 rounded-lg bg-bg border border-border group-hover:scale-110 transition-transform">
                   <stat.icon className="h-4 w-4 text-text-muted" />
                </div>
                <div className="text-2xl sm:text-3xl font-serif italic text-text-primary">
                  {stat.decimal ? (
                      <><CountUp end={stat.value} duration={3} decimals={1} />{stat.suffix}</>
                  ) : (
                      <CountUp end={stat.value} duration={3} />
                  )}
                </div>
                <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest">{stat.label}</p>
              </div>
            </TiltedCard>
          </FadeUp>
        ))}
      </div>

      {/* SEO Optimized Features Section */}
      <div className="max-w-4xl mx-auto mt-24 text-center">
        <FadeUp>
          <h2 className="text-2xl sm:text-3xl font-serif italic text-text-primary mb-8">Why Teams Choose Changelog AI</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left font-mono text-sm sm:text-base text-text-muted mt-8">
            <li className="flex items-start gap-4 bg-bg-elevated/20 p-6 rounded-2xl border border-border/50 hover:border-accent/30 transition-colors">
              <Clock className="h-6 w-6 text-accent shrink-0 mt-0.5" />
              <span>Save 30+ minutes per release cycle on manual changelog writing</span>
            </li>
            <li className="flex items-start gap-4 bg-bg-elevated/20 p-6 rounded-2xl border border-border/50 hover:border-accent/30 transition-colors">
              <GitCommit className="h-6 w-6 text-accent shrink-0 mt-0.5" />
              <span>Supports GitHub, GitLab, and Bitbucket commit formats</span>
            </li>
            <li className="flex items-start gap-4 bg-bg-elevated/20 p-6 rounded-2xl border border-border/50 hover:border-accent/30 transition-colors">
              <Layers className="h-6 w-6 text-accent shrink-0 mt-0.5" />
              <span>Generates developer-friendly semantic versioning notes automatically</span>
            </li>
            <li className="flex items-start gap-4 bg-bg-elevated/20 p-6 rounded-2xl border border-border/50 hover:border-accent/30 transition-colors">
              <Users className="h-6 w-6 text-accent shrink-0 mt-0.5" />
              <span>Built for solo developers and teams shipping multiple releases per week</span>
            </li>
          </ul>
        </FadeUp>
      </div>
    </section>
  )
}
