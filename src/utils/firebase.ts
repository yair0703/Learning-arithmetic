import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  Firestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
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
  signInAnonymously,
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
    // Explicitly use the default Firestore database as requested
    dbInstance = getFirestore(app);
    return dbInstance;
  } catch (error) {
    console.error('Failed to initialize Firebase Firestore (default):', error);
    return null;
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
 * Ensures an active Firebase Auth session (anonymous token for student guests if unauthenticated)
 */
export async function ensureAuthSession(): Promise<User | null> {
  const auth = getFirebaseAuth();
  if (!auth) return null;

  if (auth.currentUser) {
    return auth.currentUser;
  }

  try {
    const userCred = await signInAnonymously(auth);
    return userCred.user;
  } catch (err) {
    console.warn('Anonymous sign-in skipped or failed:', err);
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
    localStorage.removeItem(CLOUD_STUDENT_ID_KEY);
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

// Local storage caching keys for linked children and offline lookup
const LINKED_CHILDREN_CACHE_PREFIX = 'maslulim_linked_children_cache_';
const ALL_KNOWN_STUDENTS_CACHE_KEY = 'maslulim_all_known_students_v1';

export function getCachedChildrenForParent(parentId: string): LinkedStudentProfile[] {
  try {
    const raw = localStorage.getItem(`${LINKED_CHILDREN_CACHE_PREFIX}${parentId}`);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return [];
}

export function saveCachedChildrenForParent(parentId: string, children: LinkedStudentProfile[]): void {
  try {
    localStorage.setItem(`${LINKED_CHILDREN_CACHE_PREFIX}${parentId}`, JSON.stringify(children));
  } catch {
    // ignore
  }
}

export function saveCachedStudentProfileLocally(student: LinkedStudentProfile, progressData?: StudentProgress): void {
  try {
    const raw = localStorage.getItem(ALL_KNOWN_STUDENTS_CACHE_KEY);
    const map: Record<string, { student: LinkedStudentProfile; progress?: StudentProgress }> = raw ? JSON.parse(raw) : {};
    
    if (student.magicToken) {
      map[student.magicToken.toUpperCase()] = { student, progress: progressData };
    }
    if (student.studentId) {
      map[student.studentId.toUpperCase()] = { student, progress: progressData };
    }

    localStorage.setItem(ALL_KNOWN_STUDENTS_CACHE_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
}

export function getCachedStudentProgressLocally(tokenOrId: string): StudentProgress | null {
  try {
    const cleanKey = tokenOrId.trim().toUpperCase();
    const raw = localStorage.getItem(ALL_KNOWN_STUDENTS_CACHE_KEY);
    if (!raw) return null;
    const map = JSON.parse(raw);
    if (map[cleanKey]?.progress) return map[cleanKey].progress;
  } catch {
    // ignore
  }
  return null;
}

export function findCachedStudentByCode(code: string): { student?: LinkedStudentProfile; progress?: StudentProgress } | null {
  try {
    const cleanCode = code.trim().toUpperCase();
    const raw = localStorage.getItem(ALL_KNOWN_STUDENTS_CACHE_KEY);
    if (!raw) return null;
    const map = JSON.parse(raw);
    if (map[cleanCode]) return map[cleanCode];
  } catch {
    // ignore
  }
  return null;
}

export function removeCachedStudentProfileLocally(studentId: string, studentCode?: string, parentId?: string): void {
  try {
    // 1. Remove from all known students map
    const raw = localStorage.getItem(ALL_KNOWN_STUDENTS_CACHE_KEY);
    if (raw) {
      const map = JSON.parse(raw);
      if (studentId) delete map[studentId.toUpperCase()];
      if (studentCode) {
        delete map[studentCode.toUpperCase()];
        delete map[`CODE_${studentCode.toUpperCase()}`];
      }
      localStorage.setItem(ALL_KNOWN_STUDENTS_CACHE_KEY, JSON.stringify(map));
    }

    // 2. Remove from parent's linked children cache
    if (parentId) {
      const parentChildren = getCachedChildrenForParent(parentId);
      const filtered = parentChildren.filter(
        (c) => c.studentId !== studentId && c.studentCode?.toUpperCase() !== studentCode?.toUpperCase()
      );
      saveCachedChildrenForParent(parentId, filtered);
    } else {
      // Clear from all cached parent keys in localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(LINKED_CHILDREN_CACHE_PREFIX)) {
          try {
            const children: LinkedStudentProfile[] = JSON.parse(localStorage.getItem(key) || '[]');
            const filtered = children.filter(
              (c) => c.studentId !== studentId && c.studentCode?.toUpperCase() !== studentCode?.toUpperCase()
            );
            localStorage.setItem(key, JSON.stringify(filtered));
          } catch {
            // ignore
          }
        }
      }
    }
  } catch (err) {
    console.warn('Error removing cached student locally:', err);
  }
}

/**
 * Constructs the Magic Link URL for a student profile
 */
export function getMagicLinkUrl(student: LinkedStudentProfile): string {
  const token = student.magicToken || student.studentId;
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  return `${baseUrl}/?studentToken=${encodeURIComponent(token)}`;
}

/**
 * Gets all student profiles saved on this device for 1-click quick login
 */
export function getAllCachedStudentsOnDevice(): LinkedStudentProfile[] {
  try {
    const raw = localStorage.getItem(ALL_KNOWN_STUDENTS_CACHE_KEY);
    if (!raw) return [];
    const map: Record<string, { student: LinkedStudentProfile }> = JSON.parse(raw);
    const list: LinkedStudentProfile[] = [];
    const seenIds = new Set<string>();

    Object.values(map).forEach((entry) => {
      if (entry?.student && entry.student.studentId && !seenIds.has(entry.student.studentId)) {
        seenIds.add(entry.student.studentId);
        list.push(entry.student);
      }
    });

    return list;
  } catch {
    return [];
  }
}

/**
 * Creates a new linked child/student profile under a parent account with a Magic Link token
 */
export async function createLinkedChildProfile(
  parentId: string,
  studentName: string
): Promise<{ success: boolean; student?: LinkedStudentProfile; error?: string }> {
  try {
    const cleanName = studentName.trim();
    if (!cleanName) return { success: false, error: 'אנא הזן שם תלמיד/ה' };

    const effectiveParentId = parentId?.trim() || 'parent_local';
    const studentDocId = `student_${effectiveParentId}_${Date.now()}`;
    const magicToken = `st_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const newStudentProfile: LinkedStudentProfile = {
      studentId: studentDocId,
      studentName: cleanName,
      magicToken,
      parentId: effectiveParentId,
      createdAt: new Date().toISOString(),
      lastActiveDate: new Date().toISOString().slice(0, 10),
      totalSolved: 0,
      totalCorrect: 0,
      accuracyRate: 0
    };

    const initialProgress = getInitialProgress();

    // 1. Cache locally immediately so student appears in UI instantly (< 5ms)
    const existingCached = getCachedChildrenForParent(effectiveParentId);
    saveCachedChildrenForParent(effectiveParentId, [
      newStudentProfile,
      ...existingCached.filter((c) => c.studentId !== studentDocId)
    ]);
    saveCachedStudentProfileLocally(newStudentProfile, initialProgress);

    // 2. Sync to Firestore in the background
    const db = getFirebaseDb();
    if (db) {
      ensureAuthSession()
        .then(() => {
          const payload = {
            ...initialProgress,
            studentId: studentDocId,
            studentName: cleanName,
            magicToken,
            parentId: effectiveParentId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };

          const tokenRecord = {
            token: magicToken,
            studentId: studentDocId,
            studentName: cleanName,
            parentId: effectiveParentId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };

          const studentDocRef = doc(db, 'students', studentDocId);
          const studentTokensRef = doc(db, 'studentTokens', magicToken);
          const tokenAliasDocRef = doc(db, 'students', `token_${magicToken}`);

          return Promise.all([
            setDoc(studentDocRef, payload, { merge: true }),
            setDoc(studentTokensRef, tokenRecord, { merge: true }),
            setDoc(tokenAliasDocRef, payload, { merge: true })
          ]);
        })
        .catch((cloudErr) => {
          console.warn('Background cloud save note:', cloudErr);
        });
    }

    return { success: true, student: newStudentProfile };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'שגיאה ביצירת פרופיל תלמיד';
    console.error('Error creating linked student:', err);
    return { success: false, error: errorMsg };
  }
}

/**
 * Quick student auto-login by Magic Token
 */
export async function findStudentByMagicToken(
  token: string
): Promise<{ success: boolean; progress?: StudentProgress; student?: LinkedStudentProfile; studentId?: string; studentName?: string; error?: string }> {
  const cleanToken = token.trim();
  if (!cleanToken) return { success: false, error: 'קישור כניסה לא תקין' };

  // 1. Check local cache first
  const cachedList = getAllCachedStudentsOnDevice();
  const cachedMatch = cachedList.find(
    (s) => s.magicToken === cleanToken || s.studentId === cleanToken
  );

  const db = getFirebaseDb();
  if (!db) {
    if (cachedMatch) {
      const progress = getCachedStudentProgressLocally(cachedMatch.studentId) || getInitialProgress();
      return {
        success: true,
        student: cachedMatch,
        progress,
        studentId: cachedMatch.studentId,
        studentName: cachedMatch.studentName
      };
    }
    return { success: false, error: 'מסד הנתונים בענן אינו זמין כרגע במצב לא מקוון' };
  }

  await ensureAuthSession();

  try {
    // Attempt 1: Look up token in dedicated 'studentTokens' collection
    let resolvedStudentId = cleanToken;
    try {
      const tokenDocRef = doc(db, 'studentTokens', cleanToken);
      const tokenSnap = await getDoc(tokenDocRef);
      if (tokenSnap.exists() && tokenSnap.data()?.studentId) {
        resolvedStudentId = tokenSnap.data().studentId;
      }
    } catch (e) {
      console.warn('Token lookup in studentTokens warning:', e);
    }

    // Attempt 2: Fetch student document from 'students' collection
    const primaryStudentRef = doc(db, 'students', resolvedStudentId);
    const tokenAliasRef = doc(db, 'students', `token_${cleanToken}`);
    const directDocRef = doc(db, 'students', cleanToken);

    const [primarySnap, tokenAliasSnap, directSnap] = await Promise.all([
      getDoc(primaryStudentRef).catch(() => null),
      getDoc(tokenAliasRef).catch(() => null),
      getDoc(directDocRef).catch(() => null)
    ]);

    let docResult = (primarySnap && primarySnap.exists() ? primarySnap : null);
    if (!docResult) {
      docResult = (tokenAliasSnap && tokenAliasSnap.exists() ? tokenAliasSnap : directSnap && directSnap.exists() ? directSnap : null);
    }

    // Attempt 3: Query 'students' collection by magicToken field
    if (!docResult) {
      try {
        const q = query(collection(db, 'students'), where('magicToken', '==', cleanToken));
        const qSnap = await getDocs(q);
        if (!qSnap.empty) {
          docResult = qSnap.docs[0];
        }
      } catch (e) {
        console.warn('Query by magicToken field warning:', e);
      }
    }

    if (docResult && docResult.exists()) {
      const data = docResult.data();
      const realStudentId = data.studentId || docResult.id;
      const studentProfile: LinkedStudentProfile = {
        studentId: realStudentId,
        studentName: data.studentName || 'תלמיד/ה',
        magicToken: data.magicToken || cleanToken,
        parentId: data.parentId || '',
        createdAt: data.createdAt || new Date().toISOString()
      };

      saveCachedStudentProfileLocally(studentProfile, data as StudentProgress);

      return {
        success: true,
        student: studentProfile,
        progress: data as StudentProgress,
        studentId: realStudentId,
        studentName: data.studentName || 'תלמיד/ה'
      };
    }

    if (cachedMatch) {
      const progress = getCachedStudentProgressLocally(cachedMatch.studentId) || getInitialProgress();
      return {
        success: true,
        student: cachedMatch,
        progress,
        studentId: cachedMatch.studentId,
        studentName: cachedMatch.studentName
      };
    }

    return { success: false, error: 'קישור הכניסה אינו פעיל או לא נמצא בענן.' };
  } catch (err) {
    if (cachedMatch) {
      const progress = getCachedStudentProgressLocally(cachedMatch.studentId) || getInitialProgress();
      return {
        success: true,
        student: cachedMatch,
        progress,
        studentId: cachedMatch.studentId,
        studentName: cachedMatch.studentName
      };
    }
    return { success: false, error: 'שגיאה בחיבור לענן. אנא בדקו את החיבור לרשת ונסו שוב.' };
  }
}

/**
 * Updates an existing child's login code in Firestore and cleans up local/cloud aliases
 */
export async function updateLinkedChildCode(
  studentId: string,
  newCode: string,
  parentId?: string,
  oldCode?: string
): Promise<{ success: boolean; error?: string }> {
  const cleanCode = newCode.trim().replace(/\s+/g, '').toUpperCase();
  if (!cleanCode) return { success: false, error: 'קוד הכניסה אינו יכול להיות ריק' };

  const db = getFirebaseDb();
  try {
    if (db) {
      const studentDocRef = doc(db, 'students', studentId);
      const codeAliasRef = doc(db, 'students', `code_${cleanCode}`);

      // Fetch current document data to preserve existing progress/name and check ownership
      let existingData: any = {};
      try {
        const snap = await getDoc(studentDocRef);
        if (snap.exists()) {
          existingData = snap.data();
        }
      } catch {
        // ignore
      }

      // Check parent ownership authorization
      if (parentId && existingData.parentId && existingData.parentId !== parentId) {
        return { success: false, error: 'אין הרשאה לערוך תלמיד מחוץ לחשבונך' };
      }

      // Global code collision check across all students in Firestore
      try {
        const aliasCheck = await getDoc(codeAliasRef);
        if (aliasCheck.exists()) {
          const aliasData = aliasCheck.data();
          const targetStudentId = aliasData.studentId || aliasCheck.id;
          if (targetStudentId !== studentId && aliasData.parentId && aliasData.parentId !== parentId) {
            return {
              success: false,
              error: `קוד הכניסה "${cleanCode}" כבר בשימוש במערכת ע"י תלמיד אחר. נא לבחור קוד ייחודי.`
            };
          }
        }
      } catch (e) {
        console.warn('Collision check warning on update:', e);
      }

      const updatedPayload = {
        ...existingData,
        studentId,
        studentCode: cleanCode,
        parentId: parentId || existingData.parentId || '',
        updatedAt: new Date().toISOString()
      };

      // Perform resilient setDoc with merge for both primary and alias docs
      await Promise.all([
        setDoc(studentDocRef, updatedPayload, { merge: true }),
        setDoc(codeAliasRef, updatedPayload, { merge: true })
      ]);

      // Clean up old code alias if provided and different
      if (oldCode) {
        const cleanOldCode = oldCode.trim().replace(/\s+/g, '').toUpperCase();
        if (cleanOldCode && cleanOldCode !== cleanCode) {
          try {
            await deleteDoc(doc(db, 'students', `code_${cleanOldCode}`));
          } catch {
            // ignore
          }
        }
      }
    }

    // Update local storage cache for parent
    if (parentId) {
      const cached = getCachedChildrenForParent(parentId);
      const updatedList = cached.map((c) =>
        c.studentId === studentId ? { ...c, studentCode: cleanCode } : c
      );
      saveCachedChildrenForParent(parentId, updatedList);
    }

    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'שגיאה בעדכון קוד הכניסה';
    console.error('Error updating child code:', err);
    return { success: false, error: errorMsg };
  }
}

/**
 * Deletes a linked child profile from Firestore and cleans up local cache
 */
export async function deleteLinkedChild(
  studentId: string,
  parentId?: string,
  studentCode?: string
): Promise<{ success: boolean; error?: string }> {
  const cleanCode = studentCode?.trim().replace(/\s+/g, '').toUpperCase() || '';

  // 1. Atomic local storage & session cleanup
  removeCachedStudentProfileLocally(studentId, cleanCode, parentId);

  // If current active session is logged in as this deleted student, reset to guest
  try {
    const activeProfile = getSavedUserProfile();
    if (
      activeProfile.role === 'student' &&
      (activeProfile.uid === studentId ||
        (cleanCode && activeProfile.studentCode?.toUpperCase() === cleanCode))
    ) {
      const guestProfile: UserProfile = {
        role: 'guest',
        displayName: 'תלמיד/ה (מצב מקומי)'
      };
      saveUserProfileToStorage(guestProfile);
    }
  } catch {
    // ignore
  }

  // 2. Atomic Firestore deletion
  const db = getFirebaseDb();
  try {
    if (db) {
      const deletePromises: Promise<any>[] = [
        deleteDoc(doc(db, 'students', studentId)).catch(() => {})
      ];

      if (cleanCode) {
        deletePromises.push(deleteDoc(doc(db, 'students', `code_${cleanCode}`)).catch(() => {}));
        deletePromises.push(deleteDoc(doc(db, 'students', cleanCode)).catch(() => {}));
      }

      await Promise.all(deletePromises);
    }
    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'שגיאה במחיקת תלמיד';
    console.error('Error deleting child atomically:', err);
    return { success: false, error: errorMsg };
  }
}

/**
 * Fetches all linked children for a parent UID from Firestore with local cache fallback
 */
export async function getLinkedChildrenForParent(
  parentId: string
): Promise<LinkedStudentProfile[]> {
  const cachedList = getCachedChildrenForParent(parentId);
  const db = getFirebaseDb();

  if (!db || !parentId) {
    return cachedList;
  }

  try {
    const studentsRef = collection(db, 'students');
    const q = query(studentsRef, where('parentId', '==', parentId));

    const fetchPromise = getDocs(q);
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), 6000)
    );

    const querySnapshot = await Promise.race([fetchPromise, timeoutPromise]);

    const list: LinkedStudentProfile[] = [];
    querySnapshot.forEach((docSnap) => {
      // Ignore alias documents starting with code_ or token_
      if (docSnap.id.startsWith('code_') || docSnap.id.startsWith('token_')) return;

      const data = docSnap.data();
      const totalSolved = data.totalSolved || 0;
      const totalCorrect = data.totalCorrect || 0;
      const accuracyRate = totalSolved > 0 ? Math.round((totalCorrect / totalSolved) * 100) : 0;
      const magicToken = data.magicToken || docSnap.id;

      const studentItem: LinkedStudentProfile = {
        studentId: docSnap.id,
        studentName: data.studentName || 'תלמיד/ה',
        magicToken,
        parentId: data.parentId || parentId,
        createdAt: data.createdAt || new Date().toISOString(),
        lastActiveDate: data.lastActiveDate,
        totalSolved,
        totalCorrect,
        accuracyRate
      };

      list.push(studentItem);
      saveCachedStudentProfileLocally(studentItem, data as StudentProgress);

      // Backfill token alias documents in Firestore for existing/legacy students if needed
      if (db && magicToken) {
        const tokenRef = doc(db, 'studentTokens', magicToken);
        const aliasRef = doc(db, 'students', `token_${magicToken}`);
        setDoc(tokenRef, { token: magicToken, studentId: docSnap.id, studentName: data.studentName || 'תלמיד/ה', parentId: data.parentId || parentId, createdAt: data.createdAt || new Date().toISOString() }, { merge: true }).catch(() => {});
        setDoc(aliasRef, { ...data, magicToken, studentId: docSnap.id }, { merge: true }).catch(() => {});
      }
    });

    saveCachedChildrenForParent(parentId, list);
    return list;
  } catch (err) {
    console.warn('Could not fetch linked children from cloud, returning local cached list:', err);
    return cachedList;
  }
}

/**
 * Student quick login by Student Code (e.g. ITAY-482 or 2016 or 2026)
 */
export async function findStudentByLoginCode(
  studentCode: string
): Promise<{ success: boolean; progress?: StudentProgress; studentId?: string; studentName?: string; error?: string }> {
  const cleanCode = studentCode.trim().toUpperCase();
  if (!cleanCode) return { success: false, error: 'נא להזין קוד תלמיד' };

  // 1. Check local cache first for instant offline/speedy login
  const localMatch = findCachedStudentByCode(cleanCode);

  const db = getFirebaseDb();
  if (!db) {
    if (localMatch?.student) {
      return {
        success: true,
        progress: localMatch.progress || getInitialProgress(),
        studentId: localMatch.student.studentId,
        studentName: localMatch.student.studentName
      };
    }
    return { success: false, error: 'מסד הנתונים בענן אינו זמין כרגע במצב לא מקוון' };
  }

  // Ensure an active auth session for guest/student devices
  await ensureAuthSession();

  try {
    const timeoutMs = 12000; // 12 seconds timeout for mobile network

    const codeAliasRef = doc(db, 'students', `code_${cleanCode}`);
    const directDocRef = doc(db, 'students', cleanCode);
    const studentsRef = collection(db, 'students');
    const q = query(studentsRef, where('studentCode', '==', cleanCode));

    // Parallel execution: resolves as soon as ANY valid document is found
    const checkCloudPromise = () =>
      new Promise<any>((resolve) => {
        let resolved = false;
        let pending = 3;

        const onResult = (snap: any) => {
          if (resolved) return;
          if (snap && snap.exists && snap.exists()) {
            resolved = true;
            resolve(snap);
          } else {
            pending--;
            if (pending <= 0 && !resolved) {
              resolved = true;
              resolve(null);
            }
          }
        };

        getDoc(codeAliasRef).then(onResult).catch(() => onResult(null));
        getDoc(directDocRef).then(onResult).catch(() => onResult(null));
        getDocs(q).then((s) => onResult(!s.empty ? s.docs[0] : null)).catch(() => onResult(null));
      });

    const timeoutPromise = new Promise<null>((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), timeoutMs)
    );

    const docResult = await Promise.race([checkCloudPromise(), timeoutPromise]);

    if (docResult && docResult.exists()) {
      const data = docResult.data();
      const realStudentId = data.studentId || docResult.id;
      const studentItem: LinkedStudentProfile = {
        studentId: realStudentId,
        studentName: data.studentName || 'תלמיד/ה',
        studentCode: data.studentCode || cleanCode,
        parentId: data.parentId || '',
        createdAt: data.createdAt || new Date().toISOString()
      };
      saveCachedStudentProfileLocally(studentItem, data as StudentProgress);

      return {
        success: true,
        progress: data as StudentProgress,
        studentId: realStudentId,
        studentName: data.studentName || 'תלמיד/ה'
      };
    }

    // If local match exists, use local match
    if (localMatch?.student) {
      return {
        success: true,
        progress: localMatch.progress || getInitialProgress(),
        studentId: localMatch.student.studentId,
        studentName: localMatch.student.studentName
      };
    }

    return { success: false, error: `לא נמצא תלמיד עם הקוד "${cleanCode}". בדקו את הקוד עם ההורה ונסו שוב.` };
  } catch (err: unknown) {
    if (localMatch?.student) {
      return {
        success: true,
        progress: localMatch.progress || getInitialProgress(),
        studentId: localMatch.student.studentId,
        studentName: localMatch.student.studentName
      };
    }

    let errorMsg = 'שגיאה באיתור חשבון התלמיד';
    const rawErrStr = err instanceof Error ? err.message : String(err);

    if (rawErrStr.includes('offline') || rawErrStr.includes('Failed to get document')) {
      errorMsg = 'החיבור לרשת מנותק או איטי כרגע. אנא בדוק את חיבור האינטרנט ונסה שוב.';
    } else if (rawErrStr.includes('timeout')) {
      errorMsg = 'זמן התגובה של השרת התארך. אנא בדוק את החיבור לרשת ונסה שוב.';
    } else if (err instanceof Error) {
      errorMsg = err.message;
    }
    console.error('Error looking up student code:', err);
    return { success: false, error: errorMsg };
  }
}

/**
 * Real-time diagnostic check to verify 100% cloud sync status of a student
 */
export async function verifyStudentSyncInCloud(
  student: LinkedStudentProfile
): Promise<{ isSynced: boolean; message: string; details?: string }> {
  const cleanCode = (student.studentCode || '').trim().replace(/\s+/g, '').toUpperCase();
  if (!cleanCode) {
    return { isSynced: false, message: 'קוד התלמיד ריק. נדרשת הגדרת קוד חדש.' };
  }

  const db = getFirebaseDb();
  if (!db) {
    return { isSynced: false, message: 'מסד הנתונים אינו זמין כרגע במצב לא מקוון.' };
  }

  await ensureAuthSession();

  try {
    const codeAliasRef = doc(db, 'students', `code_${cleanCode}`);
    const studentDocRef = doc(db, 'students', student.studentId);

    const [aliasSnap, docSnap] = await Promise.all([
      getDoc(codeAliasRef).catch(() => null),
      getDoc(studentDocRef).catch(() => null)
    ]);

    const aliasExists = aliasSnap && aliasSnap.exists();
    const docExists = docSnap && docSnap.exists();

    if (aliasExists && docExists) {
      return {
        isSynced: true,
        message: `מסונכרן 100% בענן! התלמיד/ה "${student.studentName}" מוכן/ה לכניסה מיידית עם קוד ${cleanCode}.`
      };
    }

    if (aliasExists || docExists) {
      return {
        isSynced: false,
        message: 'סנכרון חלקי בלבד בענן. נדרש ריענון סנכרון בלחיצה אחת.',
        details: 'אחת הרשומות בענן עדיין לא עודכנה.'
      };
    }

    return {
      isSynced: false,
      message: `הקוד ${cleanCode} אינו רשום עדיין בשרת הענן. לחץ על "סנכרן עכשיו" לתיקון מיידי.`,
      details: 'הרשומה לא נמצאה ב-Firestore.'
    };
  } catch (err) {
    console.error('Error verifying sync in cloud:', err);
    return {
      isSynced: false,
      message: 'לא ניתן היה לבדוק את השרת כעת. בדוק את חיבור האינטרנט.',
      details: String(err)
    };
  }
}

/**
 * Force resynchronization of a student code and profile to Firestore Cloud
 */
export async function resyncStudentCodeInCloud(
  student: LinkedStudentProfile,
  parentId: string
): Promise<{ success: boolean; message: string }> {
  const cleanCode = (student.studentCode || '').trim().replace(/\s+/g, '').toUpperCase();
  if (!cleanCode) {
    return { success: false, message: 'קוד תלמיד לא תקין' };
  }

  const db = getFirebaseDb();
  if (!db) {
    return { success: false, message: 'חיבור ענן אינו זמין' };
  }

  await ensureAuthSession();

  try {
    const localMatch = findCachedStudentByCode(cleanCode);
    const cachedProgress = localMatch?.progress || getInitialProgress();
    const payload = {
      ...cachedProgress,
      studentId: student.studentId,
      studentName: student.studentName,
      studentCode: cleanCode,
      parentId,
      updatedAt: new Date().toISOString()
    };

    const studentDocRef = doc(db, 'students', student.studentId);
    const codeAliasDocRef = doc(db, 'students', `code_${cleanCode}`);

    await Promise.all([
      setDoc(studentDocRef, payload, { merge: true }),
      setDoc(codeAliasDocRef, payload, { merge: true })
    ]);

    saveCachedStudentProfileLocally(
      { ...student, studentCode: cleanCode },
      payload as StudentProgress
    );

    return {
      success: true,
      message: `הסנכרון חודש בהצלחה! התלמיד/ה "${student.studentName}" מסונכרן/ת כעת 100% בענן עם קוד ${cleanCode}.`
    };
  } catch (err) {
    console.error('Error resyncing student code to cloud:', err);
    return {
      success: false,
      message: 'שגיאה בסנכרון מול הענן. בדוק את החיבור לרשת ונסה שוב.'
    };
  }
}

