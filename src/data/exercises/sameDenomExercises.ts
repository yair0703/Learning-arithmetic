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
  },
  {
    id: 'sd-master-1',
    topicId: 'same-denom',
    skillTag: 'same_denom_subtraction',
    difficulty: 4,
    title: 'מאסטר ⭐: ביטוי רב-איברים עם סוגריים וצמצום מלא',
    prompt: 'פתרו את הביטוי הבא, המירו למספר מעורב וצמצמו לחלוטין: (19/12 + 17/12) - (11/12 + 7/12) = ?',
    hintSteps: [
      'רמז 1: פתרו את הסוגריים הראשונים: 19/12 + 17/12 = 36/12 = 3 שלמים.',
      'רמז 2: פתרו את הסוגריים השניים: 11/12 + 7/12 = 18/12.',
      'רמז 3: חסרו: 36/12 - 18/12 = 18/12 = 1 6/12. צמצמו את 6/12 וקבלו 1 1/2.'
    ],
    extraExplanation: '(19+17)/12 - (11+7)/12 = 36/12 - 18/12 = 18/12 = 1 6/12 = 1 1/2 (אחד וחצי).',
    visualType: 'bar',
    visualProps: { totalParts: 12, coloredParts: 6, color: '#f59e0b' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '1 1/2 (שהם 18/12)', isCorrect: true },
      { id: 'b', label: '1 1/3 (שהם 16/12)', isCorrect: false, misconceptionExplanation: '18 חלקי 12 מצטמצם בחלוקה ב-6 לחצי (1/2) ולא לשליש.' },
      { id: 'c', label: '2 1/4', isCorrect: false, misconceptionExplanation: '36 פחות 18 שווה 18, ולא 27.' },
      { id: 'd', label: '1 5/12', isCorrect: false, misconceptionExplanation: 'בדקו שוב את חיבור המונים בתוך הסוגריים.' }
    ],
    gentleWrongFeedback: {
      default: 'פתרו לפי סדר פעולות: (36/12) - (18/12) = 18/12 = 1 6/12 = 1 1/2.'
    }
  },
  {
    id: 'sd-master-2',
    topicId: 'same-denom',
    skillTag: 'same_denom_subtraction',
    difficulty: 4,
    title: 'מאסטר ⭐: מציאת שבר נעלם בשרשרת פעולות',
    prompt: 'במשוואה שלפניכם, מהו השבר שצריך להופיע במקום סימן השאלה [?] כדי שהשוויון יתקיים?  4 2/9 - [?] + 5/9 = 2 8/9',
    hintSteps: [
      'רמז 1: המירו את המספרים המעורבים לשברים מדומים בעלי מכנה 9: 4 2/9 = 38/9, ו-2 8/9 = 26/9.',
      'רמז 2: חברו את השברים החיוביים: 38/9 + 5/9 = 43/9.',
      'רמז 3: כעת מצאו את הנעלם: 43/9 פחות 26/9 = 17/9 = 1 8/9.'
    ],
    extraExplanation: 'נמיר לשברים מדומים: 38/9 + 5/9 - [?] = 26/9. לכן 43/9 - [?] = 26/9. הנעלם הוא 43/9 - 26/9 = 17/9 = 1 8/9.',
    visualType: 'bar',
    visualProps: { totalParts: 9, coloredParts: 8, color: '#6366f1' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '1 8/9 (שהם 17/9)', isCorrect: true },
      { id: 'b', label: '2 1/9 (שהם 19/9)', isCorrect: false, misconceptionExplanation: '43 פחות 26 שווה 17 ולא 19.' },
      { id: 'c', label: '1 5/9 (שהם 14/9)', isCorrect: false, misconceptionExplanation: 'בדקו שוב את חיבור 38 ועוד 5 (43).' },
      { id: 'd', label: '2 2/9 (שהם 20/9)', isCorrect: false, misconceptionExplanation: 'החסרת 20/9 הייתה מביאה לתוצאה של 23/9 ולא 26/9.' }
    ],
    gentleWrongFeedback: {
      default: 'המירו למדומים: 43/9 פחות [?] שווה 26/9. לכן [?] = 43/9 - 26/9 = 17/9 = 1 8/9.'
    }
  },
  {
    id: 'sd-master-3',
    topicId: 'same-denom',
    skillTag: 'same_denom_subtraction',
    difficulty: 4,
    title: 'מאסטר ⭐: חיסור כפול משלם שלם עם פריקת שברים',
    prompt: 'חשבו את תוצאת התרגיל: 7 - 2 3/10 - 1 9/10, וצמצמו את התוצאה לצורתה הפשוטה ביותר.',
    hintSteps: [
      'רמז 1: נחבר קודם את שני המספרים שאנו מחסירים: 2 3/10 + 1 9/10 = 3 12/10 = 4 2/10.',
      'רמז 2: כעת נחסר מ-7: 7 פחות 4 2/10 = 2 8/10.',
      'רמז 3: נצמצם את 8/10 ב-2 ונקבל: 2 4/5.'
    ],
    extraExplanation: 'סכום המספרים שמחסירים: 2 3/10 + 1 9/10 = 4 2/10. חיסור מ-7: 7 - 4 2/10 = 2 8/10 = 2 4/5 (או 14/5).',
    visualType: 'bar',
    visualProps: { totalParts: 10, coloredParts: 8, color: '#10b981' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '2 4/5 (שהם 2 8/10)', isCorrect: true },
      { id: 'b', label: '3 1/5 (שהם 3 2/10)', isCorrect: false, misconceptionExplanation: 'כשמחסירים 4 2/10 מ-7 נשאר 2 8/10 ולא 3.' },
      { id: 'c', label: '2 1/2 (שהם 2 5/10)', isCorrect: false, misconceptionExplanation: '10 פחות 2 שווה 8 עשיריות (4/5) ולא 5 עשיריות.' },
      { id: 'd', label: '3 4/5', isCorrect: false, misconceptionExplanation: '7 פחות 4 שלמים מותיר 3 שלמים פחות 2 עשיריות = 2 8/10.' }
    ],
    gentleWrongFeedback: {
      default: 'חברו את המחוסרים: 2 3/10 + 1 9/10 = 4 2/10. 7 פחות 4 2/10 = 2 8/10 = 2 4/5.'
    }
  },
  {
    id: 'sd-master-4',
    topicId: 'same-denom',
    skillTag: 'same_denom_addition',
    difficulty: 4,
    title: 'מאסטר ⭐: שרשרת חיבור וחיסור סוגריים עם צמצום',
    prompt: 'חשבו את הערך של הביטוי: (25/16 - 7/16) - (13/16 - 9/16) + 6/16. מהו המספר המעורב המצומצם ביותר המתקבל?',
    hintSteps: [
      'רמז 1: סוגריים ראשונים: 25/16 - 7/16 = 18/16.',
      'רמז 2: סוגריים שניים: 13/16 - 9/16 = 4/16.',
      'רמז 3: בצעו לפי הסדר: 18/16 - 4/16 + 6/16 = 20/16 = 1 4/16 = 1 1/4.'
    ],
    extraExplanation: '18/16 - 4/16 + 6/16 = (18 - 4 + 6)/16 = 20/16 = 1 4/16 = 1 1/4 (אחד ורבע).',
    visualType: 'bar',
    visualProps: { totalParts: 16, coloredParts: 4, color: '#ec4899' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '1 1/4 (שהם 20/16)', isCorrect: true },
      { id: 'b', label: '1 1/8 (שהם 18/16)', isCorrect: false, misconceptionExplanation: '14/16 ועוד 6/16 שווה 20/16 ולא 18/16.' },
      { id: 'c', label: '1 3/8 (שהם 22/16)', isCorrect: false, misconceptionExplanation: 'בדקו שוב את פעולת החיסור בסוגריים השניים (13 פחות 9 = 4).' },
      { id: 'd', label: '7/8 (שהם 14/16)', isCorrect: false, misconceptionExplanation: 'אל תשכחו להוסיף את 6/16 בסוף הביטוי.' }
    ],
    gentleWrongFeedback: {
      default: 'חשבו שלב אחרי שלב: 18/16 - 4/16 + 6/16 = 20/16 = 1 4/16 = 1 1/4.'
    }
  }
];
