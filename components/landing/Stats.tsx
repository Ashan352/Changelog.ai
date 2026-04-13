'use client'
import { useState, useEffect } from 'react'
import { GitCommit, Clock, Users, Zap } from 'lucide-react'
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
    { label: 'Changelogs generated', value: data.totalGenerations, icon: GitCommit },
    { label: 'Avg processing time', value: data.avgTime, icon: Clock, suffix: 's', decimal: true },
    { label: 'Early adopters', value: data.userCount, icon: Users },
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
    </section>
  )
}
