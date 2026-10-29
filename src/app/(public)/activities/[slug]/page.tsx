import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, MapPin, Building2, Users, ExternalLink, Tag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  serverGetActivityBySlug,
  serverGetActivitySlugs,
} from '@/lib/firestore-server'
import { formatDate } from '@/lib/utils'
import type { ActivityCategory } from '@/types'

const CAT_LABEL: Record<ActivityCategory, string> = {
  conference: 'Conference', workshop: 'Workshop', lecture: 'Lecture',
  award_ceremony: 'Award Ceremony', field_visit: 'Field Visit',
  collaboration: 'Collaboration', entrepreneurship: 'Entrepreneurship',
  mentorship: 'Mentorship', community: 'Community', other: 'Other',
}

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await serverGetActivitySlugs()
  return slugs.map(slug => ({ slug }))
}

export const dynamicParams = true

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const activity = await serverGetActivityBySlug(slug)
  if (!activity) return { title: 'Activity Not Found' }
  return {
    title: activity.seoTitle ?? activity.title,
    description: activity.seoDescription ?? activity.summary,
    openGraph: {
      title: activity.title,
      description: activity.summary,
      images: activity.coverImageUrl ? [activity.coverImageUrl] : [],
    },
  }
}

export default async function ActivityDetailPage({ params }: Props) {
  const { slug } = await params
  const activity = await serverGetActivityBySlug(slug)
  if (!activity || activity.status !== 'published') notFound()

  return (
    <div className="bg-ivory-100 min-h-screen">
      {/* Nav header */}
      <div className="bg-navy-700 pt-[59px]">
        <div className="container py-8">
          <Button asChild variant="ghost" size="sm"
            className="text-white/60 hover:text-white hover:bg-white/10 mb-4">
            <Link href="/activities">
              <ArrowLeft className="mr-1.5 h-4 w-4" aria-hidden="true" /> Back to Activities
            </Link>
          </Button>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="gold" className="text-[11px]">{CAT_LABEL[activity.category]}</Badge>
            {activity.featured && <Badge variant="secondary" className="text-[11px]">Featured</Badge>}
          </div>
          <h1 className="font-serif font-bold text-white text-2xl sm:text-3xl leading-snug mb-3 max-w-3xl">
            {activity.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-xs text-white/50">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              {formatDate(activity.date)}
              {activity.endDate && ` – ${formatDate(activity.endDate)}`}
            </span>
            {activity.venue && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {activity.venue}
              </span>
            )}
            {activity.organisingInstitution && (
              <span className="flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                {activity.organisingInstitution}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Main content */}
          <div className="lg:col-span-2">
            {activity.coverImageUrl && (
              <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden mb-8 shadow-card">
                <Image
                  src={activity.coverImageUrl}
                  alt={activity.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 66vw"
                />
              </div>
            )}

            {/* Excerpt / summary */}
            <p className="text-lg text-charcoal/75 leading-relaxed mb-8 font-medium border-l-4 border-gold-400 pl-5">
              {activity.summary}
            </p>

            {/* Body */}
            <div
              className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-navy-700 prose-a:text-gold-500 prose-strong:text-navy-700"
              dangerouslySetInnerHTML={{ __html: activity.report }}
            />

            {/* Gallery images */}
            {activity.galleryImageUrls && activity.galleryImageUrls.length > 0 && (
              <div className="mt-10">
                <h2 className="font-semibold text-navy-700 text-sm uppercase tracking-wider mb-4">
                  Event Gallery
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {activity.galleryImageUrls.map((url, i) => (
                    <div key={i} className="relative aspect-square rounded-md overflow-hidden bg-navy-50">
                      <Image
                        src={url}
                        alt={`${activity.title} — image ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width:640px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* Tags */}
            {activity.tags.length > 0 && (
              <div className="card-base p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-charcoal/50 mb-3 flex items-center gap-1.5">
                  <Tag className="h-3.5 w-3.5" aria-hidden="true" /> Tags
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {activity.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-[11px]">{tag}</Badge>
                  ))}
                </div>
              </div>
            )}

            {/* People / organisations */}
            {(activity.relatedPeople?.length || activity.relatedOrgs?.length) ? (
              <div className="card-base p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-charcoal/50 mb-3 flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" aria-hidden="true" /> Related
                </h3>
                {activity.relatedPeople?.map(p => (
                  <p key={p} className="text-sm text-charcoal/70 mb-0.5">{p}</p>
                ))}
                {activity.relatedOrgs?.map(o => (
                  <p key={o} className="text-sm text-charcoal/55 mb-0.5 italic">{o}</p>
                ))}
              </div>
            ) : null}

            {/* External links */}
            {activity.externalLinks && activity.externalLinks.length > 0 && (
              <div className="card-base p-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-charcoal/50 mb-3 flex items-center gap-1.5">
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /> Links
                </h3>
                <ul className="space-y-2">
                  {activity.externalLinks.map(link => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-navy-700 hover:text-gold-500 transition-colors flex items-center gap-1.5"
                      >
                        {link.label}
                        <ExternalLink className="h-3 w-3 opacity-50" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
