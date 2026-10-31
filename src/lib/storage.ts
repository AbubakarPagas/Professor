/**
 * Firebase Storage helpers
 */

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import { getFirebaseStorage } from './firebase'

export type UploadProgressCallback = (progress: number) => void

/**
 * Upload a file to Firebase Storage and return its public download URL.
 * @param file        The File object to upload
 * @param path        Storage path (e.g. "gallery/photo.jpg")
 * @param onProgress  Optional progress callback (0–100)
 */
export async function uploadFile(
  file: File,
  path: string,
  onProgress?: UploadProgressCallback
): Promise<string> {
  const storage = getFirebaseStorage()
  const storageRef = ref(storage, path)
  const uploadTask = uploadBytesResumable(storageRef, file)

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        onProgress?.(progress)
      },
      error => reject(error),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref)
        resolve(url)
      }
    )
  })
}

/**
 * Delete a file from Firebase Storage by its full storage path or download URL.
 */
export async function deleteFile(pathOrUrl: string): Promise<void> {
  const storage = getFirebaseStorage()
  // If it is a full download URL, extract the path portion
  const storageRef = pathOrUrl.startsWith('https://')
    ? ref(storage, decodeURIComponent(new URL(pathOrUrl).pathname.split('/o/')[1].split('?')[0]))
    : ref(storage, pathOrUrl)
  await deleteObject(storageRef)
}

/**
 * Generate a unique storage path for an uploaded file.
 */
export function buildStoragePath(folder: string, file: File): string {
  const ext = file.name.split('.').pop() ?? 'bin'
  const timestamp = Date.now()
  return `${folder}/${timestamp}.${ext}`
}
