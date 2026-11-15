'use client'
// Shared Framer Motion animation variants for consistent, professional animations.

export const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
}

export const slideLeft = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0 },
}

export const slideRight = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0 },
}

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1 },
}

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0 } },
}

export const staggerItem = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export const VIEWPORT = { once: true, margin: '-80px' } as const
