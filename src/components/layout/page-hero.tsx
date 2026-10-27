interface PageHeroProps {
  label?: string
  title: string
  subtitle?: string
  description?: string
}

export function PageHero({ label, title, subtitle, description }: PageHeroProps) {
  return (
    <div className="relative bg-navy-800 pt-[63px] overflow-hidden">
      {/* Geometric accent – large faint circle */}
      <div
        className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full border border-white/[0.04] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -right-16 -top-16 h-[320px] w-[320px] rounded-full border border-white/[0.04] pointer-events-none"
        aria-hidden="true"
      />
      {/* Subtle diagonal stripe texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-45deg, #fff 0px, #fff 1px, transparent 1px, transparent 10px)',
        }}
        aria-hidden="true"
      />

      <div className="container relative py-14 lg:py-20">
        {label && (
          <p className="inline-flex items-center gap-2 text-[10.5px] font-bold tracking-[0.2em] uppercase text-gold-400/80 mb-4">
            <span className="block h-px w-5 bg-gold-400/60" aria-hidden="true" />
            {label}
          </p>
        )}
        <h1
          className="font-serif font-bold text-white leading-[1.1] mb-3"
          style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-gold-400/80 text-sm font-semibold tracking-[0.05em] mb-3">{subtitle}</p>
        )}
        {description && (
          <p className="text-white/55 max-w-2xl text-[15px] leading-relaxed">{description}</p>
        )}
        <div className="mt-6 h-[2px] w-12 bg-gradient-to-r from-gold-400 to-gold-200 rounded-full" aria-hidden="true" />
      </div>
    </div>
  )
}
