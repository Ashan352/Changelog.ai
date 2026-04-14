'use client'
import DomeGallery from "@/components/ui/DomeGallery"

export function GallerySection() {
  return (
    <section className="relative h-[600px] sm:h-[800px] border-y border-border overflow-hidden bg-bg-surface/30">
      <div 
        className="absolute inset-x-0 top-0 pt-12 pb-8 z-20 flex flex-col items-center pointer-events-auto px-6 text-center"
        style={{ touchAction: 'pan-y' }}
        onPointerDownCapture={e => e.stopPropagation()}
        onTouchStartCapture={e => e.stopPropagation()}
        onWheelCapture={e => e.stopPropagation()}
      >
         <div className="font-mono text-[10px] text-accent uppercase tracking-widest mb-3">Global Reviews</div>
         <h2 className="text-3xl sm:text-5xl font-serif italic text-text-primary">What they're shipping</h2>
      </div>
      
      <DomeGallery 
        fit={0.65} 
        overlayBlurColor="#fcfdfb" 
        grayscale={false}
        imageBorderRadius="16px"
        openedImageBorderRadius="24px"
        images={[
          { src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop', alt: 'Dev Review 1' },
          { src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2000&auto=format&fit=crop', alt: 'Dev Review 2' },
          { src: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2000&auto=format&fit=crop', alt: 'Dev Review 3' },
          { src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2000&auto=format&fit=crop', alt: 'Dev Review 4' },
          { src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2000&auto=format&fit=crop', alt: 'Dev Review 5' },
          { src: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2000&auto=format&fit=crop', alt: 'Dev Review 6' },
        ]}
      />

      {/* Bottom Mobile Scroll Escape Hatch */}
      <div 
        className="absolute bottom-0 inset-x-0 h-24 z-20 flex flex-col justify-end items-center pointer-events-auto pb-4 md:hidden"
        style={{ touchAction: 'pan-y' }}
        onPointerDownCapture={e => e.stopPropagation()}
        onTouchStartCapture={e => e.stopPropagation()}
        onWheelCapture={e => e.stopPropagation()}
      >
         <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-bg/80 backdrop-blur border border-border shadow-[0_0_12px_rgba(0,0,0,0.5)]">
            <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">Swipe to scroll</span>
         </div>
      </div>
    </section>
  )
}
