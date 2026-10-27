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

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Official website of Professor Mohammed Dauda, FNSE, FNIMechE, MASME — distinguished mechanical engineer, academic leader, researcher, and innovator.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutHomeSection />
      <TimelineHomeSection />
      <ResearchHomeSection />
      <ProjectsHomeSection />
      <AwardsHomeSection />
      <ActivitiesHomeSection />
      <GalleryHomeSection />
      <NewsHomeSection />
      <MentorshipHomeSection />
      <ContactHomeSection />
    </>
  )
}
