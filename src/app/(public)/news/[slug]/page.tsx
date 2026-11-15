import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  serverGetNewsItemBySlug,
  serverGetNewsSlugs,
} from '@/lib/firestore-server'
import { formatDate } from '@/lib/utils'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = await serverGetNewsSlugs()
  return slugs.map(slug => ({ slug }))
}

export const dynamicParams = true

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const item = await serverGetNewsItemBySlug(slug)
  if (!item) return { title: 'Article Not Found' }
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      images: item.coverImageUrl ? [item.coverImageUrl] : [],
    },
  }
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await serverGetNewsItemBySlug(slug)
  if (!article || !article.published) notFound()

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #f8f6f0 0%, #f0ece3 50%, #ebe6da 100%)' }}>
      <div className="relative bg-navy-900 pt-[62px] overflow-hidden">
        <div className="absolute inset-0 bg-mesh-dark" aria-hidden="true" />
        <div className="absolute inset-0 pattern-circuit opacity-50" aria-hidden="true" />
        <div className="container relative py-10">
          <Button asChild variant="ghost" size="sm"
            className="text-white/60 hover:text-white hover:bg-white/10 mb-5 -ml-2">
            <Link href="/news">
              <ArrowLeft className="mr-1.5 h-4 w-4" aria-hidden="true" /> Back to News
            </Link>
          </Button>
          <div className="flex items-center gap-2 text-xs text-white/50 mb-3">
            <Calendar className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
            <time dateTime={article.publishedAt?.toISOString()}>{formatDate(article.publishedAt)}</time>
            {article.author && <span>· {article.author}</span>}
          </div>
          <h1 className="font-serif font-bold text-white text-2xl sm:text-3xl leading-snug mb-2 max-w-3xl">
            {article.title}
          </h1>
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {article.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-[11px]">
                  <Tag className="h-2.5 w-2.5 mr-1" aria-hidden="true" />{tag}
                </Badge>
              ))}
            </div>
          )}
          <div className="mt-7 h-[2px] w-14 bg-gradient-to-r from-gold-400 to-transparent rounded-full" aria-hidden="true" />
        </div>
      </div>

      <div className="container py-14 max-w-3xl">
        {article.coverImageUrl && (
          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden mb-10 shadow-card-hover">
            <Image
              src={article.coverImageUrl}
              alt={article.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 768px"
            />
          </div>
        )}
        <p className="text-[17px] text-charcoal/80 leading-[1.9] mb-8 border-l-[3px] border-gold-400 pl-6 font-medium">
          {article.excerpt}
        </p>
        <div
          className="prose prose-slate max-w-none prose-headings:font-serif prose-headings:text-navy-700 prose-a:text-gold-500 prose-strong:text-navy-700"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />
      </div>
    </div>
  )
}
