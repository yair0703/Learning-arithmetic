import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  Firestore,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  Unsubscribe
} from 'firebase/firestore';
import { StudentProgress } from '../types';
import firebaseConfigJson from '../../firebase-applet-config.json';

const CLOUD_STUDENT_ID_KEY = 'maslulim_cloud_student_id_v1';
const DEFAULT_DOC_ID = 'student_primary';

let appInstance: FirebaseApp | null = null;
let dbInstance: Firestore | null = null;

export function getFirebaseDb(): Firestore | null {
  if (dbInstance) return dbInstance;

  try {
    const config = {
      apiKey: firebaseConfigJson.apiKey,
      authDomain: firebaseConfigJson.authDomain,
      projectId: firebaseConfigJson.projectId,
      storageBucket: firebaseConfigJson.storageBucket,
      messagingSenderId: firebaseConfigJson.messagingSenderId,
      appId: firebaseConfigJson.appId
    };

    if (!config.apiKey || !config.projectId) {
      console.warn('Firebase config missing apiKey or projectId');
      return null;
    }

    appInstance = getApps().length > 0 ? getApp() : initializeApp(config);
    // Use the provisioned firestore database ID
    const databaseId = firebaseConfigJson.firestoreDatabaseId || '(default)';
    dbInstance = getFirestore(appInstance, databaseId);
    return dbInstance;
  } catch (error) {
    console.error('Failed to initialize Firebase Firestore:', error);
    return null;
  }
}

/**
 * Gets or creates a permanent unique Cloud Sync ID for this student/device
 */
export function getStudentCloudId(): string {
  try {
    let id = localStorage.getItem(CLOUD_STUDENT_ID_KEY);
    if (!id || id.trim().length === 0) {
      // Generate a short user-friendly 6-character code (e.g., TAL-4821)
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      id = `MASLUL-${randomNum}`;
      localStorage.setItem(CLOUD_STUDENT_ID_KEY, id);
    }
    return id;
  } catch {
    return DEFAULT_DOC_ID;
  }
}

export function setStudentCloudId(newId: string): void {
  try {
    const clean = newId.trim().toUpperCase();
    if (clean) {
      localStorage.setItem(CLOUD_STUDENT_ID_KEY, clean);
    }
  } catch {
    // ignore
  }
}

export interface CloudSyncResult {
  success: boolean;
  timestamp: string;
  error?: string;
}

/**
 * Saves current student progress to Firestore in the cloud
 */
export async function saveStudentProgressToCloud(
  progress: StudentProgress,
  customCloudId?: string
): Promise<CloudSyncResult> {
  const db = getFirebaseDb();
  if (!db) {
    return { success: false, timestamp: new Date().toISOString(), error: 'מסד הנתונים בענן אינו זמין כרגע' };
  }

  const cloudId = customCloudId || getStudentCloudId();

  try {
    const docRef = doc(db, 'students', cloudId);
    
    // Clean and prepare payload
    const payload = {
      studentId: cloudId,
      totalSolved: progress.totalSolved || 0,
      totalCorrect: progress.totalCorrect || 0,
      totalIncorrect: progress.totalIncorrect || 0,
      timeSpentSeconds: progress.timeSpentSeconds || 0,
      dailyStreak: progress.dailyStreak || 1,
      lastActiveDate: progress.lastActiveDate || new Date().toISOString().slice(0, 10),
      dailyHistory: progress.dailyHistory || {},
      topicsProgress: progress.topicsProgress || {},
      errorLog: (progress.errorLog || []).slice(0, 50), // keep recent 50
      updatedAt: new Date().toISOString()
    };

    await setDoc(docRef, payload, { merge: true });

    return {
      success: true,
      timestamp: new Date().toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'שגיאה בלתי צפויה בשמירה';
    console.error('Error saving progress to Firestore:', err);
    return { success: false, timestamp: new Date().toISOString(), error: errorMsg };
  }
}

/**
 * Loads student progress from Firestore by cloud ID
 */
export async function loadStudentProgressFromCloud(
  customCloudId?: string
): Promise<{ success: boolean; data?: StudentProgress; error?: string }> {
  const db = getFirebaseDb();
  if (!db) {
    return { success: false, error: 'מסד הנתונים בענן אינו זמין' };
  }

  const cloudId = customCloudId || getStudentCloudId();

  try {
    const docRef = doc(db, 'students', cloudId);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      const data = snap.data() as StudentProgress;
      return { success: true, data };
    } else {
      return { success: false, error: 'לא נמצאה רשומת התקדמות עבור מזהה זה בענן' };
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'שגיאה בטעינת נתונים מהענן';
    console.error('Error loading progress from Firestore:', err);
    return { success: false, error: errorMsg };
  }
}

/**
 * Subscribes to real-time cloud updates for a student ID
 */
export function subscribeToStudentCloudProgress(
  onUpdate: (progress: StudentProgress) => void,
  customCloudId?: string
): Unsubscribe | null {
  const db = getFirebaseDb();
  if (!db) return null;

  const cloudId = customCloudId || getStudentCloudId();

  try {
    const docRef = doc(db, 'students', cloudId);
    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as StudentProgress;
        onUpdate(data);
      }
    }, (error) => {
      console.warn('Firestore subscription error:', error);
    });
  } catch (err) {
    console.error('Failed to subscribe to cloud progress:', err);
    return null;
  }
}
