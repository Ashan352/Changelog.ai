'use client'

import { FadeUp } from "@/components/motion/FadeUp"
import { ArrowRight, BookOpen, Clock, Tag } from "lucide-react"
import Link from "next/link"

const articles = [
  {
    title: "How to automate release notes with Changelog AI",
    excerpt: "Learn how to connect your GitHub repository and generate professional changelogs in seconds.",
    topic: "Tutorial",
    tags: ["Automation", "Workflow", "GitHub"],
    readTime: "5 min",
    href: "/blog/automate-release-notes"
  },
  {
    title: "Semantic Commits: Why they matter for AI",
    excerpt: "Understanding how high-quality commit messages improve AI-generated documentation.",
    topic: "Best Practices",
    tags: ["Git", "AI", "Documentation"],
    readTime: "8 min",
    href: "/blog/semantic-commits"
  },
  {
    title: "Scaling your engineering team with automated docs",
    excerpt: "How fast-moving teams use Changelog AI to stay syncronized without the overhead.",
    topic: "Engineering",
    tags: ["Teams", "Scale", "Productivity"],
    readTime: "6 min",
    href: "/blog/scaling-engineering-teams"
  }
]

export function ResourceSection() {
  return (
    <section id="resources" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <FadeUp>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl mb-4">Master the art of shipping.</h2>
            <p className="text-text-muted text-lg">Guides, insights, and best practices for modern developers.</p>
          </div>
          <Link href="/blog" className="group flex items-center gap-2 text-accent font-mono text-sm uppercase tracking-widest hover:brightness-110 transition-all">
            View All Articles
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article, i) => (
          <FadeUp key={article.title} delay={i * 0.1}>
            <Link href={article.href} className="group block h-full bg-bg-surface border border-border rounded-3xl p-8 hover:bg-bg-hover transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent font-mono text-[10px] uppercase tracking-widest border border-accent/20">
                  {article.topic}
                </span>
                <div className="flex items-center gap-1.5 text-text-muted text-[10px] font-mono uppercase">
                  <Clock className="h-3 w-3" />
                  {article.readTime}
                </div>
              </div>

              <h3 className="text-xl mb-4 group-hover:text-accent transition-colors">{article.title}</h3>
              <p className="text-sm text-text-muted mb-8 line-clamp-3">{article.excerpt}</p>

              <div className="mt-auto pt-6 border-t border-border/50 flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <span key={tag} className="flex items-center gap-1 text-[10px] font-mono text-text-muted">
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* See also suggestion */}
              <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-mono text-accent uppercase tracking-widest flex items-center gap-2">
                  See also: Best Practices <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}
