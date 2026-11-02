'use client'

import type { Metadata } from 'next'
import { useMemo } from 'react'
import { HeroSection } from '@/components/sections/hero'
import { AboutHomeSection } from '@/components/sections/about-home'
import { TimelineHomeSection } from '@/components/sections/timeline-home'
import { ResearchHomeSection } from '@/components/sections/research-home'
import { ProjectsHomeSection } from '@/components/sections/projects-home'
import { AwardsHomeSection } from '@/components/sections/awards-home'
import { ActivitiesHomeSection } from '@/components/sections/activities-home'
import { GalleryHomeSection } from '@/components/sections/gallery-home'
import { NewsHomeSection } from '@/components/sections/news-home'
import { MentorshipHomeSection } from '@/components/sections/mentorship-home'
import { ContactHomeSection } from '@/components/sections/contact-home'
import { useFirestoreData } from '@/hooks/use-firestore'
import {
  getSiteProfile,
  getExpertiseAreas,
  getTimeline,
  getFeaturedResearch,
  getResearchProjects,
  getAwards,
  getFeaturedActivities,
  getFeaturedImages,
  getNewsItems,
  getMentorshipPrograms,
} from '@/lib/firestore'

// Note: metadata export is not supported in client components.
// Page-level metadata is set in the nearest server layout instead.

export default function HomePage() {
  const { data: profile }            = useFirestoreData(getSiteProfile)
  const { data: expertise }          = useFirestoreData(getExpertiseAreas)
  const { data: timeline }           = useFirestoreData(getTimeline)
  const { data: featuredResearch }   = useFirestoreData(() => getFeaturedResearch(6))
  const { data: allProjects }        = useFirestoreData(getResearchProjects)
  const { data: awards }             = useFirestoreData(getAwards)
  const { data: activities }         = useFirestoreData(() => getFeaturedActivities(3))
  const { data: galleryImages }      = useFirestoreData(() => getFeaturedImages(6))
  const { data: newsItems }          = useFirestoreData(() => getNewsItems(true))
  const { data: mentorshipPrograms } = useFirestoreData(getMentorshipPrograms)

  // Projects: prefer featured ones, fall back to all
  const projectsToShow = useMemo(() => {
    const all = allProjects ?? []
    const featured = all.filter(p => p.featured).slice(0, 4)
    return featured.length > 0 ? featured : all.slice(0, 4)
  }, [allProjects])

  // Research: prefer featured, fall back to all projects slice
  const researchToShow = useMemo(() => {
    const featured = featuredResearch ?? []
    return featured.length > 0 ? featured : (allProjects ?? []).slice(0, 6)
  }, [featuredResearch, allProjects])

  // Awards: sort by year desc, show up to 4
  const awardsToShow = useMemo(() => {
    return [...(awards ?? [])].sort((a, b) => b.year - a.year).slice(0, 4)
  }, [awards])

  return (
    <>
      <HeroSection profile={profile ?? null} />
      <AboutHomeSection profile={profile ?? null} expertise={expertise ?? []} />
      <TimelineHomeSection entries={timeline ?? []} />
      <ResearchHomeSection projects={researchToShow} />
      <ProjectsHomeSection projects={projectsToShow} />
      <AwardsHomeSection awards={awardsToShow} totalCount={awards?.length ?? 0} />
      <ActivitiesHomeSection activities={activities ?? []} />
      <GalleryHomeSection images={galleryImages ?? []} />
      <NewsHomeSection newsItems={newsItems ?? []} />
      <MentorshipHomeSection programs={mentorshipPrograms ?? []} profile={profile ?? null} />
      <ContactHomeSection profile={profile ?? null} />
    </>
  )
}
