import { Exercise } from '../../types';

export const summaryReviewExercises: Exercise[] = [
  {
    id: 'sr-1',
    topicId: 'summary-review',
    skillTag: 'same_denom_addition',
    difficulty: 1,
    title: 'חידת שרשרת שברים',
    prompt: 'מהי התוצאה של התרגיל: 2/9 + 4/9 + 1/9 = ?',
    hintSteps: [
      'רמז 1: לכל שלושת השברים יש מכנה 9.',
      'רמז 2: חברו את כל המונים יחד: 2 + 4 + 1 = ?'
    ],
    extraExplanation: 'המכנה 9 נשאר כפי שהוא. מחברים את המונים: 2 + 4 + 1 = 7. התוצאה היא 7/9.',
    exampleDemonstration: {
      text: '1/7 + 2/7 + 3/7 = 6/7.',
      visualType: 'bar',
      visualProps: { totalParts: 9, coloredParts: 7 }
    },
    visualType: 'bar',
    visualProps: { totalParts: 9, coloredParts: 7, color: '#0ea5e9' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '7/9', isCorrect: true },
      { id: 'b', label: '7/27', isCorrect: false, misconceptionExplanation: 'אל תחברו את המכנים! המכנה נשאר 9.' },
      { id: 'c', label: '6/9', isCorrect: false, misconceptionExplanation: 'ספרו שוב: 2 + 4 = 6, ועוד 1 = 7.' }
    ],
    gentleWrongFeedback: {
      default: 'המכנה נשאר 9, ופשוט מחברים את המונים: 2 + 4 + 1 = ?'
    }
  },
  {
    id: 'sr-2',
    topicId: 'summary-review',
    skillTag: 'mixed_to_improper',
    difficulty: 2,
    title: 'אתגר שוויון מספרים',
    prompt: 'איזה שבר מדומה שווה בדיוק למספר המעורב 2 ו-3/5?',
    hintSteps: [
      'רמז 1: כפלו את השלם (2) במכנה (5): 2 כפול 5 = 10 חמישיות.',
      'רמז 2: הוסיפו את 3 החמישיות שיש לנו: 10 + 3 = ?'
    ],
    extraExplanation: '2 כפול 5 = 10, ועוד 3 = 13. התוצאה היא 13/5.',
    exampleDemonstration: {
      text: '1 ו-2/5 = 7/5.',
      visualType: 'mixed-bars',
      visualProps: { wholeCount: 2, remainder: 3, denom: 5 }
    },
    visualType: 'mixed-bars',
    visualProps: { wholeCount: 2, remainder: 3, denom: 5 },
    answerType: 'choice',
    options: [
      { id: 'a', label: '13/5', isCorrect: true },
      { id: 'b', label: '11/5', isCorrect: false, misconceptionExplanation: '2 כפול 5 זה 10, ועוד 3 זה 13 ולא 11.' },
      { id: 'c', label: '8/5', isCorrect: false, misconceptionExplanation: 'כופלים 2 ב-5 ולא מחברים 2 + 5!' },
      { id: 'd', label: '13/10', isCorrect: false, misconceptionExplanation: 'המכנה נשאר 5!' }
    ],
    gentleWrongFeedback: {
      default: 'שלמים כפול מכנה ועוד מונה: 2 כפול 5 = 10, ועוד 3 = 13 חמישיות.'
    }
  },
  {
    id: 'sr-3',
    topicId: 'summary-review',
    skillTag: 'fraction_word_problems',
    difficulty: 2,
    title: 'משימת סיכום מסלולים פלוס: פיצה משותפת',
    prompt: 'דן אכל 1/4 מפיצה, ויעל אכלה 2/4 מאותה פיצה. איזה חלק מהפיצה נשאר לאכול במגש?',
    hintSteps: [
      'רמז 1: כמה אכלו שניהם ביחד? 1/4 + 2/4 = ?',
      'רמז 2: שניהם אכלו 3/4. הפיצה השלמה היא 4/4. כמה נשאר?'
    ],
    extraExplanation: 'יחד אכלו: 1/4 + 2/4 = 3/4 מהפיצה. פיצה שלמה היא 4/4, ולכן נשאר: 4/4 - 3/4 = 1/4 (רבע).',
    exampleDemonstration: {
      text: 'אם אכלו חצי ועוד רבע (3/4), נשאר רבע (1/4).',
      visualType: 'circle',
      visualProps: { totalParts: 4, coloredParts: 3 }
    },
    visualType: 'circle',
    visualProps: { totalParts: 4, coloredParts: 3, color: '#f59e0b' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '1/4 (רבע פיצה)', isCorrect: true },
      { id: 'b', label: '3/4', isCorrect: false, misconceptionExplanation: '3/4 זה מה שהם אכלו ביחד, השאלה היא מה נשאר!' },
      { id: 'c', label: '2/4', isCorrect: false, misconceptionExplanation: '4 פחות 3 משאיר 1.' }
    ],
    gentleWrongFeedback: {
      default: 'שניהם יחד אכלו 3 רבעים מתוך 4. כמה רבעים חסרים כדי להגיע לפיצה שלמה?'
    }
  },
  {
    id: 'sr-4',
    topicId: 'summary-review',
    skillTag: 'fraction_of_quantity',
    difficulty: 3,
    title: 'משימת סיכום רב-שלבית: פירות בסל',
    prompt: 'בסל יש 32 פירות: תפוחים ותפוזים. 3/4 מהפירות הם תפוחים. כמה תפוזים יש בסל?',
    hintSteps: [
      'רמז 1: כמה תפוחים יש בסל? 32 חלקי 4 = 8. 8 כפול 3 = 24 תפוחים.',
      'רמז 2: שאר הפירות הם תפוזים: 32 פחות 24 = ?'
    ],
    extraExplanation: 'תפוחים: 3/4 מתוך 32 = 24. תפוזים (השארית): 32 פחות 24 = 8 תפוזים (שזה גם 1/4 מ-32).',
    visualType: 'quantity',
    visualProps: { totalItems: 32, groups: 4, itemsPerGroup: 8, selectedGroups: 3, itemName: 'פירות' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '8 תפוזים', isCorrect: true },
      { id: 'b', label: '24 תפוזים', isCorrect: false, misconceptionExplanation: '24 זה מספר התפוחים בסל!' },
      { id: 'c', label: '16 תפוזים', isCorrect: false, misconceptionExplanation: '16 זה חצי מ-32.' },
      { id: 'd', label: '6 תפוזים', isCorrect: false, misconceptionExplanation: '32 פחות 24 שווה 8.' }
    ],
    gentleWrongFeedback: {
      default: 'חשבו את מספר התפוחים (24) והחסירו מכלל הפירות (32): 32 פחות 24 = 8 תפוזים.'
    }
  },
  {
    id: 'sr-5',
    topicId: 'summary-review',
    skillTag: 'fraction_word_problems',
    difficulty: 3,
    title: 'חידת הבלש המתמטי',
    prompt: 'אני שבר הקטן מ-1 אך גדול מחצי (1/2). המכנה שלי הוא 10 והמונה שלי הוא מספר אי-זוגי. מי אני?',
    hintSteps: [
      'רמז 1: חצי שווה ל-5/10. לכן המונה חייב להיות גדול מ-5.',
      'רמז 2: המונה חייב להיות אי-זוגי וקטן מ-10. האפשרויות הגדולות מ-5 הן 7 או 9.'
    ],
    extraExplanation: '5/10 זה בדיוק חצי. שבר גדול מחצי עם מכנה 10 ומונה אי-זוגי יכול להיות 7/10 (או 9/10). מבין האפשרויות המוצעות: 7/10.',
    visualType: 'bar',
    visualProps: { totalParts: 10, coloredParts: 7, color: '#ec4899' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '7/10', isCorrect: true },
      { id: 'b', label: '3/10', isCorrect: false, misconceptionExplanation: '3/10 קטן מחצי (חצי זה 5/10)!' },
      { id: 'c', label: '6/10', isCorrect: false, misconceptionExplanation: '6 הוא מספר זוגי, והחידה ציינה מספר אי-זוגי!' },
      { id: 'd', label: '5/10', isCorrect: false, misconceptionExplanation: '5/10 שווה בדיוק לחצי ולא גדול מחצי.' }
    ],
    gentleWrongFeedback: {
      default: 'בדקו את תנאי החידה: מכנה 10, גדול מ-5/10 (חצי), ומונה אי-זוגי (כמו 7).'
    }
  },
  {
    id: 'sr-master-1',
    topicId: 'summary-review',
    skillTag: 'fraction_word_problems',
    difficulty: 4,
    title: 'מאסטר ⭐: אתגר המבחן המשולב – שברים, כמויות ושארית',
    prompt: 'במבחן רב-שלבי: נועה פתרה 5/12 מהשאלות בשעה הראשונה, ובשעה השנייה פתרה עוד 1/4 מכלל השאלות. נותרו לה 16 שאלות לסיום המבחן. כמה שאלות היו במבחן כולו, ואיזה שבר מהמבחן נותר לה לפתור?',
    hintSteps: [
      'רמז 1: חברו את השאלות שנפתרו: 5/12 + 1/4 = 5/12 + 3/12 = 8/12 = 2/3 מהמבחן.',
      'רמז 2: החלק שנותר לפתור: 1 - 2/3 = 1/3 מהמבחן.',
      'רמז 3: אם שליש (1/3) מהמבחן שווה ל-16 שאלות, כמה שווה כל המבחן (3 שלישים)? 16 × 3.'
    ],
    extraExplanation: 'נועה פתרה 5/12 + 3/12 = 8/12 = 2/3 מהמבחן. נותר לה 1/3 שהם 16 שאלות. סך כל השאלות: 16 × 3 = 48 שאלות.',
    visualType: 'bar',
    visualProps: { totalParts: 12, coloredParts: 8, color: '#f59e0b' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '48 שאלות בסך הכל (נותר 1/3 מהמבחן)', isCorrect: true },
      { id: 'b', label: '40 שאלות בסך הכל (נותר 1/4 מהמבחן)', isCorrect: false, misconceptionExplanation: '8/12 שווה ל-2/3, ולכן נותר שליש (1/3) ולא רבע.' },
      { id: 'c', label: '36 שאלות בסך הכל', isCorrect: false, misconceptionExplanation: '16 כפול 3 שווה 48 ולא 36.' },
      { id: 'd', label: '64 שאלות בסך הכל', isCorrect: false, misconceptionExplanation: 'בדקו שוב: 16 כפול 3 (שלישים) = 48.' }
    ],
    gentleWrongFeedback: {
      default: 'חיבור שברים: 5/12 + 3/12 = 8/12 = 2/3. נותר 1/3 = 16 שאלות. המבחן כולו = 16 × 3 = 48 שאלות.'
    }
  },
  {
    id: 'sr-master-2',
    topicId: 'summary-review',
    skillTag: 'improper_to_mixed',
    difficulty: 4,
    title: 'מאסטר ⭐: חידת בלש מתמטי רב-תנאית על שבר מדומה',
    prompt: 'אני מספר מעורב השוכן בין 3 ל-4. חלק השבר שלי הוא בעל מכנה 8. כשממירים אותי לשבר מדומה, המונה שלי הוא מספר ראשוני (מתחלק רק ב-1 ובעצמו) הגדול מ-27. מי אני?',
    hintSteps: [
      'רמז 1: נבדוק מונים לשברים מדומים בין 3 ל-4 עם מכנה 8 (מ-25 עד 31): 3 1/8=25/8, 3 3/8=27/8, 3 5/8=29/8, 3 7/8=31/8.',
      'רמז 2: 25 מתחלק ב-5 (אינו ראשוני), 27 מתחלק ב-3 ו-9 (אינו ראשוני).',
      'רמז 3: המספר הראשוני הראשון שגדול מ-27 הוא 29 (המונה של 3 5/8).'
    ],
    extraExplanation: '3 5/8 = (3 × 8 + 5)/8 = 29/8. המספר 29 הוא מספר ראשוני והוא גדול מ-27.',
    visualType: 'bar',
    visualProps: { totalParts: 8, coloredParts: 5, color: '#6366f1' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '3 5/8 (המונה המדומה שלו הוא 29, שהוא מספר ראשוני)', isCorrect: true },
      { id: 'b', label: '3 3/8 (המונה שלו 27)', isCorrect: false, misconceptionExplanation: '27 מתחלק ב-3 וב-9 ולכן אינו מספר ראשוני!' },
      { id: 'c', label: '3 1/8 (המונה שלו 25)', isCorrect: false, misconceptionExplanation: '25 אינו גדול מ-27 ואינו ראשוני (מתחלק ב-5).' },
      { id: 'd', label: '3 4/8 (המונה שלו 28)', isCorrect: false, misconceptionExplanation: '28 הוא מספר זוגי ואינו ראשוני.' }
    ],
    gentleWrongFeedback: {
      default: 'המירו למדומה: 3 5/8 = 29/8. המספר 29 הוא מספר ראשוני הגדול מ-27.'
    }
  },
  {
    id: 'sr-master-3',
    topicId: 'summary-review',
    skillTag: 'same_denom_comparison',
    difficulty: 4,
    title: 'מאסטר ⭐: סדר עולה והשוואת שברים מרובי מכנים',
    prompt: 'סדרו את ארבעת השברים הבאים מהקטן ביותר לגדול ביותר:  A = 7/12 , B = 5/8 , C = 3/5 , D = 13/24. מהו הסדר הנכון?',
    hintSteps: [
      'רמז 1: הביאו את כל השברים למכנה משותף של 120 (או המירו לעשרוני).',
      'רמז 2: D = 13/24 = 65/120 (0.541), A = 7/12 = 70/120 (0.583), C = 3/5 = 72/120 (0.600), B = 5/8 = 75/120 (0.625).',
      'רמז 3: סדרו לפי המונים: 65 < 70 < 72 < 75.'
    ],
    extraExplanation: 'במכנה 120: 13/24 = 65/120, 7/12 = 70/120, 3/5 = 72/120, 5/8 = 75/120. הסדר העולה הוא: 13/24 < 7/12 < 3/5 < 5/8.',
    visualType: 'bar',
    visualProps: { totalParts: 24, coloredParts: 13, color: '#10b981' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '13/24 < 7/12 < 3/5 < 5/8', isCorrect: true },
      { id: 'b', label: '7/12 < 13/24 < 3/5 < 5/8', isCorrect: false, misconceptionExplanation: '13/24 (65/120) קטן מ-7/12 (70/120).' },
      { id: 'c', label: '13/24 < 3/5 < 7/12 < 5/8', isCorrect: false, misconceptionExplanation: '7/12 (0.583) קטן מ-3/5 (0.600).' },
      { id: 'd', label: '3/5 < 7/12 < 13/24 < 5/8', isCorrect: false, misconceptionExplanation: '3/5 גדול מ-7/12 ומ-13/24.' }
    ],
    gentleWrongFeedback: {
      default: 'הביאו למכנה 120: 13/24 (65) < 7/12 (70) < 3/5 (72) < 5/8 (75).'
    }
  },
  {
    id: 'sr-master-4',
    topicId: 'summary-review',
    skillTag: 'fraction_word_problems',
    difficulty: 4,
    title: 'מאסטר ⭐: סכום מרחקים של מספרים מעורבים בעלי מכנים שונים',
    prompt: 'איתי רץ 3 3/4 ק"מ בבוקר, 2 5/8 ק"מ בצהריים, ו-1 1/2 ק"מ בערב. כמה קילומטרים רץ איתי בסך הכל בכל היום (כמספר מעורב)?',
    hintSteps: [
      'רמז 1: הרחיבו את כל השברים למכנה משותף 8: 3 3/4 = 3 6/8, 2 5/8 = 2 5/8, 1 1/2 = 1 4/8.',
      'רמז 2: חברו את השלמים: 3 + 2 + 1 = 6 שלמים.',
      'רמז 3: חברו את השברים: 6/8 + 5/8 + 4/8 = 15/8 = 1 7/8. סכמו הכל: 6 + 1 7/8.'
    ],
    extraExplanation: '3 6/8 + 2 5/8 + 1 4/8 = 6 + 15/8 = 6 + 1 7/8 = 7 7/8 ק"מ (שהם 63/8 ק"מ).',
    visualType: 'mixed-bars',
    visualProps: { wholeCount: 7, remainder: 7, denom: 8 },
    answerType: 'choice',
    options: [
      { id: 'a', label: '7 7/8 קילומטרים', isCorrect: true },
      { id: 'b', label: '7 5/8 קילומטרים', isCorrect: false, misconceptionExplanation: 'סכום המונים הוא 6 + 5 + 4 = 15, כלומר 1 7/8 ולא 1 5/8.' },
      { id: 'c', label: '6 7/8 קילומטרים', isCorrect: false, misconceptionExplanation: 'אל תשכחו להוסיף את השלם שהתקבל מ-15/8 (1 7/8) ל-6 השלמים.' },
      { id: 'd', label: '8 1/8 קילומטרים', isCorrect: false, misconceptionExplanation: '15 שמיניות הן 1 7/8 ולא 2 1/8.' }
    ],
    gentleWrongFeedback: {
      default: 'הרחיבו לשמיניות: 3 6/8 + 2 5/8 + 1 4/8 = 6 15/8 = 7 7/8 ק"מ.'
    }
  }
];
