import { StudentProgress } from '../types';
import { saveStudentProgressToCloud, getStudentCloudId } from './firebase';

const DB_NAME = 'MaslulimOfflineDB_v1';
const STORE_NAME = 'sync_queue';
const DB_VERSION = 1;

export interface QueueItem {
  id?: number;
  type: 'SAVE_PROGRESS';
  payload: StudentProgress;
  cloudId: string;
  timestamp: number;
  attempts: number;
}

/**
 * Open or create IndexedDB instance for offline queue
 */
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported in this environment'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        store.createIndex('timestamp', 'timestamp', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Adds an item to the IndexedDB offline queue
 */
export async function enqueueOfflineChange(
  progress: StudentProgress,
  customCloudId?: string
): Promise<number | null> {
  try {
    const db = await openDB();
    const cloudId = customCloudId || getStudentCloudId();

    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);

      const item: Omit<QueueItem, 'id'> = {
        type: 'SAVE_PROGRESS',
        payload: JSON.parse(JSON.stringify(progress)),
        cloudId,
        timestamp: Date.now(),
        attempts: 0
      };

      const request = store.add(item);
      request.onsuccess = () => resolve(request.result as number);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('Failed to enqueue offline change in IndexedDB:', err);
    return null;
  }
}

/**
 * Retrieves all items currently waiting in the offline queue
 */
export async function getOfflineQueue(): Promise<QueueItem[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('Failed to read IndexedDB queue:', err);
    return [];
  }
}

/**
 * Gets count of pending items in IndexedDB
 */
export async function getOfflineQueueCount(): Promise<number> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.count();

      request.onsuccess = () => resolve(request.result || 0);
      request.onerror = () => reject(request.error);
    });
  } catch {
    return 0;
  }
}

/**
 * Removes an item by ID from IndexedDB
 */
export async function removeQueueItem(id: number): Promise<boolean> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  } catch {
    return false;
  }
}

/**
 * Clears all items from the queue
 */
export async function clearOfflineQueue(): Promise<boolean> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  } catch {
    return false;
  }
}

export interface FlushResult {
  flushedCount: number;
  remainingCount: number;
  success: boolean;
  error?: string;
}

/**
 * Flushes all pending changes from IndexedDB to Firebase Firestore
 */
export async function flushOfflineQueue(): Promise<FlushResult> {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    const count = await getOfflineQueueCount();
    return { flushedCount: 0, remainingCount: count, success: false, error: 'אין חיבור לרשת' };
  }

  const items = await getOfflineQueue();
  if (items.length === 0) {
    return { flushedCount: 0, remainingCount: 0, success: true };
  }

  // Sort by timestamp ascending
  items.sort((a, b) => a.timestamp - b.timestamp);

  // Take latest progress item for each cloudId to optimize network writes
  const latestByCloudId = new Map<string, QueueItem>();
  for (const item of items) {
    latestByCloudId.set(item.cloudId, item);
  }

  let flushedCount = 0;

  for (const [cloudId, latestItem] of latestByCloudId.entries()) {
    try {
      const res = await saveStudentProgressToCloud(latestItem.payload, cloudId);
      if (res.success) {
        // Delete all items for this cloudId up to latestItem.timestamp
        for (const item of items) {
          if (item.cloudId === cloudId && item.id !== undefined && item.timestamp <= latestItem.timestamp) {
            await removeQueueItem(item.id);
            flushedCount++;
          }
        }
      } else {
        console.warn(`Could not sync item for cloudId ${cloudId}:`, res.error);
      }
    } catch (err) {
      console.error('Error during flush of cloud item:', err);
    }
  }

  const remainingCount = await getOfflineQueueCount();
  return {
    flushedCount,
    remainingCount,
    success: remainingCount === 0
  };
}
