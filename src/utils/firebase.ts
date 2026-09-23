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
    
    if (student.studentCode) {
      map[student.studentCode.toUpperCase()] = { student, progress: progressData };
    }
    if (student.studentId) {
      map[student.studentId.toUpperCase()] = { student, progress: progressData };
    }

    localStorage.setItem(ALL_KNOWN_STUDENTS_CACHE_KEY, JSON.stringify(map));
  } catch {
    // ignore
  }
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
 * Creates a new linked child/student profile under a parent account
 */
export async function createLinkedChildProfile(
  parentId: string,
  studentName: string,
  customExactCode?: string
): Promise<{ success: boolean; student?: LinkedStudentProfile; error?: string }> {
  const db = getFirebaseDb();

  try {
    const cleanName = studentName.trim();
    if (!cleanName) return { success: false, error: 'אנא הזן שם תלמיד/ה' };

    // Use exact code specified by parent
    let studentCode = '';
    if (customExactCode && customExactCode.trim()) {
      studentCode = customExactCode.trim().toUpperCase();
    } else {
      studentCode = cleanName.replace(/[^a-zA-Z0-9א-ת]/g, '').slice(0, 8).toUpperCase() || 'TALMID';
    }

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

    const initialProgress = getInitialProgress();

    // Cache locally immediately so child appears right away
    const existingCached = getCachedChildrenForParent(parentId);
    const filteredCached = existingCached.filter(
      (c) => c.studentCode?.toUpperCase() !== studentCode && c.studentId !== studentDocId
    );
    saveCachedChildrenForParent(parentId, [newStudentProfile, ...filteredCached]);
    saveCachedStudentProfileLocally(newStudentProfile, initialProgress);

    if (db) {
      const payload = {
        ...initialProgress,
        studentId: studentDocId,
        studentName: cleanName,
        studentCode,
        parentId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const studentDocRef = doc(db, 'students', studentDocId);
      const codeAliasDocRef = doc(db, 'students', `code_${studentCode}`);

      const writePromise = Promise.all([
        setDoc(studentDocRef, payload, { merge: true }),
        setDoc(codeAliasDocRef, payload, { merge: true })
      ]);

      const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 8000));
      await Promise.race([writePromise, timeoutPromise]);
    }

    return { success: true, student: newStudentProfile };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'שגיאה ביצירת פרופיל תלמיד';
    console.error('Error creating linked student:', err);
    return { success: false, error: errorMsg };
  }
}

/**
 * Updates an existing child's login code
 */
export async function updateLinkedChildCode(
  studentId: string,
  newCode: string
): Promise<{ success: boolean; error?: string }> {
  const cleanCode = newCode.trim().toUpperCase();
  if (!cleanCode) return { success: false, error: 'קוד הכניסה אינו יכול להיות ריק' };

  const db = getFirebaseDb();
  try {
    if (db) {
      const studentDocRef = doc(db, 'students', studentId);
      await updateDoc(studentDocRef, {
        studentCode: cleanCode,
        updatedAt: new Date().toISOString()
      });

      // Write alias document for O(1) lookup
      const codeAliasRef = doc(db, 'students', `code_${cleanCode}`);
      const snap = await getDoc(studentDocRef);
      if (snap.exists()) {
        await setDoc(codeAliasRef, snap.data(), { merge: true });
      }
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
  // Always clean up local storage cache first so UI never resurrects deleted child
  removeCachedStudentProfileLocally(studentId, studentCode, parentId);

  const db = getFirebaseDb();
  try {
    if (db) {
      const studentDocRef = doc(db, 'students', studentId);
      await deleteDoc(studentDocRef);

      if (studentCode) {
        const cleanCode = studentCode.trim().toUpperCase();
        try {
          await deleteDoc(doc(db, 'students', `code_${cleanCode}`));
        } catch {
          // ignore
        }
        try {
          await deleteDoc(doc(db, 'students', cleanCode));
        } catch {
          // ignore
        }
      }
    }
    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'שגיאה במחיקת תלמיד';
    console.error('Error deleting child:', err);
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
      // Ignore alias documents starting with code_
      if (docSnap.id.startsWith('code_')) return;

      const data = docSnap.data();
      const totalSolved = data.totalSolved || 0;
      const totalCorrect = data.totalCorrect || 0;
      const accuracyRate = totalSolved > 0 ? Math.round((totalCorrect / totalSolved) * 100) : 0;
      const studentCode = (data.studentCode || docSnap.id).toString().trim().toUpperCase();

      const studentItem: LinkedStudentProfile = {
        studentId: docSnap.id,
        studentName: data.studentName || 'תלמיד/ה',
        studentCode,
        parentId: data.parentId || parentId,
        createdAt: data.createdAt || new Date().toISOString(),
        lastActiveDate: data.lastActiveDate,
        totalSolved,
        totalCorrect,
        accuracyRate
      };

      list.push(studentItem);
      saveCachedStudentProfileLocally(studentItem, data as StudentProgress);

      // Auto-backfill alias document code_XXXX in Firestore for legacy students
      if (db && studentCode) {
        const aliasRef = doc(db, 'students', `code_${studentCode}`);
        setDoc(aliasRef, { ...data, studentCode, studentId: docSnap.id }, { merge: true }).catch(() => {});
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
