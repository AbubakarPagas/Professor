import type { Metadata } from 'next'
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

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Official website of Professor Mohammed Dauda, FNSE, FNIMechE, MASME — distinguished mechanical engineer, academic leader, researcher, and innovator.',
}

export default async function HomePage() {
  // Fetch all data in parallel — any individual failure falls back gracefully
  const [
    profile,
    expertise,
    timeline,
    featuredResearch,
    allProjects,
    awards,
    activities,
    galleryImages,
    newsItems,
    mentorshipPrograms,
  ] = await Promise.all([
    getSiteProfile().catch(() => null),
    getExpertiseAreas().catch(() => []),
    getTimeline().catch(() => []),
    getFeaturedResearch(6).catch(() => []),
    getResearchProjects().catch(() => []),
    getAwards().catch(() => []),
    getFeaturedActivities(3).catch(() => []),
    getFeaturedImages(6).catch(() => []),
    getNewsItems(true).catch(() => []),
    getMentorshipPrograms().catch(() => []),
  ])

  // Projects: prefer featured ones, fall back to all
  const featuredProjects = allProjects.filter(p => p.featured).slice(0, 4)
  const projectsToShow   = featuredProjects.length > 0 ? featuredProjects : allProjects.slice(0, 4)

  // Research: prefer featured, fall back to all projects slice
  const researchToShow = featuredResearch.length > 0 ? featuredResearch : allProjects.slice(0, 6)

  // Awards: sort by year desc, show up to 4
  const awardsToShow = awards.sort((a, b) => b.year - a.year).slice(0, 4)

  return (
    <>
      <HeroSection profile={profile} />
      <AboutHomeSection profile={profile} expertise={expertise} />
      <TimelineHomeSection entries={timeline} />
      <ResearchHomeSection projects={researchToShow} />
      <ProjectsHomeSection projects={projectsToShow} />
      <AwardsHomeSection awards={awardsToShow} totalCount={awards.length} />
      <ActivitiesHomeSection activities={activities} />
      <GalleryHomeSection images={galleryImages} />
      <NewsHomeSection newsItems={newsItems} />
      <MentorshipHomeSection programs={mentorshipPrograms} profile={profile} />
      <ContactHomeSection profile={profile} />
    </>
  )
}
