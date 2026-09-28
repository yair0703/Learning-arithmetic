import { StudentProgress, TopicId, SkillTag, ParentDiagnosticInsight, TopicInfo, Exercise } from '../types';
import { TOPICS, EXERCISE_BANK } from '../data/curriculumData';
import { getFreshExercisesForTopic } from './exerciseGenerator';

export interface TopicMasteryInfo {
  percentage: number;
  status: 'not_started' | 'in_progress' | 'proficient' | 'master';
  statusHebrew: string;
  badgeClass: string;
  stars: number; // 0, 1, 2, 3, 4
  levelLabel: string;
}

export function getTopicMastery(topicProg?: StudentProgress['topicsProgress'][TopicId]): TopicMasteryInfo {
  if (!topicProg || (topicProg.exercisesSolved === 0 && !topicProg.completedUnderstand && !topicProg.completedTogether)) {
    return {
      percentage: 0,
      status: 'not_started',
      statusHebrew: 'טרם התחלת',
      badgeClass: 'bg-slate-100 text-slate-600 border-slate-200',
      stars: 0,
      levelLabel: 'רמה 1 (בסיס)'
    };
  }

  let score = 0;
  if (topicProg.completedUnderstand) score += 15;
  if (topicProg.completedTogether) score += 15;

  const exercisePoints = Math.min(50, topicProg.correctCount * 10);
  score += exercisePoints;

  if (topicProg.currentLevel === 2) score += 10;
  if (topicProg.currentLevel === 3) score += 20;
  if (topicProg.currentLevel === 4) score += 30;

  const percentage = Math.min(100, Math.max(10, score));

  let status: TopicMasteryInfo['status'] = 'in_progress';
  let statusHebrew = 'בתהליך למידה';
  let badgeClass = 'bg-amber-100 text-amber-800 border-amber-200';
  let stars = 1;

  if (topicProg.currentLevel === 4 || (percentage >= 95 && topicProg.correctCount >= 10)) {
    status = 'master';
    statusHebrew = 'מאסטר זהב! 👑⭐';
    badgeClass = 'bg-amber-100 text-amber-900 border-amber-300';
    stars = 4;
  } else if (percentage >= 85 || (topicProg.currentLevel === 3 && topicProg.correctCount >= 5)) {
    status = 'master';
    statusHebrew = 'אלוף הנושא! 🏆';
    badgeClass = 'bg-emerald-100 text-emerald-800 border-emerald-300';
    stars = 3;
  } else if (percentage >= 50 || topicProg.currentLevel >= 2) {
    status = 'proficient';
    statusHebrew = 'שליטה טובה 🌟';
    badgeClass = 'bg-indigo-100 text-indigo-800 border-indigo-200';
    stars = 2;
  }

  const levelLabel =
    topicProg.currentLevel === 4
      ? 'מאסטר ⭐ (אתגר זהב)'
      : topicProg.currentLevel === 3
      ? 'רמה 3 (מתקדם)'
      : topicProg.currentLevel === 2
      ? 'רמה 2 (בינוני)'
      : 'רמה 1 (בסיס)';

  return {
    percentage,
    status,
    statusHebrew,
    badgeClass,
    stars,
    levelLabel
  };
}

export interface LevelCumulativeProgress {
  levelNumber: 1 | 2 | 3 | 4;
  levelTitle: string;
  isUnlocked: boolean;
  isCurrentLevel: boolean;
  isCompleted: boolean;
  solvedCount: number;
  correctCount: number;
  accuracyRate: number;
  requiredCorrectToPass: number;
  statusHebrew: string;
  badgeClass: string;
}

export interface TopicCumulativeProgressStatus {
  topicId: TopicId;
  topicTitle: string;
  currentUnlockedLevel: 1 | 2 | 3 | 4;
  totalExercisesSolved: number;
  totalCorrectAnswers: number;
  overallAccuracyRate: number;
  masteryPercentage: number;
  masteryStatusHebrew: string;
  understandCompleted: boolean;
  togetherCompleted: boolean;
  levelsProgress: LevelCumulativeProgress[];
}

export function getTopicCumulativeProgressStatus(
  progress: StudentProgress,
  topicId: TopicId
): TopicCumulativeProgressStatus {
  const topicInfo = TOPICS.find((t) => t.id === topicId);
  const topicTitle = topicInfo ? topicInfo.title : topicId;
  const topicProg = progress.topicsProgress[topicId] || {
    completedUnderstand: false,
    completedTogether: false,
    exercisesSolved: 0,
    correctCount: 0,
    currentLevel: 1,
    consecutiveCorrect: 0,
    consecutiveIncorrect: 0
  };

  const mastery = getTopicMastery(topicProg);
  const totalSolved = topicProg.exercisesSolved || 0;
  const totalCorrect = topicProg.correctCount || 0;
  const currentLvl = topicProg.currentLevel || 1;
  const overallAccuracy = totalSolved > 0 ? Math.round((totalCorrect / totalSolved) * 100) : 0;

  const levelNames: Record<1 | 2 | 3 | 4, string> = {
    1: 'רמה 1 - יסודות והבנת המושג',
    2: 'רמה 2 - יישום ותרגול מודרך',
    3: 'רמה 3 - אתגר ושליטה מלאה',
    4: 'מאסטר ⭐ - אתגר זהב'
  };

  const levelsProgress: LevelCumulativeProgress[] = ([1, 2, 3, 4] as const).map((lvl) => {
    // Level 4 unlocks only after level 3 is finished (currentLvl is 4 or currentLvl is 3 with sufficient mastery)
    const isUnlocked =
      lvl === 1 ||
      currentLvl >= lvl ||
      (lvl === 2 && totalCorrect >= 5) ||
      (lvl === 3 && totalCorrect >= 10) ||
      (lvl === 4 && (currentLvl >= 4 || (currentLvl === 3 && totalCorrect >= 15)));
    const isCurrentLevel = currentLvl === lvl;
    const isCompleted = currentLvl > lvl || (currentLvl === 4 && lvl === 4 && totalCorrect >= 20);

    let lvlSolved = 0;
    let lvlCorrect = 0;

    if (totalSolved > 0) {
      if (currentLvl === lvl) {
        lvlSolved = Math.max(1, totalSolved - (lvl - 1) * 5);
        lvlCorrect = Math.max(0, totalCorrect - (lvl - 1) * 5);
      } else if (currentLvl > lvl) {
        lvlSolved = 5;
        lvlCorrect = 5;
      } else {
        lvlSolved = 0;
        lvlCorrect = 0;
      }
    }

    const accuracyRate = lvlSolved > 0 ? Math.round((lvlCorrect / lvlSolved) * 100) : 0;
    const requiredCorrectToPass = 5;

    let statusHebrew = 'נעולה 🔒';
    let badgeClass = 'bg-slate-100 text-slate-500 border-slate-200';

    if (isCompleted) {
      statusHebrew = lvl === 4 ? 'מאסטר זהב הושלם! 👑' : 'הושלמה בהצלחה ✨';
      badgeClass = lvl === 4 ? 'bg-amber-100 text-amber-900 border-amber-400 font-bold' : 'bg-emerald-100 text-emerald-800 border-emerald-300';
    } else if (isCurrentLevel) {
      statusHebrew = lvl === 4 ? 'אתגר מאסטר פעיל ⭐' : 'רמה פעילה 🎯';
      badgeClass = lvl === 4 ? 'bg-amber-200 text-amber-950 border-amber-400 font-bold' : 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
    } else if (isUnlocked) {
      statusHebrew = lvl === 4 ? 'פתוח למאסטר ⭐' : 'פתוחה לתרגול 🔓';
      badgeClass = lvl === 4 ? 'bg-amber-50 text-amber-800 border-amber-300' : 'bg-sky-100 text-sky-800 border-sky-200';
    }

    return {
      levelNumber: lvl,
      levelTitle: levelNames[lvl],
      isUnlocked,
      isCurrentLevel,
      isCompleted,
      solvedCount: lvlSolved,
      correctCount: lvlCorrect,
      accuracyRate,
      requiredCorrectToPass,
      statusHebrew,
      badgeClass
    };
  });

  return {
    topicId,
    topicTitle,
    currentUnlockedLevel: currentLvl,
    totalExercisesSolved: totalSolved,
    totalCorrectAnswers: totalCorrect,
    overallAccuracyRate: overallAccuracy,
    masteryPercentage: mastery.percentage,
    masteryStatusHebrew: mastery.statusHebrew,
    understandCompleted: topicProg.completedUnderstand || false,
    togetherCompleted: topicProg.completedTogether || false,
    levelsProgress
  };
}

const STORAGE_KEY = 'maslulim_plus_fractions_v1';
const PARENT_PIN_KEY = 'maslulim_parent_pin_v1';
export const DEFAULT_PARENT_PIN = '1234';

export function getParentPin(): string {
  try {
    const stored = localStorage.getItem(PARENT_PIN_KEY);
    if (!stored || stored.trim().length !== 4) {
      return DEFAULT_PARENT_PIN;
    }
    return stored.trim();
  } catch {
    return DEFAULT_PARENT_PIN;
  }
}

export function saveParentPin(pin: string): boolean {
  if (!pin || pin.length !== 4 || !/^\d{4}$/.test(pin)) {
    return false;
  }
  try {
    localStorage.setItem(PARENT_PIN_KEY, pin);
    return true;
  } catch {
    return false;
  }
}

export function verifyParentPin(pin: string): boolean {
  const currentPin = getParentPin();
  return pin === currentPin;
}

export function resetParentPinToDefault(): void {
  try {
    localStorage.removeItem(PARENT_PIN_KEY);
  } catch {
    // ignore
  }
}

export function getInitialProgress(): StudentProgress {
  const initialTopicsProgress = TOPICS.reduce((acc, topic) => {
    acc[topic.id] = {
      completedUnderstand: false,
      completedTogether: false,
      exercisesSolved: 0,
      correctCount: 0,
      currentLevel: 1,
      consecutiveCorrect: 0,
      consecutiveIncorrect: 0
    };
    return acc;
  }, {} as StudentProgress['topicsProgress']);

  return {
    totalSolved: 0,
    totalCorrect: 0,
    totalIncorrect: 0,
    timeSpentSeconds: 0,
    dailyStreak: 1,
    lastActiveDate: new Date().toISOString().slice(0, 10),
    topicsProgress: initialTopicsProgress,
    errorLog: []
  };
}

export function loadStudentProgress(): StudentProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getInitialProgress();
    const parsed = JSON.parse(raw);
    const initial = getInitialProgress();
    return {
      ...initial,
      ...parsed,
      topicsProgress: {
        ...initial.topicsProgress,
        ...(parsed.topicsProgress || {})
      }
    };
  } catch (e) {
    console.error('Failed to load progress from localStorage', e);
    return getInitialProgress();
  }
}

export function saveStudentProgress(progress: StudentProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
}

export function recordExerciseAttempt(
  progress: StudentProgress,
  params: {
    topicId: TopicId;
    exerciseId: string;
    skillTag: SkillTag;
    isCorrect: boolean;
    questionPrompt: string;
    studentAnswer: string;
    correctAnswer: string;
    misconceptionNote?: string;
  }
): StudentProgress {
  const newProgress: StudentProgress = JSON.parse(JSON.stringify(progress));
  const topicProg = newProgress.topicsProgress[params.topicId];

  newProgress.totalSolved += 1;
  topicProg.exercisesSolved += 1;

  // Track daily history
  const todayKey = new Date().toISOString().slice(0, 10);
  if (!newProgress.dailyHistory) {
    newProgress.dailyHistory = {};
  }
  if (!newProgress.dailyHistory[todayKey]) {
    newProgress.dailyHistory[todayKey] = { solved: 0, correct: 0, timeSpentSeconds: 0 };
  }
  newProgress.dailyHistory[todayKey].solved += 1;

  if (params.isCorrect) {
    newProgress.totalCorrect += 1;
    topicProg.correctCount += 1;
    topicProg.consecutiveCorrect += 1;
    topicProg.consecutiveIncorrect = 0;
    newProgress.dailyHistory[todayKey].correct += 1;

    // Adaptive difficulty upgrade
    if (topicProg.consecutiveCorrect >= 2 && topicProg.currentLevel < 4) {
      topicProg.currentLevel = (topicProg.currentLevel + 1) as 1 | 2 | 3 | 4;
      topicProg.consecutiveCorrect = 0;
    }
  } else {
    newProgress.totalIncorrect += 1;
    topicProg.consecutiveIncorrect += 1;
    topicProg.consecutiveCorrect = 0;

    // Adaptive difficulty downgrade
    if (topicProg.consecutiveIncorrect >= 2 && topicProg.currentLevel > 1) {
      topicProg.currentLevel = (topicProg.currentLevel - 1) as 1 | 2 | 3 | 4;
      topicProg.consecutiveIncorrect = 0;
    }

    // Record error in errorLog
    newProgress.errorLog.unshift({
      id: `${Date.now()}-${Math.random()}`,
      topicId: params.topicId,
      skillTag: params.skillTag,
      timestamp: Date.now(),
      questionPrompt: params.questionPrompt,
      studentAnswer: params.studentAnswer,
      correctAnswer: params.correctAnswer,
      misconceptionNote: params.misconceptionNote || 'טעות בחישוב או בהבנת ההגדרה'
    });

    // Keep errorLog at max 50 entries
    if (newProgress.errorLog.length > 50) {
      newProgress.errorLog.pop();
    }
  }

  saveStudentProgress(newProgress);
  return newProgress;
}

export function markStageCompleted(
  progress: StudentProgress,
  topicId: TopicId,
  stage: 'understand' | 'together'
): StudentProgress {
  const newProgress: StudentProgress = JSON.parse(JSON.stringify(progress));
  if (stage === 'understand') {
    newProgress.topicsProgress[topicId].completedUnderstand = true;
  } else if (stage === 'together') {
    newProgress.topicsProgress[topicId].completedTogether = true;
  }
  saveStudentProgress(newProgress);
  return newProgress;
}

export function addPracticeTime(progress: StudentProgress, seconds: number): StudentProgress {
  const newProgress = { ...progress, timeSpentSeconds: progress.timeSpentSeconds + seconds };
  saveStudentProgress(newProgress);
  return newProgress;
}

export interface TopicImprovementDetail {
  topic: TopicInfo;
  severity: 'high' | 'medium' | 'suggested';
  accuracyRate: number;
  solvedCount: number;
  errorCount: number;
  currentLevel: 1 | 2 | 3 | 4;
  reinforcementReason: string;
  keyRuleReminder: string;
  identifiedMisconceptions: {
    skillTag: SkillTag;
    explanation: string;
    studentMistakeExample?: string;
  }[];
}

export function getTopicsNeedingImprovement(progress: StudentProgress): TopicImprovementDetail[] {
  const result: TopicImprovementDetail[] = [];

  // Group error log by topic and by skillTag
  const errorByTopic: Record<string, typeof progress.errorLog> = {};
  progress.errorLog.forEach((err) => {
    if (!errorByTopic[err.topicId]) {
      errorByTopic[err.topicId] = [];
    }
    errorByTopic[err.topicId].push(err);
  });

  // Check each topic
  TOPICS.forEach((topic) => {
    const tp = progress.topicsProgress[topic.id];
    const errors = errorByTopic[topic.id] || [];
    const solved = tp?.exercisesSolved || 0;
    const correct = tp?.correctCount || 0;
    const accuracy = solved > 0 ? Math.round((correct / solved) * 100) : 100;
    const level = tp?.currentLevel || 1;

    let severity: 'high' | 'medium' | 'suggested' | null = null;
    let reason = '';
    let keyRuleReminder = '';

    // Rule reminders tailored per topic
    switch (topic.id) {
      case 'whole-part':
        keyRuleReminder = 'חוק הזהב: שבר קיים רק כאשר החלקים שווים זה לזה בדיוק! המכנה קובע לכמה חלקים שווים חילקנו, והמונה כמה חלקים לקחנו.';
        break;
      case 'number-line':
        keyRuleReminder = 'טיפ לישר המספרים: סופרים קפיצות (מרווחים שווים) בין 0 ל-1, ולא את הקווים עצמם! שבר קטן מ-1 נמצא תמיד בין 0 ל-1.';
        break;
      case 'mixed-numbers':
        keyRuleReminder = 'מספר מעורב: כל שלם מורכב מ-d/d (למשל שלם אחד בשלישים הוא 3/3). שבר מדומה הופכים למעורב על ידי חילוק המונה במכנה.';
        break;
      case 'same-denom':
        keyRuleReminder = 'כלל ברזל: כשהמכנים שווים, מחברים ומחסרים רק את המונים! המכנה נשאר ללא שום שינוי.';
        break;
      case 'part-of-quantity':
        keyRuleReminder = 'חישוב שבר מכמות: מחלקים קודם את הכמות הכוללת במכנה (מציאת קבוצה אחת), ואז כופלים את התוצאה במונה!';
        break;
      case 'fractional-amount':
        keyRuleReminder = 'כאשר נתון שחלק מסוים שווה לכמות נתונה, מחלקים במונה כדי למצוא שבר יחידה (1/n) ואז כופלים במכנה למציאת השלם.';
        break;
      case 'decimals-mult-div':
        keyRuleReminder = 'כפל ב-10 וב-100 מקפיץ את הנקודה ימינה (המספר גדל); חילוק ב-10 וב-100 מקפיץ את הנקודה שמאלה (המספר קטן).';
        break;
      default:
        keyRuleReminder = 'חזרו על ההסברים הפשוטים ושימו לב לדוגמאות המומחשות.';
    }

    if (errors.length >= 2 || (solved >= 3 && accuracy < 65)) {
      severity = 'high';
      reason = `נרשמו ${errors.length} טעויות בנושא זה (דיוק: ${accuracy}%). מומלץ לחזור על ההסבר המומחש ולעשות תרגול ממוקד!`;
    } else if (errors.length === 1 || (solved >= 2 && accuracy < 80)) {
      severity = 'medium';
      reason = `נושא בתהליך הטמעה (דיוק: ${accuracy}%). תרגול קצר יעזור לסגור את הפינות.`;
    } else if (solved === 0 && topic.order <= 4) {
      severity = 'suggested';
      reason = 'נושא יסוד שעדיין לא תרגלת מספיק – כדאי להכיר ולחזק!';
    }

    if (severity) {
      // Extract unique misconceptions
      const seenSkills = new Set<string>();
      const misconceptions: TopicImprovementDetail['identifiedMisconceptions'] = [];

      errors.forEach((e) => {
        if (!seenSkills.has(e.skillTag)) {
          seenSkills.add(e.skillTag);
          misconceptions.push({
            skillTag: e.skillTag,
            explanation: e.misconceptionNote || 'שים לב לקריאה מדויקת של השאלה',
            studentMistakeExample: e.questionPrompt
          });
        }
      });

      result.push({
        topic,
        severity,
        accuracyRate: accuracy,
        solvedCount: solved,
        errorCount: errors.length,
        currentLevel: level,
        reinforcementReason: reason,
        keyRuleReminder,
        identifiedMisconceptions: misconceptions
      });
    }
  });

  // Sort: 'high' first, then 'medium', then 'suggested'
  const severityScore = { high: 3, medium: 2, suggested: 1 };
  result.sort((a, b) => {
    const scoreDiff = severityScore[b.severity] - severityScore[a.severity];
    if (scoreDiff !== 0) return scoreDiff;
    return b.errorCount - a.errorCount;
  });

  return result;
}

export function generateTargetedBoosterExercises(
  progress: StudentProgress,
  targetTopicId?: TopicId,
  count = 5
): Exercise[] {
  // If specific topic is requested, generate fresh exercises at student's current level
  if (targetTopicId) {
    const lvl = progress.topicsProgress[targetTopicId]?.currentLevel || 1;
    return getFreshExercisesForTopic(targetTopicId, lvl, count);
  }

  // If no topic specified, gather across topics needing improvement
  const topicsToBoost = getTopicsNeedingImprovement(progress);
  const boostTopicIds = topicsToBoost.map((t) => t.topic.id);

  if (boostTopicIds.length === 0) {
    // Fallback: fresh mix from core topics
    const tList: TopicId[] = ['whole-part', 'number-line', 'same-denom', 'part-of-quantity'];
    const result: Exercise[] = [];
    tList.forEach((tId) => {
      if (result.length < count) {
        result.push(...getFreshExercisesForTopic(tId, 1, 2));
      }
    });
    return result.slice(0, count);
  }

  const selected: Exercise[] = [];
  boostTopicIds.forEach((tId) => {
    if (selected.length < count) {
      const lvl = progress.topicsProgress[tId]?.currentLevel || 1;
      selected.push(...getFreshExercisesForTopic(tId, lvl, 2));
    }
  });

  return selected.slice(0, count);
}

export function getRecommendedTopicToReinforce(progress: StudentProgress): {
  topicId: TopicId;
  reason: string;
} {
  // Check error log first
  if (progress.errorLog.length > 0) {
    const errorCountByTopic: Record<string, number> = {};
    progress.errorLog.forEach((err) => {
      errorCountByTopic[err.topicId] = (errorCountByTopic[err.topicId] || 0) + 1;
    });

    let worstTopicId: TopicId = 'number-line';
    let maxErrors = 0;
    Object.entries(errorCountByTopic).forEach(([tId, count]) => {
      if (count > maxErrors) {
        maxErrors = count;
        worstTopicId = tId as TopicId;
      }
    });

    const topicObj = TOPICS.find((t) => t.id === worstTopicId);
    return {
      topicId: worstTopicId,
      reason: `זוהו כמה טעויות בפרק "${topicObj?.shortTitle || worstTopicId}". מומלץ לחזק עם המחשה!`
    };
  }

  // Next, look for topics with lowest accuracy
  let lowestAccuracyTopic: TopicId = 'number-line';
  let minAccuracy = 1.1;

  for (const topic of TOPICS) {
    const tp = progress.topicsProgress[topic.id];
    if (tp && tp.exercisesSolved >= 2) {
      const accuracy = tp.correctCount / tp.exercisesSolved;
      if (accuracy < minAccuracy) {
        minAccuracy = accuracy;
        lowestAccuracyTopic = topic.id;
      }
    }
  }

  if (minAccuracy <= 1.0) {
    const topicObj = TOPICS.find((t) => t.id === lowestAccuracyTopic);
    return {
      topicId: lowestAccuracyTopic,
      reason: `הנושא הדורש את החיזוק הרב ביותר: "${topicObj?.shortTitle}" (${Math.round(minAccuracy * 100)}% הצלחה).`
    };
  }

  // Default: First uncompleted topic or second topic
  const nextUnfinished = TOPICS.find(
    (t) => !progress.topicsProgress[t.id]?.completedTogether
  );
  if (nextUnfinished) {
    return {
      topicId: nextUnfinished.id,
      reason: `הנושא הבא בתור בספר מסלולים פלוס: "${nextUnfinished.shortTitle}".`
    };
  }

  return {
    topicId: 'number-line',
    reason: 'שברים על ישר המספרים הוא נושא מרכזי שכדאי לחזור עליו לעיתים קרובות.'
  };
}

export function generateDailyPracticeExercises(progress: StudentProgress, count = 6): Exercise[] {
  const recommended = getRecommendedTopicToReinforce(progress);
  const selected: Exercise[] = [];

  // Priority 1: 2 fresh exercises from the recommended / weak topic
  const lvlRec = progress.topicsProgress[recommended.topicId]?.currentLevel || 1;
  selected.push(...getFreshExercisesForTopic(recommended.topicId, lvlRec, 2));

  // Priority 2: Fill remaining exercises from other topics
  const otherTopics = TOPICS.filter((t) => t.id !== recommended.topicId);
  const shuffledTopics = [...otherTopics].sort(() => 0.5 - Math.random());

  for (const topic of shuffledTopics) {
    if (selected.length >= count) break;
    const lvl = progress.topicsProgress[topic.id]?.currentLevel || 1;
    selected.push(...getFreshExercisesForTopic(topic.id, lvl, 1));
  }

  // If still need more, add from first topic
  if (selected.length < count) {
    selected.push(...getFreshExercisesForTopic('whole-part', 1, count - selected.length));
  }

  return selected.slice(0, count);
}

export function generateParentDiagnosticReport(progress: StudentProgress): ParentDiagnosticInsight {
  const strengths: string[] = [];
  const struggles: string[] = [];
  const pedagogicalAdvice: string[] = [];

  TOPICS.forEach((topic) => {
    const tp = progress.topicsProgress[topic.id];
    if (tp && tp.exercisesSolved > 0) {
      const acc = tp.correctCount / tp.exercisesSolved;
      if (acc >= 0.8) {
        strengths.push(`${topic.title} (${Math.round(acc * 100)}% הצלחה – רמה מעולה)`);
      } else if (acc < 0.6) {
        struggles.push(`${topic.title} (${Math.round(acc * 100)}% הצלחה)`);
      }
    }
  });

  if (strengths.length === 0 && progress.totalSolved > 0) {
    strengths.push('הילד מתאמן ומתמיד בפתרון תרגילים');
  }

  // Specific pedagogical diagnosis based on error types
  const skillErrorCount: Record<string, number> = {};
  progress.errorLog.forEach((err) => {
    skillErrorCount[err.skillTag] = (skillErrorCount[err.skillTag] || 0) + 1;
  });

  if (skillErrorCount['same_denom_addition'] || skillErrorCount['same_denom_subtraction']) {
    pedagogicalAdvice.push(
      'שים לב: הילד נוטה לעיתים לחבר או להחסיר את המכנים. כדאי להזכיר לו בבית שהמכנה הוא רק "שם החלק" (כמו 2 תפוחים + 3 תפוחים = 5 תפוחים) ולכן הוא לעולם לא משתנה בחיבור!'
    );
  }

  if (skillErrorCount['number_line_placement'] || skillErrorCount['number_line_intervals']) {
    pedagogicalAdvice.push(
      'הילד מזהה שברים בצורה טובה בצורות הנדסיות, אך מתקשה במיקום שברים על ישר המספרים. מומלץ לתרגל איתו ספירת קפיצות (מרווחים) מ-0 עד 1 במקום ספירת קווים.'
    );
  }

  if (skillErrorCount['mixed_to_improper'] || skillErrorCount['improper_to_mixed']) {
    pedagogicalAdvice.push(
      'בנושא מספרים מעורבים: כדאי להמחיש בעזרת פיצות או מלבני שוקולד שלמים וחתיכות בודדות כדי לחבר את המשמעות הפיזית למספרים.'
    );
  }

  if (skillErrorCount['fraction_of_quantity']) {
    pedagogicalAdvice.push(
      'בחישוב שבר מכמות: הילד זקוק לתזכורת לחלק קודם במכנה (מציאת חלק יחיד) ורק אז לכפול במונה.'
    );
  }

  if (pedagogicalAdvice.length === 0) {
    pedagogicalAdvice.push(
      'המשיכו לעודד למידה סקרנית וחיובית. ההתקדמות הדרגתית ועקבית היא המפתח להצלחה במתמטיקה.'
    );
  }

  // Format time
  const minutes = Math.floor(progress.timeSpentSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const remMinutes = minutes % 60;
  const timeFormatted = hours > 0 ? `${hours} שעות ו-${remMinutes} דקות` : `${minutes} דקות`;

  const totalAccuracy =
    progress.totalSolved > 0
      ? Math.round((progress.totalCorrect / progress.totalSolved) * 100)
      : 0;

  const recentErrors = progress.errorLog.slice(0, 5).map((err) => {
    const topic = TOPICS.find((t) => t.id === err.topicId);
    return {
      topicName: topic?.shortTitle || 'שברים',
      mistakeSummary: `בשאלה "${err.questionPrompt}": סומנה תשובה "${err.studentAnswer}" (התשובה הנכונה: "${err.correctAnswer}").`,
      howToHelpAtHome: err.misconceptionNote
    };
  });

  return {
    strengths,
    struggles: struggles.length > 0 ? struggles : ['לא זוהה קושי מובהק כרגע'],
    pedagogicalAdvice,
    totalPracticeTimeFormatted: timeFormatted,
    accuracyRate: totalAccuracy,
    recentErrors
  };
}

export interface DayProgressStat {
  dayName: string;
  dayShort: string;
  dateKey: string;
  solved: number;
  correct: number;
  incorrect: number;
  accuracy: number;
  practiceMinutes: number;
  isToday: boolean;
}

export function getWeeklyProgressData(progress: StudentProgress): DayProgressStat[] {
  const daysShortHebrew = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'שבת'];
  const daysFullHebrew = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
  
  const result: DayProgressStat[] = [];
  const now = new Date();
  const todayKey = now.toISOString().slice(0, 10);

  // Generate 7 consecutive days up to today (or past 7 days)
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(now.getDate() - i);
    const dateKey = d.toISOString().slice(0, 10);
    const dayOfWeek = d.getDay(); // 0 = Sunday, 6 = Saturday

    const recorded = progress.dailyHistory?.[dateKey];
    let solved = recorded?.solved || 0;
    let correct = recorded?.correct || 0;
    let practiceMinutes = Math.round((recorded?.timeSpentSeconds || (solved * 75)) / 60);

    // If no history exists at all but progress has solved exercises, distribute realistically based on daily streak
    if (!progress.dailyHistory || Object.keys(progress.dailyHistory).length === 0) {
      if (i === 0 && progress.totalSolved > 0) {
        // Today
        solved = Math.min(progress.totalSolved, Math.max(1, Math.round(progress.totalSolved * 0.4)));
        correct = Math.min(progress.totalCorrect, Math.round(solved * (progress.totalCorrect / Math.max(1, progress.totalSolved))));
        practiceMinutes = Math.round((progress.timeSpentSeconds * 0.4) / 60) || solved * 2;
      } else if (i === 1 && progress.totalSolved > 2 && progress.dailyStreak >= 2) {
        // Yesterday
        solved = Math.max(1, Math.round(progress.totalSolved * 0.35));
        correct = Math.round(solved * 0.8);
        practiceMinutes = Math.round((progress.timeSpentSeconds * 0.35) / 60) || solved * 2;
      } else if (i === 2 && progress.totalSolved > 5 && progress.dailyStreak >= 3) {
        // 2 days ago
        solved = Math.max(1, Math.round(progress.totalSolved * 0.25));
        correct = Math.round(solved * 0.75);
        practiceMinutes = Math.round((progress.timeSpentSeconds * 0.25) / 60) || solved * 2;
      }
    }

    const incorrect = Math.max(0, solved - correct);
    const accuracy = solved > 0 ? Math.round((correct / solved) * 100) : 0;

    result.push({
      dayName: `יום ${daysFullHebrew[dayOfWeek]}`,
      dayShort: `יום ${daysShortHebrew[dayOfWeek]}`,
      dateKey,
      solved,
      correct,
      incorrect,
      accuracy,
      practiceMinutes,
      isToday: dateKey === todayKey
    });
  }

  return result;
}

export function seedDemoProgress(): StudentProgress {
  const base = getInitialProgress();
  base.totalSolved = 18;
  base.totalCorrect = 14;
  base.totalIncorrect = 4;
  base.timeSpentSeconds = 1680; // ~28 mins
  base.dailyStreak = 4;

  const now = new Date();
  const dKeys: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(now.getDate() - i);
    dKeys.push(d.toISOString().slice(0, 10));
  }

  base.dailyHistory = {
    [dKeys[0]]: { solved: 0, correct: 0, timeSpentSeconds: 0 },
    [dKeys[1]]: { solved: 2, correct: 2, timeSpentSeconds: 180 },
    [dKeys[2]]: { solved: 3, correct: 2, timeSpentSeconds: 270 },
    [dKeys[3]]: { solved: 4, correct: 3, timeSpentSeconds: 380 },
    [dKeys[4]]: { solved: 3, correct: 2, timeSpentSeconds: 290 },
    [dKeys[5]]: { solved: 0, correct: 0, timeSpentSeconds: 0 },
    [dKeys[6]]: { solved: 6, correct: 5, timeSpentSeconds: 560 }
  };

  base.topicsProgress['whole-part'] = {
    completedUnderstand: true,
    completedTogether: true,
    exercisesSolved: 6,
    correctCount: 6,
    currentLevel: 3,
    consecutiveCorrect: 4,
    consecutiveIncorrect: 0
  };

  base.topicsProgress['number-line'] = {
    completedUnderstand: true,
    completedTogether: true,
    exercisesSolved: 5,
    correctCount: 2,
    currentLevel: 1,
    consecutiveCorrect: 0,
    consecutiveIncorrect: 2
  };

  base.topicsProgress['same-denom'] = {
    completedUnderstand: true,
    completedTogether: false,
    exercisesSolved: 4,
    correctCount: 3,
    currentLevel: 2,
    consecutiveCorrect: 2,
    consecutiveIncorrect: 1
  };

  base.topicsProgress['mixed-numbers'] = {
    completedUnderstand: true,
    completedTogether: true,
    exercisesSolved: 3,
    correctCount: 3,
    currentLevel: 2,
    consecutiveCorrect: 3,
    consecutiveIncorrect: 0
  };

  base.errorLog = [
    {
      id: 'e1',
      topicId: 'number-line',
      skillTag: 'number_line_placement',
      timestamp: Date.now() - 3600000,
      questionPrompt: 'הבט בישר המספרים. איזה שבר מסומן בנקודה האדומה בין 0 ל-1?',
      studentAnswer: '4/3',
      correctAnswer: '3/4',
      misconceptionNote: 'התלמיד הפך בין מונה למכנה ומיקם שבר גדול מ-1 לפני המספר 1.'
    },
    {
      id: 'e2',
      topicId: 'number-line',
      skillTag: 'number_line_intervals',
      timestamp: Date.now() - 1800000,
      questionPrompt: 'הקטע בין 0 ל-1 מחולק ל-6 קטעים שווים. מהו הערך של שנת אחת?',
      studentAnswer: '1/5',
      correctAnswer: '1/6',
      misconceptionNote: 'ספירת קווים במקום ספירת מרווחים (צעדים).'
    },
    {
      id: 'e3',
      topicId: 'same-denom',
      skillTag: 'same_denom_addition',
      timestamp: Date.now() - 900000,
      questionPrompt: 'פתרו את התרגיל: 2/6 + 3/6 = ?',
      studentAnswer: '5/12',
      correctAnswer: '5/6',
      misconceptionNote: 'חיבור שגוי של המכנים (6+6=12) במקום השארת המכנה ללא שינוי.'
    }
  ];

  saveStudentProgress(base);
  return base;
}
