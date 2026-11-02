import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { getSiteProfile } from '@/lib/firestore'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const profile = await getSiteProfile().catch(() => null)

  return (
    <div className="flex min-h-screen flex-col bg-ivory-100">
      <Navbar />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded focus:bg-navy-700 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to main content
      </a>
      <main id="main-content" className="flex-1 pt-[63px]" tabIndex={-1}>
        {children}
      </main>
      <Footer profile={profile} />
    </div>
  )
}
