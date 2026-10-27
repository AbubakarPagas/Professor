/**
 * Firestore data-access layer.
 * All reads/writes for the public site and admin CMS live here.
 */

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  where,
  limit,
  serverTimestamp,
  Timestamp,
  type DocumentData,
  type QueryConstraint,
  getCountFromServer,
} from 'firebase/firestore'
import { db } from './firebase'
import type {
  SiteProfile,
  Biography,
  SiteSettings,
  ExpertiseArea,
  AdminUser,
  AuditLog,
  AuditAction,
  TimelineEntry,
  Publication,
  Patent,
  Award,
  ResearchProject,
  GalleryAlbum,
  GalleryImage,
  Activity,
  NewsItem,
  MentorshipProgram,
  ContactMessage,
} from '@/types'

// ─── Helpers ──────────────────────────────────────────────────────────────

function toDate(value: unknown): Date | undefined {
  if (!value) return undefined
  if (value instanceof Timestamp) return value.toDate()
  if (value instanceof Date) return value
  if (typeof value === 'string') return new Date(value)
  return undefined
}

function mapDoc<T>(data: DocumentData, id: string): T {
  return {
    ...data,
    id,
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
    // common date fields
    date: toDate(data.date),
    endDate: toDate(data.endDate),
    publishedAt: toDate(data.publishedAt),
    eventDate: toDate(data.eventDate),
  } as T
}

// ─── Collection names ─────────────────────────────────────────────────────

// ─── Collection names ─────────────────────────────────────────────────────

const C = {
  profile:      'siteProfile',
  siteSettings: 'siteSettings',
  timeline:     'timeline',
  expertise:    'expertise',
  publications: 'publications',
  patents:      'patents',
  awards:       'awards',
  research:     'research',
  projects:     'projects',
  albums:       'galleryAlbums',
  images:       'galleryImages',
  activities:   'activities',
  news:         'news',
  mentorship:   'mentorshipPrograms',
  contact:      'contactMessages',
  users:        'adminUsers',
  auditLogs:    'auditLogs',
} as const

// ─── Site Profile / Biography ─────────────────────────────────────────────

export async function getSiteProfile(): Promise<SiteProfile | null> {
  const snap = await getDoc(doc(db, C.profile, 'main'))
  if (!snap.exists()) return null
  return mapDoc<SiteProfile>(snap.data(), snap.id)
}

/** Alias used by admin biography editor */
export const getBiography = getSiteProfile

export async function upsertSiteProfile(data: Omit<SiteProfile, 'id' | 'createdAt' | 'updatedAt'>) {
  await setDoc(
    doc(db, C.profile, 'main'),
    { ...data, updatedAt: serverTimestamp() },
    { merge: true }
  )
}

/** Alias used by admin biography editor */
export const upsertBiography = upsertSiteProfile

// ─── Timeline ─────────────────────────────────────────────────────────────

export async function getTimeline(): Promise<TimelineEntry[]> {
  const q = query(collection(db, C.timeline), orderBy('year', 'desc'), orderBy('order', 'asc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => mapDoc<TimelineEntry>(d.data(), d.id))
}

export async function createTimelineEntry(data: Omit<TimelineEntry, 'id' | 'createdAt' | 'updatedAt'>) {
  return addDoc(collection(db, C.timeline), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
}

export async function updateTimelineEntry(id: string, data: Partial<TimelineEntry>) {
  return updateDoc(doc(db, C.timeline, id), { ...data, updatedAt: serverTimestamp() })
}

export async function deleteTimelineEntry(id: string) {
  return deleteDoc(doc(db, C.timeline, id))
}

// ─── Publications ─────────────────────────────────────────────────────────

export async function getPublications(): Promise<Publication[]> {
  const q = query(collection(db, C.publications), orderBy('year', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => mapDoc<Publication>(d.data(), d.id))
}

export async function getFeaturedPublications(n = 5): Promise<Publication[]> {
  const q = query(
    collection(db, C.publications),
    where('featured', '==', true),
    orderBy('year', 'desc'),
    limit(n)
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => mapDoc<Publication>(d.data(), d.id))
}

export async function createPublication(data: Omit<Publication, 'id' | 'createdAt' | 'updatedAt'>) {
  return addDoc(collection(db, C.publications), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
}

export async function updatePublication(id: string, data: Partial<Publication>) {
  return updateDoc(doc(db, C.publications, id), { ...data, updatedAt: serverTimestamp() })
}

export async function deletePublication(id: string) {
  return deleteDoc(doc(db, C.publications, id))
}

// ─── Patents ──────────────────────────────────────────────────────────────

export async function getPatents(): Promise<Patent[]> {
  const q = query(collection(db, C.patents), orderBy('year', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => mapDoc<Patent>(d.data(), d.id))
}

export async function createPatent(data: Omit<Patent, 'id' | 'createdAt' | 'updatedAt'>) {
  return addDoc(collection(db, C.patents), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
}

export async function updatePatent(id: string, data: Partial<Patent>) {
  return updateDoc(doc(db, C.patents, id), { ...data, updatedAt: serverTimestamp() })
}

export async function deletePatent(id: string) {
  return deleteDoc(doc(db, C.patents, id))
}

// ─── Awards ───────────────────────────────────────────────────────────────

export async function getAwards(): Promise<Award[]> {
  const q = query(collection(db, C.awards), orderBy('year', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => mapDoc<Award>(d.data(), d.id))
}

export async function createAward(data: Omit<Award, 'id' | 'createdAt' | 'updatedAt'>) {
  return addDoc(collection(db, C.awards), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
}

export async function updateAward(id: string, data: Partial<Award>) {
  return updateDoc(doc(db, C.awards, id), { ...data, updatedAt: serverTimestamp() })
}

export async function deleteAward(id: string) {
  return deleteDoc(doc(db, C.awards, id))
}

// ─── Research ─────────────────────────────────────────────────────────────

export async function getResearchProjects(): Promise<ResearchProject[]> {
  const q = query(collection(db, C.research), orderBy('startYear', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => mapDoc<ResearchProject>(d.data(), d.id))
}

export async function getFeaturedResearch(n = 4): Promise<ResearchProject[]> {
  const q = query(
    collection(db, C.research),
    where('featured', '==', true),
    orderBy('startYear', 'desc'),
    limit(n)
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => mapDoc<ResearchProject>(d.data(), d.id))
}

export async function createResearchProject(data: Omit<ResearchProject, 'id' | 'createdAt' | 'updatedAt'>) {
  return addDoc(collection(db, C.research), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
}

export async function updateResearchProject(id: string, data: Partial<ResearchProject>) {
  return updateDoc(doc(db, C.research, id), { ...data, updatedAt: serverTimestamp() })
}

export async function deleteResearchProject(id: string) {
  return deleteDoc(doc(db, C.research, id))
}

// ─── Gallery Albums ───────────────────────────────────────────────────────

export async function getGalleryAlbums(publishedOnly = true): Promise<GalleryAlbum[]> {
  const constraints: QueryConstraint[] = [orderBy('order', 'asc')]
  if (publishedOnly) constraints.unshift(where('published', '==', true))
  const snap = await getDocs(query(collection(db, C.albums), ...constraints))
  return snap.docs.map(d => mapDoc<GalleryAlbum>(d.data(), d.id))
}

export async function getGalleryAlbumBySlug(slug: string): Promise<GalleryAlbum | null> {
  const q = query(collection(db, C.albums), where('slug', '==', slug), limit(1))
  const snap = await getDocs(q)
  if (snap.empty) return null
  return mapDoc<GalleryAlbum>(snap.docs[0].data(), snap.docs[0].id)
}

export async function getGalleryAlbumById(id: string): Promise<GalleryAlbum | null> {
  const snap = await getDoc(doc(db, C.albums, id))
  if (!snap.exists()) return null
  return mapDoc<GalleryAlbum>(snap.data(), snap.id)
}

export async function createGalleryAlbum(data: Omit<GalleryAlbum, 'id' | 'createdAt' | 'updatedAt'>) {
  return addDoc(collection(db, C.albums), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
}

export async function updateGalleryAlbum(id: string, data: Partial<GalleryAlbum>) {
  return updateDoc(doc(db, C.albums, id), { ...data, updatedAt: serverTimestamp() })
}

export async function deleteGalleryAlbum(id: string) {
  return deleteDoc(doc(db, C.albums, id))
}

// ─── Gallery Images ───────────────────────────────────────────────────────

export async function getGalleryImages(albumId: string): Promise<GalleryImage[]> {
  const q = query(
    collection(db, C.images),
    where('albumId', '==', albumId),
    orderBy('order', 'asc')
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => mapDoc<GalleryImage>(d.data(), d.id))
}

export async function getFeaturedImages(n = 8): Promise<GalleryImage[]> {
  const q = query(
    collection(db, C.images),
    where('featured', '==', true),
    limit(n)
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => mapDoc<GalleryImage>(d.data(), d.id))
}

export async function createGalleryImage(data: Omit<GalleryImage, 'id' | 'createdAt' | 'updatedAt'>) {
  return addDoc(collection(db, C.images), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
}

export async function updateGalleryImage(id: string, data: Partial<GalleryImage>) {
  return updateDoc(doc(db, C.images, id), { ...data, updatedAt: serverTimestamp() })
}

export async function deleteGalleryImage(id: string) {
  return deleteDoc(doc(db, C.images, id))
}

// ─── Activities ───────────────────────────────────────────────────────────

export async function getActivities(publishedOnly = true): Promise<Activity[]> {
  const constraints: QueryConstraint[] = [orderBy('date', 'desc')]
  if (publishedOnly) constraints.unshift(where('status', '==', 'published'))
  const snap = await getDocs(query(collection(db, C.activities), ...constraints))
  return snap.docs.map(d => mapDoc<Activity>(d.data(), d.id))
}

export async function getActivityBySlug(slug: string): Promise<Activity | null> {
  const q = query(collection(db, C.activities), where('slug', '==', slug), limit(1))
  const snap = await getDocs(q)
  if (snap.empty) return null
  return mapDoc<Activity>(snap.docs[0].data(), snap.docs[0].id)
}

export async function getFeaturedActivities(n = 3): Promise<Activity[]> {
  const q = query(
    collection(db, C.activities),
    where('status', '==', 'published'),
    where('featured', '==', true),
    orderBy('date', 'desc'),
    limit(n)
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => mapDoc<Activity>(d.data(), d.id))
}

export async function createActivity(data: Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>) {
  return addDoc(collection(db, C.activities), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
}

export async function updateActivity(id: string, data: Partial<Activity>) {
  return updateDoc(doc(db, C.activities, id), { ...data, updatedAt: serverTimestamp() })
}

export async function deleteActivity(id: string) {
  return deleteDoc(doc(db, C.activities, id))
}

// ─── News ─────────────────────────────────────────────────────────────────

export async function getNewsItems(publishedOnly = true): Promise<NewsItem[]> {
  const constraints: QueryConstraint[] = [orderBy('publishedAt', 'desc')]
  if (publishedOnly) constraints.unshift(where('published', '==', true))
  const snap = await getDocs(query(collection(db, C.news), ...constraints))
  return snap.docs.map(d => mapDoc<NewsItem>(d.data(), d.id))
}

export async function getNewsItemBySlug(slug: string): Promise<NewsItem | null> {
  const q = query(collection(db, C.news), where('slug', '==', slug), limit(1))
  const snap = await getDocs(q)
  if (snap.empty) return null
  return mapDoc<NewsItem>(snap.docs[0].data(), snap.docs[0].id)
}

export async function createNewsItem(data: Omit<NewsItem, 'id' | 'createdAt' | 'updatedAt'>) {
  return addDoc(collection(db, C.news), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
}

export async function updateNewsItem(id: string, data: Partial<NewsItem>) {
  return updateDoc(doc(db, C.news, id), { ...data, updatedAt: serverTimestamp() })
}

export async function deleteNewsItem(id: string) {
  return deleteDoc(doc(db, C.news, id))
}

// ─── Mentorship ───────────────────────────────────────────────────────────

export async function getMentorshipPrograms(): Promise<MentorshipProgram[]> {
  const q = query(collection(db, C.mentorship), orderBy('order', 'asc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => mapDoc<MentorshipProgram>(d.data(), d.id))
}

export async function createMentorshipProgram(data: Omit<MentorshipProgram, 'id' | 'createdAt' | 'updatedAt'>) {
  return addDoc(collection(db, C.mentorship), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
}

export async function updateMentorshipProgram(id: string, data: Partial<MentorshipProgram>) {
  return updateDoc(doc(db, C.mentorship, id), { ...data, updatedAt: serverTimestamp() })
}

export async function deleteMentorshipProgram(id: string) {
  return deleteDoc(doc(db, C.mentorship, id))
}

// ─── Contact messages ─────────────────────────────────────────────────────

export async function getContactMessages(): Promise<ContactMessage[]> {
  const q = query(collection(db, C.contact), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => mapDoc<ContactMessage>(d.data(), d.id))
}

export async function createContactMessage(data: Omit<ContactMessage, 'id' | 'createdAt' | 'updatedAt' | 'read' | 'status'>) {
  return addDoc(collection(db, C.contact), {
    ...data,
    read: false,
    status: 'new',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function markMessageRead(id: string) {
  return updateDoc(doc(db, C.contact, id), { read: true, status: 'read', updatedAt: serverTimestamp() })
}

export async function updateContactStatus(id: string, status: ContactMessage['status']) {
  return updateDoc(doc(db, C.contact, id), {
    status,
    read: status !== 'new',
    updatedAt: serverTimestamp(),
  })
}

export async function deleteContactMessage(id: string) {
  return deleteDoc(doc(db, C.contact, id))
}

// ─── Site Settings ────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
  const snap = await getDoc(doc(db, C.siteSettings, 'main'))
  if (!snap.exists()) return null
  return mapDoc<SiteSettings>(snap.data(), snap.id)
}

export async function upsertSiteSettings(data: Omit<SiteSettings, 'id' | 'createdAt' | 'updatedAt'>) {
  await setDoc(
    doc(db, C.siteSettings, 'main'),
    { ...data, updatedAt: serverTimestamp() },
    { merge: true }
  )
}

// ─── Expertise ────────────────────────────────────────────────────────────

export async function getExpertiseAreas(): Promise<ExpertiseArea[]> {
  const q = query(collection(db, C.expertise), orderBy('order', 'asc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => mapDoc<ExpertiseArea>(d.data(), d.id))
}

export async function createExpertiseArea(data: Omit<ExpertiseArea, 'id' | 'createdAt' | 'updatedAt'>) {
  return addDoc(collection(db, C.expertise), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
}

export async function updateExpertiseArea(id: string, data: Partial<ExpertiseArea>) {
  return updateDoc(doc(db, C.expertise, id), { ...data, updatedAt: serverTimestamp() })
}

export async function deleteExpertiseArea(id: string) {
  return deleteDoc(doc(db, C.expertise, id))
}

// ─── Admin Users ──────────────────────────────────────────────────────────

export async function getAdminUsers(): Promise<AdminUser[]> {
  const q = query(collection(db, C.users), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => mapDoc<AdminUser>(d.data(), d.id))
}

export async function getAdminUserByUid(uid: string): Promise<AdminUser | null> {
  const q = query(collection(db, C.users), where('uid', '==', uid), limit(1))
  const snap = await getDocs(q)
  if (snap.empty) return null
  return mapDoc<AdminUser>(snap.docs[0].data(), snap.docs[0].id)
}

export async function createAdminUser(data: Omit<AdminUser, 'id' | 'createdAt' | 'updatedAt'>) {
  // Use uid as document ID so lookups are O(1)
  await setDoc(doc(db, C.users, data.uid), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function updateAdminUser(uid: string, data: Partial<AdminUser>) {
  return updateDoc(doc(db, C.users, uid), { ...data, updatedAt: serverTimestamp() })
}

export async function deleteAdminUser(uid: string) {
  return deleteDoc(doc(db, C.users, uid))
}

// ─── Audit Logs ───────────────────────────────────────────────────────────

export async function getAuditLogs(limitCount = 100): Promise<AuditLog[]> {
  const q = query(
    collection(db, C.auditLogs),
    orderBy('timestamp', 'desc'),
    limit(limitCount)
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({
    ...d.data(),
    id: d.id,
    timestamp: toDate(d.data().timestamp) ?? new Date(),
    createdAt: toDate(d.data().createdAt),
    updatedAt: toDate(d.data().updatedAt),
  } as AuditLog))
}

export async function createAuditLog(data: {
  actorUid: string
  actorEmail: string
  action: AuditAction
  collection: string
  documentId?: string
  documentTitle?: string
  details?: string
}) {
  return addDoc(collection(db, C.auditLogs), {
    ...data,
    timestamp: serverTimestamp(),
    createdAt: serverTimestamp(),
  })
}

// ─── Dashboard counts ─────────────────────────────────────────────────────

export interface DashboardCounts {
  publications: number
  patents: number
  awards: number
  research: number
  activities: number
  activitiesDraft: number
  news: number
  newsDraft: number
  albums: number
  images: number
  messages: number
  messagesUnread: number
}

export async function getDashboardCounts(): Promise<DashboardCounts> {
  const [
    pubSnap, patSnap, awardSnap, resSnap,
    actSnap, actDraftSnap,
    newsSnap, newsDraftSnap,
    albSnap, imgSnap,
    msgSnap, msgUnreadSnap,
  ] = await Promise.all([
    getCountFromServer(collection(db, C.publications)),
    getCountFromServer(collection(db, C.patents)),
    getCountFromServer(collection(db, C.awards)),
    getCountFromServer(collection(db, C.research)),
    getCountFromServer(query(collection(db, C.activities), where('status', '==', 'published'))),
    getCountFromServer(query(collection(db, C.activities), where('status', '==', 'draft'))),
    getCountFromServer(query(collection(db, C.news), where('published', '==', true))),
    getCountFromServer(query(collection(db, C.news), where('published', '==', false))),
    getCountFromServer(collection(db, C.albums)),
    getCountFromServer(collection(db, C.images)),
    getCountFromServer(collection(db, C.contact)),
    getCountFromServer(query(collection(db, C.contact), where('read', '==', false))),
  ])

  return {
    publications:    pubSnap.data().count,
    patents:         patSnap.data().count,
    awards:          awardSnap.data().count,
    research:        resSnap.data().count,
    activities:      actSnap.data().count,
    activitiesDraft: actDraftSnap.data().count,
    news:            newsSnap.data().count,
    newsDraft:       newsDraftSnap.data().count,
    albums:          albSnap.data().count,
    images:          imgSnap.data().count,
    messages:        msgSnap.data().count,
    messagesUnread:  msgUnreadSnap.data().count,
  }
}

// ─── Projects (ResearchProject alias for the Projects section) ────────────

export const getProjects = getResearchProjects
export const createProject = createResearchProject
export const updateProject = updateResearchProject
export const deleteProject = deleteResearchProject
