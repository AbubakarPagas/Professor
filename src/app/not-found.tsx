import Link from 'next/link'
import { ArrowLeft, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy-700 flex items-center justify-center text-center px-4">
      {/* Top gold line */}
      <div className="fixed top-0 inset-x-0 h-[3px] bg-gold-400" aria-hidden="true" />

      <div className="max-w-md">
        {/* Monogram */}
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-400 mx-auto mb-8">
          <span className="font-serif font-bold text-white text-lg">MD</span>
        </div>

        <p className="font-serif font-bold text-gold-400 text-8xl mb-2">404</p>
        <h1 className="font-serif font-bold text-white text-2xl mb-3">Page Not Found</h1>
        <p className="text-white/60 text-sm leading-relaxed mb-8">
          The page you are looking for does not exist or has been moved. Please return to the home page.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="gold" size="lg">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" /> Return Home
            </Link>
          </Button>
          <Button asChild variant="outline"
            className="border-white/25 text-white hover:bg-white/10 hover:border-white/40 hover:text-white"
            size="lg">
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
