import { Exercise } from '../../types';

export const sameDenomExercises: Exercise[] = [
  {
    id: 'sd-1',
    topicId: 'same-denom',
    skillTag: 'same_denom_addition',
    difficulty: 1,
    title: 'חיבור שברים בעלי מכנה שווה',
    prompt: 'פתרו את התרגיל: 2/6 + 3/6 = ?',
    hintSteps: [
      'רמז 1: המכנים שווים (6). מה קורה למכנה בחיבור? הוא נשאר בדיוק אותו דבר!',
      'רמז 2: חברו רק את המונים שלמעלה: 2 + 3 = ?'
    ],
    extraExplanation: 'בחיבור שברים בעלי מכנה זהה, המכנה נשאר 6, ומחברים רק את המונים: 2 + 3 = 5. התוצאה: 5/6.',
    exampleDemonstration: {
      text: '1/5 + 2/5 = 3/5.',
      visualType: 'bar',
      visualProps: { totalParts: 6, coloredParts: 5, color: '#ef4444' }
    },
    visualType: 'bar',
    visualProps: { totalParts: 6, coloredParts: 5, color: '#ef4444' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '5/6', isCorrect: true },
      { id: 'b', label: '5/12', isCorrect: false, misconceptionExplanation: 'אזהרה! אסור לחבר את המכנים (6+6)! המכנה נשאר 6.' },
      { id: 'c', label: '1/6', isCorrect: false, misconceptionExplanation: 'זה חיבור ולא חיסור.' },
      { id: 'd', label: '6/5', isCorrect: false, misconceptionExplanation: 'המונה למעלה (5) והמכנה למטה (6).' }
    ],
    gentleWrongFeedback: {
      default: 'זכור את הכלל המוזהב של כיתה ה׳: המכנה אף פעם לא משתנה בחיבור! מחברים רק את המונים למעלה.'
    }
  },
  {
    id: 'sd-2',
    topicId: 'same-denom',
    skillTag: 'same_denom_subtraction',
    difficulty: 1,
    title: 'חיסור שברים בעלי מכנה שווה',
    prompt: 'פתרו את התרגיל: 7/9 - 4/9 = ?',
    hintSteps: [
      'רמז 1: המכנה 9 נשאר ללא שינוי.',
      'רמז 2: החסירו את המונים: 7 פחות 4 = ?'
    ],
    extraExplanation: 'המכנה נשאר 9. מחסרים את המונים: 7 - 4 = 3. התוצאה היא 3/9.',
    exampleDemonstration: {
      text: '5/7 - 2/7 = 3/7.',
      visualType: 'bar',
      visualProps: { totalParts: 9, coloredParts: 3, color: '#06b6d4' }
    },
    visualType: 'bar',
    visualProps: { totalParts: 9, coloredParts: 3, color: '#06b6d4' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '3/9', isCorrect: true },
      { id: 'b', label: '3/0', isCorrect: false, misconceptionExplanation: 'אסור להחסיר מכנים! המכנה נשאר 9.' },
      { id: 'c', label: '11/9', isCorrect: false, misconceptionExplanation: 'זהו תרגיל חיסור, לא חיבור.' }
    ],
    gentleWrongFeedback: {
      default: 'מחסרים רק את המונים: 7 פחות 4 שווה 3, והמכנה 9 נשאר בדיוק כפי שהיה!'
    }
  },
  {
    id: 'sd-3',
    topicId: 'same-denom',
    skillTag: 'same_denom_subtraction',
    difficulty: 2,
    title: 'חיסור משלם שלם אחד',
    prompt: 'פתרו את התרגיל: 1 - 3/7 = ?',
    hintSteps: [
      'רמז 1: כדי לחסר מ-1 שלם, נהפוך קודם את ה-1 לשבר עם מכנה 7.',
      'רמז 2: 1 שלם שווה ל-7 שביעיות (7/7). כעת חשבו: 7/7 פחות 3/7 = ?'
    ],
    extraExplanation: 'הופכים 1 ל-7/7. כעת מחסרים: 7/7 - 3/7 = 4/7.',
    exampleDemonstration: {
      text: '1 - 2/5 = 5/5 - 2/5 = 3/5.',
      visualType: 'bar',
      visualProps: { totalParts: 7, coloredParts: 4, color: '#ec4899' }
    },
    visualType: 'bar',
    visualProps: { totalParts: 7, coloredParts: 4, color: '#ec4899' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '4/7', isCorrect: true },
      { id: 'b', label: '2/7', isCorrect: false, misconceptionExplanation: '7 פחות 3 זה 4, לא 2!' },
      { id: 'c', label: '3/7', isCorrect: false, misconceptionExplanation: '3/7 זה מה שהחסרנו, לא מה שנשאר.' },
      { id: 'd', label: '1 ו-3/7', isCorrect: false, misconceptionExplanation: 'זה תרגיל חיסור, לא חיבור.' }
    ],
    gentleWrongFeedback: {
      default: 'טיפ של אלופים: הפכו תמיד את המספר 1 לשבר שמתאים למכנה! כאן 1 הופך ל-7/7, ואז 7 פחות 3 = 4 שביעיות.'
    }
  },
  {
    id: 'sd-4',
    topicId: 'same-denom',
    skillTag: 'same_denom_addition',
    difficulty: 2,
    title: 'חיבור שהתוצאה גדולה מ-1',
    prompt: 'חשבו: 4/5 + 3/5 = ? וכתבו כמספר מעורב:',
    hintSteps: [
      'רמז 1: חברו את המונים: 4 + 3 = 7. התוצאה היא 7/5 (שבע חמישיות).',
      'רמז 2: הפכו את 7/5 למספר מעורב: 5 נכנס ב-7 פעם אחת ונשאר 2.'
    ],
    extraExplanation: '4/5 + 3/5 = 7/5. ב-7 חמישיות יש שלם אחד (5/5) ועוד 2 חמישיות. לכן: 1 ו-2/5.',
    exampleDemonstration: {
      text: '3/4 + 2/4 = 5/4 = 1 ו-1/4.',
      visualType: 'mixed-bars',
      visualProps: { wholeCount: 1, remainder: 2, denom: 5 }
    },
    visualType: 'mixed-bars',
    visualProps: { wholeCount: 1, remainder: 2, denom: 5 },
    answerType: 'choice',
    options: [
      { id: 'a', label: '1 ו-2/5', isCorrect: true },
      { id: 'b', label: '7/10', isCorrect: false, misconceptionExplanation: 'זכור לא לחבר מכנים!' },
      { id: 'c', label: '1 ו-1/5', isCorrect: false, misconceptionExplanation: '7 פחות 5 שווה 2, לכן נשארות 2 חמישיות.' },
      { id: 'd', label: '2 שלמים', isCorrect: false, misconceptionExplanation: '2 שלמים היו דורשים 10 חמישיות.' }
    ],
    gentleWrongFeedback: {
      default: 'חברו קודם: 4 + 3 = 7 חמישיות. עכשיו הפכו למספר מעורב: כמה שלמים יש ב-7 חמישיות?'
    }
  },
  {
    id: 'sd-5',
    topicId: 'same-denom',
    skillTag: 'same_denom_subtraction',
    difficulty: 3,
    title: 'חיסור משני שלמים (2 שלמים)',
    prompt: 'פתרו את התרגיל: 2 - 3/5 = ?',
    hintSteps: [
      'רמז 1: ניקח שלם אחד מתוך ה-2 ונהפוך אותו לחמישיות (5/5).',
      'רמז 2: נשאר לנו שלם 1 אחד, ומתוך ה-5/5 נחסר 3/5: 5 פחות 3 = 2 חמישיות.'
    ],
    extraExplanation: '2 שווה ל-1 ו-5/5. מחסרים 3/5 מתוך 5/5 ומקבלים: 1 שלם ו-2/5.',
    visualType: 'mixed-bars',
    visualProps: { wholeCount: 1, remainder: 2, denom: 5 },
    answerType: 'choice',
    options: [
      { id: 'a', label: '1 ו-2/5', isCorrect: true },
      { id: 'b', label: '2/5', isCorrect: false, misconceptionExplanation: 'שכחתם את השלם הראשון שנשאר ללא נגיעה!' },
      { id: 'c', label: '1 ו-3/5', isCorrect: false, misconceptionExplanation: '5 פחות 3 זה 2 חמישיות, לא 3 חמישיות.' },
      { id: 'd', label: '2 ו-2/5', isCorrect: false, misconceptionExplanation: 'זה תרגיל חיסור, התוצאה חייבת להיות קטנה מ-2.' }
    ],
    gentleWrongFeedback: {
      default: '2 שלמים מורכבים משלם 1 ועוד 5/5. אם מורידים 3/5 מהחלק השבור, נשאר 1 ו-2/5.'
    }
  },
  {
    id: 'sd-6',
    topicId: 'same-denom',
    skillTag: 'same_denom_addition',
    difficulty: 3,
    title: 'חיבור של שלושה שברים בזה אחר זה',
    prompt: 'חשבו את תוצאת השרשרת: 2/8 + 3/8 + 1/8 = ?',
    hintSteps: [
      'רמז 1: לכל השברים יש אותו מכנה (8), לכן המכנה בתוצאה יישאר 8.',
      'רמז 2: חברו את שלושת המונים ברצף: 2 + 3 + 1 = ?'
    ],
    extraExplanation: 'המכנה 8 נשאר קבוע. המונים: 2 + 3 + 1 = 6. התוצאה היא 6/8.',
    visualType: 'bar',
    visualProps: { totalParts: 8, coloredParts: 6, color: '#10b981' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '6/8', isCorrect: true },
      { id: 'b', label: '6/24', isCorrect: false, misconceptionExplanation: 'אסור לחבר את המכנים! המכנה נשאר 8.' },
      { id: 'c', label: '5/8', isCorrect: false, misconceptionExplanation: 'ספרו שוב: 2 + 3 = 5, ועוד 1 = 6.' },
      { id: 'd', label: '1 שלם', isCorrect: false, misconceptionExplanation: 'שלם שלם דורש 8/8.' }
    ],
    gentleWrongFeedback: {
      default: 'חברו את כל המונים שלמעלה: 2 ועוד 3 ועוד 1 = 6 שמיניות (6/8).'
    }
  }
];
