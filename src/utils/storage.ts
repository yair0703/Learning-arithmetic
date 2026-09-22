import { StudentProgress, TopicId, SkillTag, ParentDiagnosticInsight, TopicInfo, Exercise } from '../types';
import { TOPICS, EXERCISE_BANK } from '../data/curriculumData';
import { getFreshExercisesForTopic } from './exerciseGenerator';

export interface TopicMasteryInfo {
  percentage: number;
  status: 'not_started' | 'in_progress' | 'proficient' | 'master';
  statusHebrew: string;
  badgeClass: string;
  stars: number; // 0, 1, 2, 3
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

  const percentage = Math.min(100, Math.max(10, score));

  let status: TopicMasteryInfo['status'] = 'in_progress';
  let statusHebrew = 'בתהליך למידה';
  let badgeClass = 'bg-amber-100 text-amber-800 border-amber-200';
  let stars = 1;

  if (percentage >= 85 || (topicProg.currentLevel === 3 && topicProg.correctCount >= 5)) {
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

  const levelLabel = topicProg.currentLevel === 3 ? 'רמה 3 (מתקדם)' : topicProg.currentLevel === 2 ? 'רמה 2 (בינוני)' : 'רמה 1 (בסיס)';

  return {
    percentage,
    status,
    statusHebrew,
    badgeClass,
    stars,
    levelLabel
  };
}

const STORAGE_KEY = 'maslulim_plus_fractions_v1';

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

  if (params.isCorrect) {
    newProgress.totalCorrect += 1;
    topicProg.correctCount += 1;
    topicProg.consecutiveCorrect += 1;
    topicProg.consecutiveIncorrect = 0;

    // Adaptive difficulty upgrade
    if (topicProg.consecutiveCorrect >= 2 && topicProg.currentLevel < 3) {
      topicProg.currentLevel = (topicProg.currentLevel + 1) as 1 | 2 | 3;
      topicProg.consecutiveCorrect = 0;
    }
  } else {
    newProgress.totalIncorrect += 1;
    topicProg.consecutiveIncorrect += 1;
    topicProg.consecutiveCorrect = 0;

    // Adaptive difficulty downgrade
    if (topicProg.consecutiveIncorrect >= 2 && topicProg.currentLevel > 1) {
      topicProg.currentLevel = (topicProg.currentLevel - 1) as 1 | 2 | 3;
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
  currentLevel: 1 | 2 | 3;
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

export function seedDemoProgress(): StudentProgress {
  const base = getInitialProgress();
  base.totalSolved = 14;
  base.totalCorrect = 10;
  base.totalIncorrect = 4;
  base.timeSpentSeconds = 1240; // ~20 mins
  base.dailyStreak = 3;

  base.topicsProgress['whole-part'] = {
    completedUnderstand: true,
    completedTogether: true,
    exercisesSolved: 5,
    correctCount: 5,
    currentLevel: 3,
    consecutiveCorrect: 3,
    consecutiveIncorrect: 0
  };

  base.topicsProgress['number-line'] = {
    completedUnderstand: true,
    completedTogether: true,
    exercisesSolved: 4,
    correctCount: 1,
    currentLevel: 1,
    consecutiveCorrect: 0,
    consecutiveIncorrect: 2
  };

  base.topicsProgress['same-denom'] = {
    completedUnderstand: true,
    completedTogether: false,
    exercisesSolved: 3,
    correctCount: 2,
    currentLevel: 2,
    consecutiveCorrect: 1,
    consecutiveIncorrect: 1
  };

  base.topicsProgress['mixed-numbers'] = {
    completedUnderstand: true,
    completedTogether: true,
    exercisesSolved: 2,
    correctCount: 2,
    currentLevel: 2,
    consecutiveCorrect: 2,
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
