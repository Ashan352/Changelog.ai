'use client'
import { cn } from "@/lib/utils"
import { Marquee } from "@/components/ui/marquee"

const reviews = [
  {
    name: "Alex Rivera",
    username: "@arivera_dev",
    body: "Finally, a way to build changelogs that doesn't feel like a chore. The AI categorization is spooky good.",
    img: "https://avatar.vercel.sh/alex",
  },
  {
    name: "Sarah Chen",
    username: "@sarah_designs",
    body: "The premium editorial vibe of the generated docs is unmatched. My stakeholders actually read my updates now.",
    img: "https://avatar.vercel.sh/sarah",
  },
  {
    name: "Marcus Thorne",
    username: "@m_thorne",
    body: "Connected my GitHub and had a professional changelog in 30 seconds. This is the future of shipping.",
    img: "https://avatar.vercel.sh/marcus",
  },
  {
    name: "Elena Vance",
    username: "@evance_ops",
    body: "Rate limiting and security are top-notch. It's rare to see an AI tool this production-ready.",
    img: "https://avatar.vercel.sh/elena",
  },
  {
    name: "Jameson Lee",
    username: "@jlee_builds",
    body: "The 3D immersive feel of the platform translates directly to the docs it generates. Pure class.",
    img: "https://avatar.vercel.sh/jameson",
  },
  {
    name: "Lila Rose",
    username: "@lilarose",
    body: "No more messy git logs. Just clean, semantic updates that my customers love. Highly recommend.",
    img: "https://avatar.vercel.sh/lila",
  },
]

const firstRow = reviews.slice(0, 3)
const secondRow = reviews.slice(3, 6)
const thirdRow = reviews.slice(0, 3)
const fourthRow = reviews.slice(3, 6)

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string
  name: string
  username: string
  body: string
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-2xl border p-6 transition-all",
        "border-border bg-bg-surface/50 hover:bg-bg-elevated/80 hover:scale-[1.02] hover:shadow-xl hover:border-accent/30",
        "backdrop-blur-sm"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <img className="rounded-full border border-border" width="40" height="40" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-xs font-mono font-bold text-text-primary uppercase tracking-wider">
            {name}
          </figcaption>
          <p className="text-[10px] font-mono text-accent uppercase tracking-widest">{username}</p>
        </div>
      </div>
      <blockquote className="mt-4 text-[13px] leading-relaxed text-text-secondary italic">"{body}"</blockquote>
    </figure>
  )
}

export function GallerySection() {
  return (
    <section className="relative h-[700px] sm:h-[900px] w-full flex flex-col items-center justify-center overflow-hidden border-y border-border bg-bg/50">
      <div className="absolute inset-x-0 top-0 pt-20 pb-12 z-20 flex flex-col items-center px-6 text-center pointer-events-none">
         <div className="font-mono text-[10px] text-accent font-bold uppercase tracking-widest mb-3">Community Love</div>
         <h2 className="text-4xl sm:text-6xl font-serif italic text-text-primary mb-2">Loved by teams that ship</h2>
         <p className="text-sm text-text-muted max-w-lg">Join 1,000+ developers automating their release narratives.</p>
      </div>

      <div className="relative flex h-[600px] w-full flex-row items-center justify-center gap-6 overflow-hidden [perspective:1200px] mt-24">
        <div
          className="flex flex-row items-center gap-6"
          style={{
            transform: "rotateX(25deg) rotateY(-15deg) rotateZ(10deg)",
          }}
        >
          <Marquee pauseOnHover vertical className="[--duration:30s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:35s]" vertical>
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee pauseOnHover className="[--duration:25s]" vertical>
            {thirdRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:40s]" vertical>
            {fourthRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
        </div>

        {/* Floating gradient overlays for depth */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg to-transparent"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-bg to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-bg to-transparent"></div>
      </div>
    </section>
  )
}
