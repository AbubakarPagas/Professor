import Link from 'next/link'
import { Mail, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ContactCTASection() {
  return (
    <section className="section-padding bg-white" aria-labelledby="contact-cta-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl gradient-gold p-12 text-center text-white shadow-2xl shadow-gold-500/30">
          <Mail className="h-12 w-12 mx-auto mb-4 opacity-90" aria-hidden="true" />
          <h2
            id="contact-cta-heading"
            className="text-3xl sm:text-4xl font-bold font-serif mb-4"
          >
            Get in Touch
          </h2>
          <p className="text-white/90 max-w-lg mx-auto mb-8 text-lg">
            For research collaborations, speaking engagements, academic inquiries,
            or media requests — reach out directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-gold-700 hover:bg-white/90 font-semibold shadow-lg"
            >
              <Link href="/contact">
                Send a Message
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white/10 hover:border-white/60"
            >
              <a href="mailto:contact@profdauda.com">
                <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                Email Directly
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
