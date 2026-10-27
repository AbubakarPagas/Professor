import type { Metadata } from 'next'
import { AdminLayoutWrapper } from '@/components/admin/admin-layout-wrapper'

export const metadata: Metadata = {
  title: { default: 'Admin', template: '%s | Admin Dashboard' },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>
}
