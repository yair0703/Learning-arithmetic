import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  Firestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  onSnapshot,
  Unsubscribe
} from 'firebase/firestore';
import {
  getAuth,
  Auth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { StudentProgress, UserProfile, LinkedStudentProfile } from '../types';
import { getInitialProgress } from './storage';
import firebaseConfigJson from '../../firebase-applet-config.json';

const CLOUD_STUDENT_ID_KEY = 'maslulim_cloud_student_id_v1';
const USER_PROFILE_SESSION_KEY = 'maslulim_user_session_v1';
const DEFAULT_DOC_ID = 'student_primary';

let appInstance: FirebaseApp | null = null;
let dbInstance: Firestore | null = null;
let authInstance: Auth | null = null;

export function getFirebaseApp(): FirebaseApp | null {
  if (appInstance) return appInstance;
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
    return appInstance;
  } catch (error) {
    console.error('Failed to initialize Firebase App:', error);
    return null;
  }
}

export function getFirebaseDb(): Firestore | null {
  if (dbInstance) return dbInstance;
  const app = getFirebaseApp();
  if (!app) return null;

  try {
    const databaseId = firebaseConfigJson.firestoreDatabaseId;
    if (databaseId && databaseId !== '(default)') {
      try {
        dbInstance = getFirestore(app, databaseId);
      } catch {
        dbInstance = getFirestore(app);
      }
    } else {
      dbInstance = getFirestore(app);
    }
    return dbInstance;
  } catch (error) {
    console.error('Failed to initialize Firebase Firestore:', error);
    try {
      dbInstance = getFirestore(app);
      return dbInstance;
    } catch {
      return null;
    }
  }
}

export function getFirebaseAuth(): Auth | null {
  if (authInstance) return authInstance;
  const app = getFirebaseApp();
  if (!app) return null;

  try {
    authInstance = getAuth(app);
    return authInstance;
  } catch (error) {
    console.error('Failed to initialize Firebase Auth:', error);
    return null;
  }
}

/**
 * Session storage of current active user role
 */
export function getSavedUserProfile(): UserProfile {
  try {
    const stored = localStorage.getItem(USER_PROFILE_SESSION_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // fallback
  }
  return {
    role: 'guest',
    displayName: 'תלמיד אורח',
    studentCode: getStudentCloudId()
  };
}

export function saveUserProfileToStorage(profile: UserProfile): void {
  try {
    localStorage.setItem(USER_PROFILE_SESSION_KEY, JSON.stringify(profile));
  } catch {
    // ignore
  }
}

export function clearUserProfileStorage(): void {
  try {
    localStorage.removeItem(USER_PROFILE_SESSION_KEY);
  } catch {
    // ignore
  }
}

/**
 * Gets or creates a permanent unique Cloud Sync ID for this student/device
 */
export function getStudentCloudId(): string {
  try {
    let id = localStorage.getItem(CLOUD_STUDENT_ID_KEY);
    if (!id || id.trim().length === 0) {
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
  customCloudId?: string,
  extraMetadata?: { parentId?: string; studentName?: string; studentCode?: string }
): Promise<CloudSyncResult> {
  const db = getFirebaseDb();
  if (!db) {
    return { success: false, timestamp: new Date().toISOString(), error: 'מסד הנתונים בענן אינו זמין כרגע' };
  }

  const cloudId = customCloudId || getStudentCloudId();

  try {
    const docRef = doc(db, 'students', cloudId);
    
    const payload: Record<string, any> = {
      studentId: cloudId,
      totalSolved: progress.totalSolved || 0,
      totalCorrect: progress.totalCorrect || 0,
      totalIncorrect: progress.totalIncorrect || 0,
      timeSpentSeconds: progress.timeSpentSeconds || 0,
      dailyStreak: progress.dailyStreak || 1,
      lastActiveDate: progress.lastActiveDate || new Date().toISOString().slice(0, 10),
      dailyHistory: progress.dailyHistory || {},
      topicsProgress: progress.topicsProgress || {},
      errorLog: (progress.errorLog || []).slice(0, 50),
      updatedAt: new Date().toISOString()
    };

    if (extraMetadata?.parentId) payload.parentId = extraMetadata.parentId;
    if (extraMetadata?.studentName) payload.studentName = extraMetadata.studentName;
    if (extraMetadata?.studentCode) payload.studentCode = extraMetadata.studentCode;

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
): Promise<{ success: boolean; data?: StudentProgress; studentName?: string; error?: string }> {
  const db = getFirebaseDb();
  if (!db) {
    return { success: false, error: 'מסד הנתונים בענן אינו זמין' };
  }

  const cloudId = customCloudId || getStudentCloudId();

  try {
    const docRef = doc(db, 'students', cloudId);
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      const data = snap.data() as StudentProgress & { studentName?: string };
      return { success: true, data, studentName: data.studentName };
    } else {
      return { success: false, error: 'לא נמצאה רשומת התקדמות עבור מזהה זה בענן' };
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'שגיאה בטעינת נתונים מהענן';
    console.error('Error loading progress from Firestore:', err);
    return { success: false, error: errorMsg };
  }
}

// ----------------------------------------------------
// AUTH & PARENT-CHILD LINKING FUNCTIONS
// ----------------------------------------------------

/**
 * Parent login with Google popup
 */
export async function loginParentWithGoogle(): Promise<{ success: boolean; user?: User; error?: string }> {
  const auth = getFirebaseAuth();
  if (!auth) return { success: false, error: 'שירות האימות אינו זמין' };

  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const result = await signInWithPopup(auth, provider);
    
    // Ensure parent document exists in Firestore in background without blocking login
    const db = getFirebaseDb();
    if (db && result.user) {
      const parentRef = doc(db, 'parents', result.user.uid);
      setDoc(parentRef, {
        email: result.user.email,
        displayName: result.user.displayName || 'הורה',
        photoURL: result.user.photoURL,
        lastLogin: new Date().toISOString()
      }, { merge: true }).catch((e) => console.warn('Firestore background parent doc warning:', e));
    }

    return { success: true, user: result.user };
  } catch (err: any) {
    let errorMsg = 'שגיאה בהתחברות באמצעות Google';
    const errStr = (err?.code || '') + ' ' + (err?.message || '');
    if (err.code === 'auth/unauthorized-domain') {
      const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'run.app';
      errorMsg = `הדומיין (${currentHost}) אינו מורשה ב-Firebase. יש להוסיף אותו ב-Firebase Console -> Authentication -> Settings -> Authorized domains`;
    } else if (err.code === 'auth/api-key-not-valid' || errStr.includes('api-key-not-valid') || errStr.includes('API key')) {
      errorMsg = 'מפתח ה-API (apiKey) שהוגדר ב-Firebase אינו תקין או נחתך בהעתקה. אנא ודא שהעתקת את מפתח ה-Web API המלא מ-Firebase Project Settings.';
    } else if (err.code === 'auth/popup-closed-by-user') {
      errorMsg = 'חלון ההתחברות נסגר לפני השלמת הפעולה.';
    } else if (err.code === 'auth/popup-blocked') {
      errorMsg = 'הדפדפן חסם את חלון ההתחברות (Pop-up). אנא אשר חלונות קופצים בדפדפן.';
    } else if (err instanceof Error) {
      errorMsg = err.message;
    }
    console.error('Google Sign-In Error:', err);
    return { success: false, error: errorMsg };
  }
}

/**
 * Parent login with Email and Password
 */
export async function loginParentWithEmail(
  email: string,
  pass: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  const auth = getFirebaseAuth();
  if (!auth) return { success: false, error: 'שירות האימות אינו זמין' };

  try {
    const authPromise = signInWithEmailAndPassword(auth, email.trim(), pass);
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('זמן ההמתנה לשרת פג. אנא בדוק את החיבור לרשת ונסה שוב.')), 12000)
    );

    const result = await Promise.race([authPromise, timeoutPromise]);

    // Update parent last login in background
    const db = getFirebaseDb();
    if (db && result.user) {
      const parentRef = doc(db, 'parents', result.user.uid);
      setDoc(parentRef, {
        email: result.user.email,
        lastLogin: new Date().toISOString()
      }, { merge: true }).catch((e) => console.warn('Firestore background update warning:', e));
    }

    return { success: true, user: result.user };
  } catch (err: any) {
    let errorMsg = 'שגיאה בהתחברות';
    const errStr = (err?.code || '') + ' ' + (err?.message || '');
    if (err.code === 'auth/unauthorized-domain') {
      const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'run.app';
      errorMsg = `הדומיין הנוכחי (${currentHost}) אינו מורשה ב-Firebase. יש להוסיף אותו ב-Firebase Console תחת Authentication -> Settings -> Authorized domains`;
    } else if (err.code === 'auth/api-key-not-valid' || errStr.includes('api-key-not-valid') || errStr.includes('API key')) {
      errorMsg = 'מפתח ה-API (apiKey) אינו תקין. יש לבדוק את ה-Web API Key ב-Firebase Console (Project Settings).';
    } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
      errorMsg = 'כתובת אימייל או סיסמה שגויות';
    } else if (err.code === 'auth/invalid-email') {
      errorMsg = 'כתובת אימייל אינה תקינה';
    } else if (err instanceof Error) {
      errorMsg = err.message;
    }
    return { success: false, error: errorMsg };
  }
}

/**
 * Parent registration with Email and Password
 */
export async function registerParentWithEmail(
  email: string,
  pass: string,
  displayName: string
): Promise<{ success: boolean; user?: User; error?: string }> {
  const auth = getFirebaseAuth();
  if (!auth) return { success: false, error: 'שירות האימות אינו זמין' };

  try {
    const authPromise = createUserWithEmailAndPassword(auth, email.trim(), pass);
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('זמן ההמתנה לשרת פג. אנא בדוק את החיבור לרשת ונסה שוב.')), 12000)
    );

    const result = await Promise.race([authPromise, timeoutPromise]);

    if (displayName && result.user) {
      updateProfile(result.user, { displayName }).catch((e) => console.warn('Profile update warning:', e));
    }

    // Create parent record in Firestore asynchronously without blocking login completion
    const db = getFirebaseDb();
    if (db && result.user) {
      const parentRef = doc(db, 'parents', result.user.uid);
      setDoc(parentRef, {
        email: result.user.email,
        displayName: displayName || 'הורה',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      }, { merge: true }).catch((e) => console.warn('Firestore parent doc write warning:', e));
    }

    return { success: true, user: result.user };
  } catch (err: any) {
    let errorMsg = 'שגיאה ברישום החשבון';
    const errStr = (err?.code || '') + ' ' + (err?.message || '');
    if (err.code === 'auth/unauthorized-domain') {
      const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'run.app';
      errorMsg = `הדומיין (${currentHost}) אינו מורשה ב-Firebase Authentication. יש להוסיף אותו ב-Firebase Console -> Authentication -> Settings -> Authorized domains`;
    } else if (err.code === 'auth/api-key-not-valid' || errStr.includes('api-key-not-valid') || errStr.includes('API key')) {
      errorMsg = 'מפתח ה-API (apiKey) שהוזן אינו תקין או שנחתך בהעתקה. יש לבדוק את ה-Web API key ב-Firebase Project Settings.';
    } else if (err.code === 'auth/email-already-in-use') {
      errorMsg = 'כתובת אימייל זו כבר רשומה במערכת. אנא בחר/י התחברות.';
    } else if (err.code === 'auth/weak-password') {
      errorMsg = 'הסיסמה קצרה מדי (מינימום 6 תווים)';
    } else if (err instanceof Error) {
      errorMsg = err.message;
    }
    return { success: false, error: errorMsg };
  }
}

/**
 * Sign out current Firebase user
 */
export async function logoutUser(): Promise<void> {
  const auth = getFirebaseAuth();
  if (auth) {
    await signOut(auth);
  }
  clearUserProfileStorage();
}

/**
 * Creates a new linked child/student profile under a parent account
 */
export async function createLinkedChildProfile(
  parentId: string,
  studentName: string,
  customCodePrefix?: string
): Promise<{ success: boolean; student?: LinkedStudentProfile; error?: string }> {
  const db = getFirebaseDb();
  if (!db) return { success: false, error: 'מסד הנתונים בענן אינו זמין' };

  try {
    const cleanName = studentName.trim();
    if (!cleanName) return { success: false, error: 'אנא הזן שם תלמיד/ה' };

    // Generate readable code: e.g. ITAY-482 or TAL-915
    const prefix = customCodePrefix
      ? customCodePrefix.trim().toUpperCase()
      : cleanName.replace(/[^a-zA-Zא-ת]/g, '').slice(0, 4).toUpperCase() || 'TALMID';
    const randDigits = Math.floor(100 + Math.random() * 900);
    const studentCode = `${prefix}-${randDigits}`;
    const studentDocId = `student_${parentId}_${Date.now()}`;

    const newStudentProfile: LinkedStudentProfile = {
      studentId: studentDocId,
      studentName: cleanName,
      studentCode,
      parentId,
      createdAt: new Date().toISOString(),
      lastActiveDate: new Date().toISOString().slice(0, 10),
      totalSolved: 0,
      totalCorrect: 0,
      accuracyRate: 0
    };

    // Save initial student progress document in Firestore
    const studentDocRef = doc(db, 'students', studentDocId);
    const initialProgress = getInitialProgress();

    await setDoc(studentDocRef, {
      ...initialProgress,
      studentId: studentDocId,
      studentName: cleanName,
      studentCode,
      parentId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return { success: true, student: newStudentProfile };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'שגיאה ביצירת פרופיל תלמיד';
    console.error('Error creating linked student:', err);
    return { success: false, error: errorMsg };
  }
}

/**
 * Fetches all linked children for a parent UID from Firestore
 */
export async function getLinkedChildrenForParent(
  parentId: string
): Promise<LinkedStudentProfile[]> {
  const db = getFirebaseDb();
  if (!db || !parentId) return [];

  try {
    const studentsRef = collection(db, 'students');
    const q = query(studentsRef, where('parentId', '==', parentId));
    const querySnapshot = await getDocs(q);

    const list: LinkedStudentProfile[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const totalSolved = data.totalSolved || 0;
      const totalCorrect = data.totalCorrect || 0;
      const accuracyRate = totalSolved > 0 ? Math.round((totalCorrect / totalSolved) * 100) : 0;

      list.push({
        studentId: docSnap.id,
        studentName: data.studentName || 'תלמיד/ה',
        studentCode: data.studentCode || docSnap.id,
        parentId: data.parentId || parentId,
        createdAt: data.createdAt || new Date().toISOString(),
        lastActiveDate: data.lastActiveDate,
        totalSolved,
        totalCorrect,
        accuracyRate
      });
    });

    return list;
  } catch (err) {
    console.error('Error fetching linked children:', err);
    return [];
  }
}

/**
 * Student quick login by Student Code (e.g. ITAY-482 or MASLUL-1234)
 */
export async function findStudentByLoginCode(
  studentCode: string
): Promise<{ success: boolean; progress?: StudentProgress; studentId?: string; studentName?: string; error?: string }> {
  const db = getFirebaseDb();
  if (!db) return { success: false, error: 'מסד הנתונים בענן אינו זמין' };

  const cleanCode = studentCode.trim().toUpperCase();
  if (!cleanCode) return { success: false, error: 'נא להזין קוד תלמיד' };

  try {
    // 1. Direct document check (if code is the doc ID)
    const directDoc = await getDoc(doc(db, 'students', cleanCode));
    if (directDoc.exists()) {
      const data = directDoc.data();
      return {
        success: true,
        progress: data as StudentProgress,
        studentId: directDoc.id,
        studentName: data.studentName || 'תלמיד/ה'
      };
    }

    // 2. Query by studentCode field
    const studentsRef = collection(db, 'students');
    const q = query(studentsRef, where('studentCode', '==', cleanCode));
    const snap = await getDocs(q);

    if (!snap.empty) {
      const docItem = snap.docs[0];
      const data = docItem.data();
      return {
        success: true,
        progress: data as StudentProgress,
        studentId: docItem.id,
        studentName: data.studentName || 'תלמיד/ה'
      };
    }

    return { success: false, error: `לא נמצא תלמיד עם קוד "${cleanCode}". בדקו את הקוד עם ההורה ונסו שוב.` };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'שגיאה באיתור חשבון התלמיד';
    console.error('Error looking up student code:', err);
    return { success: false, error: errorMsg };
  }
}
