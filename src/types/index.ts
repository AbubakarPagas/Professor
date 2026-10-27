/**
 * Shared TypeScript types — Prof. Dauda portfolio.
 * All Firestore document shapes live here.
 */

// ─── Base ──────────────────────────────────────────────────────────────────

export interface BaseEntity {
  id: string
  createdAt?: Date
  updatedAt?: Date
}

// ─── Roles ────────────────────────────────────────────────────────────────

export type UserRole = 'superadmin' | 'editor' | 'readonly'

export interface AdminUser extends BaseEntity {
  uid: string            // Firebase Auth UID
  email: string
  displayName?: string
  role: UserRole
  active: boolean
  lastLoginAt?: Date
}

// ─── Audit log ────────────────────────────────────────────────────────────

export type AuditAction =
  | 'create'
  | 'update'
  | 'delete'
  | 'publish'
  | 'unpublish'
  | 'archive'
  | 'role_change'
  | 'site_setting_change'
  | 'login'
  | 'logout'

export interface AuditLog extends BaseEntity {
  actorUid: string
  actorEmail: string
  action: AuditAction
  collection: string
  documentId?: string
  documentTitle?: string
  details?: string
  timestamp: Date
}

// ─── Site settings ────────────────────────────────────────────────────────

export interface SiteSettings extends BaseEntity {
  // SEO
  siteTitle: string
  siteDescription: string
  siteKeywords: string[]
  ogImage?: string
  // Social
  twitterHandle?: string
  linkedIn?: string
  // Contact
  contactEmail?: string
  contactPhone?: string
  // Feature flags
  contactFormEnabled: boolean
  maintenanceMode: boolean
  // Dates
  lastPublishedAt?: Date
}

// ─── Career timeline entries (alias for display) ──────────────────────────

export interface ExpertiseArea extends BaseEntity {
  title: string
  description?: string
  icon?: string            // lucide icon name
  order: number
  active: boolean
}

// ─── Site settings / Biography ────────────────────────────────────────────

/**
 * SiteProfile is the main biography/profile document stored in Firestore.
 * Biography is an alias kept for admin page compatibility.
 */
export interface SiteProfile extends BaseEntity {
  name: string
  title?: string          // single title string (admin form)
  titles: string[]        // ["Professor of Mechanical Engineering", "FNSE", …]
  subtitle?: string
  tagline: string
  shortBio: string        // ≤ 3 sentences, used in meta & snippets
  bio: string             // HTML / rich text  (alias for fullBio)
  fullBio: string         // HTML / rich text
  profileImageUrl?: string
  signatureImageUrl?: string // optional scanned signature for CV use
  // Contact
  email?: string
  phone?: string
  // Institution
  institution?: string
  department?: string
  address?: string
  // Academic profiles
  linkedIn?: string
  researchGate?: string
  googleScholar?: string
  orcid?: string
  // Credentials
  fellowships: string[]       // ["FNSE", "FNIMechE", "MASME"]
  areasOfExpertise: string[]
  // Hero stats
  stats: {
    publications: number
    patents: number
    awards: number
    yearsExperience: number
    studentsSupervised: number
  }
}

/** Alias used by the admin biography editor */
export type Biography = SiteProfile

// ─── Timeline entries ────────────────────────────────────────────────────

export type TimelineType = 'education' | 'appointment' | 'leadership' | 'milestone'

export interface TimelineEntry extends BaseEntity {
  year: number
  endYear?: number
  title: string
  organisation: string
  location?: string
  description?: string
  type: TimelineType
  order: number
}

// ─── Publications ─────────────────────────────────────────────────────────

export type PublicationType =
  | 'journal'
  | 'conference'
  | 'book'
  | 'book_chapter'
  | 'technical_report'
  | 'thesis'

export interface Publication extends BaseEntity {
  title: string
  authors: string
  journal?: string
  conference?: string
  volume?: string
  issue?: string
  pages?: string
  year: number
  doi?: string
  url?: string
  abstract?: string
  type: PublicationType
  featured: boolean
  citations?: number
}

// ─── Patents ──────────────────────────────────────────────────────────────

export type PatentStatus = 'granted' | 'pending' | 'expired'

export interface Patent extends BaseEntity {
  title: string
  inventors: string
  patentNumber?: string
  country: string
  status: PatentStatus
  year: number
  description?: string
  url?: string
}

// ─── Awards ───────────────────────────────────────────────────────────────

export type AwardCategory = 'national' | 'international' | 'fellowship' | 'recognition' | 'academic'

export interface Award extends BaseEntity {
  title: string
  organisation: string
  year: number
  category: AwardCategory
  description?: string
  imageUrl?: string
}

// ─── Research Projects ────────────────────────────────────────────────────

export type ResearchStatus = 'ongoing' | 'completed' | 'planned'

export interface ResearchProject extends BaseEntity {
  title: string
  description: string
  fundingBody?: string
  fundingAmount?: string
  startYear: number
  endYear?: number
  status: ResearchStatus
  collaborators?: string[]
  keywords: string[]
  outcomes?: string
  imageUrl?: string
  featured: boolean
}

// ─── Gallery Albums ───────────────────────────────────────────────────────

export type GalleryCategory =
  | 'conference'
  | 'workshop'
  | 'research'
  | 'award'
  | 'mentorship'
  | 'institutional'
  | 'community'
  | 'portrait'
  | 'other'

export interface GalleryAlbum extends BaseEntity {
  title: string
  slug: string
  description?: string
  coverImageUrl?: string
  category: GalleryCategory
  eventDate?: Date
  venue?: string
  published: boolean
  featured: boolean
  order: number
  imageCount: number          // denormalised for display
}

export interface GalleryImage extends BaseEntity {
  albumId: string
  title: string
  caption?: string
  altText: string
  credit?: string
  imageUrl: string
  thumbnailUrl?: string
  order: number
  featured: boolean
  width?: number
  height?: number
}

// ─── Activities & Events ──────────────────────────────────────────────────

export type ActivityStatus = 'draft' | 'published' | 'archived'

export type ActivityCategory =
  | 'conference'
  | 'workshop'
  | 'lecture'
  | 'award_ceremony'
  | 'field_visit'
  | 'collaboration'
  | 'entrepreneurship'
  | 'mentorship'
  | 'community'
  | 'other'

export interface Activity extends BaseEntity {
  title: string
  slug: string
  summary: string            // Short summary (≤ 200 chars)
  report: string             // Full HTML report
  date: Date
  endDate?: Date
  venue?: string
  organisingInstitution?: string
  relatedPeople?: string[]   // Names
  relatedOrgs?: string[]
  coverImageUrl?: string
  galleryImageUrls?: string[]
  category: ActivityCategory
  externalLinks?: { label: string; url: string }[]
  status: ActivityStatus
  featured: boolean
  seoTitle?: string
  seoDescription?: string
  tags: string[]
}

// ─── News ─────────────────────────────────────────────────────────────────

export interface NewsItem extends BaseEntity {
  title: string
  slug: string
  excerpt: string
  body: string               // HTML
  coverImageUrl?: string
  tags: string[]
  published: boolean
  publishedAt: Date
  author?: string
}

// ─── Mentorship ───────────────────────────────────────────────────────────

export interface MentorshipProgram extends BaseEntity {
  title: string
  description: string
  targetAudience: string
  outcomes?: string
  active: boolean
  imageUrl?: string
  order: number
}

// ─── Contact messages ─────────────────────────────────────────────────────

export type EnquiryCategory =
  | 'speaking'
  | 'mentorship'
  | 'research_collaboration'
  | 'institutional'
  | 'media'
  | 'general'

export type ContactStatus = 'new' | 'read' | 'replied' | 'archived'

export interface ContactMessage extends BaseEntity {
  name: string
  email: string
  organisation?: string
  enquiryCategory: EnquiryCategory
  subject: string
  message: string
  read: boolean
  status: ContactStatus
}

// ─── Navigation ───────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}
