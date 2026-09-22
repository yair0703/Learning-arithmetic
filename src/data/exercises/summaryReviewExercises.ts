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
  }
];
