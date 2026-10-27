# Prof. Mohammed Dauda — Official Portfolio Website

A professional academic portfolio and content management system built with **Next.js 15**, **Firebase**, **Tailwind CSS**, and **TypeScript**.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Directory Structure](#3-directory-structure)
4. [Environment Configuration](#4-environment-configuration)
5. [Firebase Setup](#5-firebase-setup)
6. [Firestore Data Architecture](#6-firestore-data-architecture)
7. [Firestore Security Rules](#7-firestore-security-rules)
8. [Firebase Storage Rules](#8-firebase-storage-rules)
9. [Required Firestore Indexes](#9-required-firestore-indexes)
10. [Initial Admin Setup](#10-initial-admin-setup)
11. [Running Locally](#11-running-locally)
12. [Deployment](#12-deployment)
13. [Admin Dashboard Guide](#13-admin-dashboard-guide)
14. [Manual Testing Checklist](#14-manual-testing-checklist)

---

## 1. Project Overview

This is the official website of **Professor Mohammed Dauda**, FNSE, FNIMechE, MASME — a distinguished mechanical engineer, academic leader, researcher, and innovator. The site serves as:

- A public academic profile with biography, research, publications, patents, awards, and activities.
- A gallery and news hub for events, press, and media.
- A contact portal for speaking, mentorship, and research collaboration enquiries.
- A secure, role-based Content Management System (CMS) at `/admin`.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, React 19) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 + custom design tokens |
| UI Components | Radix UI primitives + class-variance-authority |
| Database | Firebase Firestore (NoSQL) |
| Authentication | Firebase Authentication (email/password) |
| File Storage | Firebase Storage |
| Forms | react-hook-form + Zod validation |
| Icons | Lucide React |
| Deployment | Firebase Hosting / Vercel |

---

## 3. Directory Structure

```
src/
├── app/
│   ├── (public)/          # Public-facing pages (biography, research, etc.)
│   ├── admin/             # Secure CMS (protected by AdminGuard + middleware)
│   ├── globals.css        # Tailwind base + design tokens
│   ├── layout.tsx         # Root layout (AuthProvider + Toaster)
│   ├── robots.ts          # robots.txt generation
│   └── sitemap.ts         # Dynamic XML sitemap
├── components/
│   ├── admin/             # admin-guard, admin-sidebar, data-table
│   ├── layout/            # Navbar, Footer, PageHero
│   ├── providers/         # AuthCookieProvider
│   ├── sections/          # Home page section components
│   └── ui/                # Radix UI primitives (Button, Input, Dialog…)
├── hooks/
│   ├── use-auth-cookie.ts # Keeps auth cookie in sync with Firebase state
│   ├── use-firestore.ts   # Generic data-fetching hook
│   └── use-toast.ts       # Toast notification state
├── lib/
│   ├── auth-context.tsx   # Firebase Auth React context + role helpers
│   ├── firebase.ts        # Firebase app initialisation
│   ├── firestore.ts       # Full Firestore CRUD data-access layer
│   ├── storage.ts         # Firebase Storage upload/delete helpers
│   └── utils.ts           # cn(), slugify(), formatDate(), truncate()
├── middleware.ts           # Edge middleware — server-side admin route gate
└── types/
    └── index.ts           # All shared TypeScript interfaces
```

Root-level files:
```
firestore.rules            # Firestore Security Rules
storage.rules              # Firebase Storage Security Rules
firestore.indexes.json     # Composite index definitions
.env.example               # Environment variable template
```

---

## 4. Environment Configuration

Copy `.env.example` to `.env.local` and fill in every value:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Web API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firestore project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Storage bucket name |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | FCM sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase App ID |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Analytics measurement ID |
| `NEXT_PUBLIC_ADMIN_EMAIL` | Bootstrap admin email (see §10) |
| `NEXT_PUBLIC_SITE_URL` | Production canonical URL (no trailing slash) |

> **Security note:** All `NEXT_PUBLIC_*` variables are bundled into browser code. This is intentional — Firebase Web SDK keys are not secrets. Actual data security is enforced by Firestore Security Rules and Firebase Storage Rules.

---

## 5. Firebase Setup

### 5.1 Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com).
2. Create a new project (or use an existing one).
3. Register a **Web app** → copy the `firebaseConfig` values into `.env.local`.

### 5.2 Enable Authentication

1. Firebase Console → **Authentication** → **Sign-in method**.
2. Enable **Email/Password**.
3. Create the first admin account: **Authentication** → **Users** → **Add user**.
4. Copy the UID shown — you will need it for the initial admin setup.

### 5.3 Create a Firestore database

1. Firebase Console → **Firestore Database** → **Create database**.
2. Choose **Production mode** (rules are deployed separately).
3. Select a region close to your users.

### 5.4 Enable Storage

1. Firebase Console → **Storage** → **Get started**.
2. Choose **Production mode**.
3. Select the same region as Firestore.

### 5.5 Deploy Security Rules

```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Log in
firebase login

# Initialise (if first time — select Firestore and Storage)
firebase init

# Deploy Firestore rules
firebase deploy --only firestore:rules

# Deploy Storage rules
firebase deploy --only storage

# Deploy Firestore indexes
firebase deploy --only firestore:indexes
```

---

## 6. Firestore Data Architecture

### Collection overview

| Collection | Purpose | Key fields |
|---|---|---|
| `siteProfile` | Biography / profile (singleton `main`) | name, bio, stats, fellowships |
| `siteSettings` | Global CMS settings (singleton `main`) | contactFormEnabled, maintenanceMode |
| `timeline` | Career + education timeline entries | year, type, title, organisation, order |
| `expertise` | Areas of expertise | title, description, order, active |
| `publications` | Academic publications | title, authors, year, type, featured |
| `patents` | Patent records | title, inventors, patentNumber, status, year |
| `awards` | Awards and honours | title, organisation, year, category |
| `research` | Research projects | title, status, startYear, keywords, featured |
| `projects` | Consultancy / projects | Same schema as research |
| `galleryAlbums` | Photo album metadata | title, slug, category, published, imageCount |
| `galleryImages` | Individual photos | albumId (FK), imageUrl, altText, order |
| `activities` | Activity & event reports | title, slug, status, date, category |
| `news` | News articles | title, slug, body, published, publishedAt |
| `mentorshipPrograms` | Mentorship programmes | title, description, targetAudience, active |
| `contactMessages` | Contact form submissions | name, email, enquiryCategory, status, read |
| `adminUsers` | Admin accounts | uid (= doc ID), email, role, active |
| `auditLogs` | Administrative audit trail | actorEmail, action, collection, timestamp |

### Key design decisions

- **siteProfile** and **siteSettings** are singleton documents (ID = `"main"`), updated with `setDoc(..., { merge: true })`.
- **galleryImages** reference their parent album via `albumId`. `imageCount` is denormalised onto the album document for fast display without a count query.
- **adminUsers** use the Firebase Auth UID as the document ID — lookups are O(1) without a query.
- **auditLogs** are append-only; no update or delete is permitted by security rules.
- All documents carry `createdAt` and `updatedAt` as Firestore server timestamps.
- Slug fields (`activities.slug`, `news.slug`, `galleryAlbums.slug`) are unique and indexed for fast lookup by slug.

---

## 7. Firestore Security Rules

The rules file is `firestore.rules`. Key principles:

- **Public collections** (siteProfile, timeline, publications, etc.) are world-readable but only writable by authenticated editors or superadmins.
- **Contact messages** — anyone can `create` (the public form), but no one can read their own submission back; only admins can read and delete them.
- **Admin users** — only superadmins can create, update, or delete. A superadmin cannot demote their own account. Privilege escalation (granting `superadmin` role) is prevented at the rules level.
- **Audit logs** — admins can create; only superadmins can read; nobody can update or delete.

Deploy with: `firebase deploy --only firestore:rules`

---

## 8. Firebase Storage Rules

The rules file is `storage.rules`. Key principles:

- All stored files are **publicly readable** (download URLs are served directly).
- **Uploads and deletes** require Firebase Authentication (any signed-in user who reached the upload UI is already guarded by the admin CMS).
- **File type** is validated by MIME type: images must be `image/jpeg|png|webp|gif|svg`.
- **File size** is capped at 10 MB for images and 25 MB for documents.

Deploy with: `firebase deploy --only storage`

---

## 9. Required Firestore Indexes

Composite indexes are defined in `firestore.indexes.json`. They are required for queries that combine `where()` with `orderBy()`. Deploy with:

```bash
firebase deploy --only firestore:indexes
```

Key indexes:

| Collection | Fields |
|---|---|
| activities | status ASC + date DESC |
| activities | status ASC + featured ASC + date DESC |
| news | published ASC + publishedAt DESC |
| galleryAlbums | published ASC + order ASC |
| galleryImages | albumId ASC + order ASC |
| publications | featured ASC + year DESC |
| research | featured ASC + startYear DESC |
| contactMessages | read ASC |
| auditLogs | timestamp DESC |
| timeline | year DESC + order ASC |

---

## 10. Initial Admin Setup

The site has **no default admin account**. You must provision the first superadmin manually. There are two methods:

### Method A — Using the Firestore Console (recommended)

1. Create a Firebase Auth user via **Authentication → Users → Add user** with the admin email and a strong password.
2. Copy the **UID** shown in the Authentication console.
3. In **Firestore → Data**, create a new document:
   - **Collection:** `adminUsers`
   - **Document ID:** paste the UID
   - **Fields:**
     ```
     uid:         <UID string>
     email:       <admin email string>
     displayName: "Professor Dauda" (string, optional)
     role:        "superadmin" (string)
     active:      true (boolean)
     createdAt:   <server timestamp>
     updatedAt:   <server timestamp>
     ```
4. Set `NEXT_PUBLIC_ADMIN_EMAIL` in `.env.local` to the same email as a bootstrap fallback during your first login.
5. Sign in at `/admin/login`.
6. Navigate to `/admin/users` to manage additional admin accounts from the UI.

### Method B — Bootstrap environment variable

If `NEXT_PUBLIC_ADMIN_EMAIL` is set, any Firebase Auth user with that email is treated as a superadmin **even without** an `adminUsers` document. Use this only during initial setup; create the Firestore record and then verify the UI works before clearing this variable in production.

> **Security warning:** Never hardcode admin credentials in source code. Never commit `.env.local`. Use Firebase Console or the Users admin page to manage all accounts.

---

## 11. Running Locally

```bash
# Install dependencies
npm install

# Copy and fill in environment variables
cp .env.example .env.local
# (edit .env.local with your Firebase project values)

# Start the development server
npm run dev
```

Visit `http://localhost:3000` for the public site and `http://localhost:3000/admin` for the CMS.

---

## 12. Deployment

### Firebase Hosting

```bash
npm run build
firebase deploy --only hosting
```

### Vercel

1. Connect the repository in the Vercel dashboard.
2. Add all `NEXT_PUBLIC_*` variables under **Project Settings → Environment Variables**.
3. Deploy. Vercel auto-detects Next.js and configures the build.

After deployment:
- Deploy Firestore rules: `firebase deploy --only firestore:rules`
- Deploy Storage rules:   `firebase deploy --only storage`
- Deploy indexes:         `firebase deploy --only firestore:indexes`

---

## 13. Admin Dashboard Guide

Navigate to `/admin/login` and sign in with your admin credentials.

| Page | Path | Permission |
|---|---|---|
| Dashboard | `/admin` | All admins |
| Biography | `/admin/biography` | Editor+ |
| Career Timeline | `/admin/timeline` | Editor+ |
| Expertise | `/admin/expertise` | Editor+ |
| Publications | `/admin/publications` | Editor+ |
| Research | `/admin/research` | Editor+ |
| Patents | `/admin/patents` | Editor+ |
| Projects | `/admin/projects` | Editor+ |
| Awards | `/admin/awards` | Editor+ |
| Activities | `/admin/activities` | Editor+ |
| Gallery | `/admin/gallery` | Editor+ |
| News | `/admin/news` | Editor+ |
| Mentorship | `/admin/mentorship` | Editor+ |
| Enquiries | `/admin/messages` | All admins |
| Site Settings | `/admin/settings` | Superadmin |
| SEO Settings | `/admin/seo` | Superadmin |
| Administrators | `/admin/users` | Superadmin |
| Audit Log | `/admin/audit` | Superadmin |

**Roles:**

| Role | Capabilities |
|---|---|
| `superadmin` | Full access including user management, site settings, audit log |
| `editor` | Create, edit, publish, delete all content |
| `readonly` | View admin dashboard; no writes |

---

## 14. Manual Testing Checklist

### Public site

- [ ] Home page loads with all sections
- [ ] Navigation links work on desktop and mobile
- [ ] Biography, Research, Publications, Patents, Awards pages display data
- [ ] Activities list and individual activity detail pages work
- [ ] Gallery albums list and individual album lightbox work
- [ ] News list and individual article pages work
- [ ] Contact form submits successfully with valid data
- [ ] Contact form shows validation errors for missing/invalid fields
- [ ] Contact form rejects submission with message under 20 characters
- [ ] Site is fully responsive (mobile, tablet, desktop)
- [ ] Skip-to-content link appears on keyboard focus
- [ ] All images have meaningful alt text
- [ ] Page titles and meta descriptions are unique per page

### Admin authentication

- [ ] Navigating to `/admin` without login redirects to `/admin/login`
- [ ] Navigating to `/admin/biography` without login redirects to `/admin/login`
- [ ] Invalid credentials show an error message
- [ ] Valid credentials log in and redirect to `/admin`
- [ ] Sign Out button signs out and redirects to `/admin/login`
- [ ] After sign-out, pressing Back does not restore admin access

### Content CRUD

- [ ] Biography: load existing data, edit all fields, save changes
- [ ] Biography: upload a profile photo and confirm it appears
- [ ] Timeline: add, edit, and delete entries
- [ ] Publications: add, edit, and delete; mark as featured
- [ ] Research: add, edit, and delete projects
- [ ] Patents: add, edit, and delete
- [ ] Awards: add, edit, and delete
- [ ] Activities: create a draft, publish it, archive it
- [ ] News: create a draft article, publish, unpublish
- [ ] Gallery: create an album, upload photos, edit photo metadata, delete a photo
- [ ] Gallery: delete an album
- [ ] Mentorship: add, edit, and delete programmes

### Publication / workflow

- [ ] Draft activity is not visible on the public site
- [ ] Published activity appears on `/activities`
- [ ] Archived activity is not visible on the public site
- [ ] Unpublished news article is not visible on `/news`

### Contact enquiries

- [ ] Submitted enquiry appears in `/admin/messages`
- [ ] Unread badge count increments
- [ ] Opening an enquiry marks it as read
- [ ] Status can be changed (read → replied → archived)
- [ ] Enquiry can be deleted with confirmation dialog

### Gallery uploads

- [ ] Photos upload with progress indicator
- [ ] Upload is rejected for non-image file types (check Storage rules)
- [ ] `imageCount` on the album updates after upload and deletion

### User / role management (superadmin only)

- [ ] `/admin/users` is accessible to superadmin
- [ ] `/admin/users` shows "Access Restricted" for editor role
- [ ] Adding a user with valid UID and email succeeds
- [ ] A superadmin cannot grant superadmin role as an editor
- [ ] A superadmin cannot delete their own account
- [ ] Role changes appear in the audit log

### Security

- [ ] Direct GET to `/admin/biography` while logged out redirects to login
- [ ] Firestore rules reject unauthenticated writes (test in Firebase Console)
- [ ] Contact form write is rejected if `read != false` or `status != 'new'`
- [ ] Admin users collection is unreadable without a superadmin session

### SEO

- [ ] `/sitemap.xml` returns valid XML with public page URLs
- [ ] `/robots.txt` disallows `/admin/`
- [ ] Admin pages have `<meta name="robots" content="noindex">` header
- [ ] OG tags are set correctly on the home page

### Build & TypeScript

- [ ] `npm run build` completes without errors
- [ ] `npm run lint` completes without errors
- [ ] Empty Firestore (fresh project) does not crash any page
- [ ] Missing optional fields in Firestore documents do not crash any page
