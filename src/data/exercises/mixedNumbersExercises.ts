import { Exercise } from '../../types';

export const mixedNumbersExercises: Exercise[] = [
  {
    id: 'mn-1',
    topicId: 'mixed-numbers',
    skillTag: 'improper_to_mixed',
    difficulty: 1,
    title: 'המרת שבר מדומה למספר מעורב',
    prompt: 'הפכו את השבר 5/2 למספר מעורב:',
    hintSteps: [
      'רמז 1: כל 2 חצאים (2/2) שווים לשלם אחד.',
      'רמז 2: כמה פעמים 2 נכנס בתוך 5? ומה השארית?'
    ],
    extraExplanation: '2 נכנס ב-5 פעמיים שלמות (2 כפול 2 = 4) ונשאר חצי אחד (שארית 1). לכן: 2 ו-1/2.',
    exampleDemonstration: {
      text: '7/2 = 3 שלמים וחצי (3 1/2).',
      visualType: 'mixed-bars',
      visualProps: { wholeCount: 2, remainder: 1, denom: 2 }
    },
    visualType: 'mixed-bars',
    visualProps: { wholeCount: 2, remainder: 1, denom: 2 },
    answerType: 'choice',
    options: [
      { id: 'a', label: '2 ו-1/2', isCorrect: true },
      { id: 'b', label: '1 ו-3/2', isCorrect: false, misconceptionExplanation: 'במספר מעורב אסור שחלק השבר יהיה גדול מ-1 (3/2 גדול מ-1).' },
      { id: 'c', label: '3 ו-1/2', isCorrect: false, misconceptionExplanation: '3 כפול 2 זה 6, אבל היה לנו רק 5!' },
      { id: 'd', label: '5 ו-1/2', isCorrect: false, misconceptionExplanation: '5 זה מספר החצאים הכולל, לא מספר השלמים!' }
    ],
    gentleWrongFeedback: {
      default: 'בוא נחשוב על חצאי תפוזים: אם יש לך 5 חצאי תפוזים, כמה תפוזים שלמים אפשר להרכיב? (כל 2 חצאים = תפוז שלם).'
    }
  },
  {
    id: 'mn-2',
    topicId: 'mixed-numbers',
    skillTag: 'mixed_to_improper',
    difficulty: 2,
    title: 'המרת מספר מעורב לשבר מדומה',
    prompt: 'הפכו את המספר המעורב 3 ו-1/4 לשבר מדומה (שבר שבו המונה גדול מהמכנה):',
    hintSteps: [
      'רמז 1: בכל שלם יש 4 רבעים. כמה רבעים יש ב-3 שלמים?',
      'רמז 2: 3 כפול 4 = 12 רבעים. עכשיו אל תשכח להוסיף את הרבע הנוסף שיש לנו!'
    ],
    extraExplanation: 'ב-3 שלמים יש 12 רבעים (3 כפול 4 = 12). נוסיף את הרבע הקיים: 12 + 1 = 13 רבעים (13/4). המכנה נשאר 4.',
    exampleDemonstration: {
      text: '2 ו-1/3 = (2 כפול 3) + 1 = 7 שלישים (7/3).',
      visualType: 'mixed-bars',
      visualProps: { wholeCount: 3, remainder: 1, denom: 4 }
    },
    visualType: 'mixed-bars',
    visualProps: { wholeCount: 3, remainder: 1, denom: 4 },
    answerType: 'choice',
    options: [
      { id: 'a', label: '13/4', isCorrect: true },
      { id: 'b', label: '12/4', isCorrect: false, misconceptionExplanation: '12/4 זה רק 3 השלמים, שכחת להוסיף את ה-1/4!' },
      { id: 'c', label: '7/4', isCorrect: false, misconceptionExplanation: 'כופלים את השלם (3) במכנה (4), לא מחברים 3 + 4.' },
      { id: 'd', label: '13/3', isCorrect: false, misconceptionExplanation: 'המכנה היה 4 והוא חייב להישאר 4!' }
    ],
    gentleWrongFeedback: {
      default: 'נוסחת הקסם: שלמים כפול מכנה ועוד מונה! 3 כפול 4 = 12, ועוד 1 = 13. והמכנה נשאר 4!'
    }
  },
  {
    id: 'mn-3',
    topicId: 'mixed-numbers',
    skillTag: 'improper_to_mixed',
    difficulty: 2,
    title: 'אתגר המרה מורכבת',
    prompt: 'איזה מספר מעורב שווה לשבר 14/5?',
    hintSteps: [
      'רמז 1: שאל: כמה פעמים 5 נכנס בתוך 14?',
      'רמז 2: 5 נכנס ב-14 פעמיים (5 כפול 2 = 10). כמה נשאר מ-10 עד 14?'
    ],
    extraExplanation: '14 חלקי 5 שווה 2 עם שארית 4. לכן התוצאה היא 2 שלמים ו-4 חמישיות (2 ו-4/5).',
    exampleDemonstration: {
      text: '11/5 = 2 ו-1/5.',
      visualType: 'mixed-bars',
      visualProps: { wholeCount: 2, remainder: 4, denom: 5 }
    },
    visualType: 'mixed-bars',
    visualProps: { wholeCount: 2, remainder: 4, denom: 5 },
    answerType: 'choice',
    options: [
      { id: 'a', label: '2 ו-4/5', isCorrect: true },
      { id: 'b', label: '2 ו-2/5', isCorrect: false, misconceptionExplanation: '14 פחות 10 שווה 4, לא 2!' },
      { id: 'c', label: '3 ו-1/5', isCorrect: false, misconceptionExplanation: '3 כפול 5 זה 15, ואין לנו 15, יש לנו רק 14.' },
      { id: 'd', label: '1 ו-9/5', isCorrect: false, misconceptionExplanation: 'במספר מעורב המונה של השבר חייב להיות קטן מהמכנה.' }
    ],
    gentleWrongFeedback: {
      default: 'בוא נבדוק: 5 כפול 2 = 10. נשאר לנו עוד 4 חמישיות! לכן זה 2 שלמים ו-4/5.'
    }
  },
  {
    id: 'mn-4',
    topicId: 'mixed-numbers',
    skillTag: 'mixed_to_improper',
    difficulty: 2,
    title: 'מגשי פיצה משפחתיים לשבר מדומה',
    prompt: 'במסיבה הזמינו 2 מגשי פיצה שלמים ועוד 3 משולשים ממגש שלישי (כל מגש חתוך ל-6 משולשים שווים). כמה משולשים (שישיות) יש בסך הכל?',
    hintSteps: [
      'רמז 1: בכל מגש שלם יש 6 שישיות (6 משולשים).',
      'רמז 2: ב-2 מגשים יש 12 משולשים (2 כפול 6). נוסיף 3 משולשים נוספים: 12 + 3 = ?'
    ],
    extraExplanation: '2 מגשים שלמים = 12 שישיות (12/6). יחד עם 3 השישיות הנוספות מקבלים 15 שישיות (15/6).',
    visualType: 'mixed-bars',
    visualProps: { wholeCount: 2, remainder: 3, denom: 6 },
    answerType: 'choice',
    options: [
      { id: 'a', label: '15/6 (שהם 2 ו-3/6)', isCorrect: true },
      { id: 'b', label: '12/6', isCorrect: false, misconceptionExplanation: '12/6 מייצג רק את 2 המגשים השלמים, שכחתם את 3 המשולשים הנוספים!' },
      { id: 'c', label: '9/6', isCorrect: false, misconceptionExplanation: '2 כפול 6 = 12, ועוד 3 = 15.' },
      { id: 'd', label: '15/12', isCorrect: false, misconceptionExplanation: 'המכנה מייצג חלוקה של מגש אחד (6) ולא של שני המגשים יחד.' }
    ],
    gentleWrongFeedback: {
      default: 'ספרו את כל המשולשים: 6 במגש הראשון + 6 במגש השני + 3 במגש השלישי = 15 משולשים מתוך חלוקה ל-6.'
    }
  },
  {
    id: 'mn-5',
    topicId: 'mixed-numbers',
    skillTag: 'improper_to_mixed',
    difficulty: 3,
    title: 'בעיית אפייה: חצאי כוסות קמח',
    prompt: 'מתכון לעוגת שוקולד דורש 7 חצאי כוסות קמח (7/2). כמה כוסות קמח שלמות ומלאות יש לשים, וכמה יישאר?',
    hintSteps: [
      'רמז 1: כל 2 חצאים של כוס יוצרים כוס אחת שלמה.',
      'רמז 2: 7 חלקי 2 = 3 כוסות שלמות, עם שארית של חצי כוס (1/2).'
    ],
    extraExplanation: '7 חצאים = 2/2 + 2/2 + 2/2 + 1/2 = 3 כוסות שלמות ועוד חצי כוס (3 ו-1/2).',
    visualType: 'mixed-bars',
    visualProps: { wholeCount: 3, remainder: 1, denom: 2 },
    answerType: 'choice',
    options: [
      { id: 'a', label: '3 כוסות שלמות ועוד 1/2 כוס (3 ו-1/2)', isCorrect: true },
      { id: 'b', label: '4 כוסות שלמות', isCorrect: false, misconceptionExplanation: '4 כוסות שלמות היו דורשות 8 חצאים (4 כפול 2).' },
      { id: 'c', label: '2 כוסות שלמות ו-3/2', isCorrect: false, misconceptionExplanation: 'ב-3/2 יש עוד כוס שלמה אחת!' },
      { id: 'd', label: '7 כוסות שלמות', isCorrect: false, misconceptionExplanation: '7 זה מספר החצאים, לא מספר הכוסות השלמות.' }
    ],
    gentleWrongFeedback: {
      default: 'חלקו 7 ב-2: 2 כפול 3 = 6, ונותר חצי כוס אחת. לכן 3 ו-1/2 כוסות.'
    }
  },
  {
    id: 'mn-6',
    topicId: 'mixed-numbers',
    skillTag: 'improper_to_mixed',
    difficulty: 3,
    title: 'מצא את הטעות בהמרה',
    prompt: 'תלמיד ניסה להמיר את השבר 17/4 למספר מעורב וכתב: 3 ו-5/4. מדוע תשובתו שגויה ומהי התשובה הנכונה?',
    hintSteps: [
      'רמז 1: בשבר 5/4 המונה גדול מהמכנה, כלומר יש בו עוד שלם אחד לפחות!',
      'רמז 2: כמה פעמים 4 נכנס ב-17 במלואו? (4 כפול 4 = 16).'
    ],
    extraExplanation: '4 נכנס ב-17 ארבע פעמים שלמות (4 כפול 4 = 16) ונשאר 1/4. לכן התשובה הנכונה היא 4 ו-1/4.',
    visualType: 'mixed-bars',
    visualProps: { wholeCount: 4, remainder: 1, denom: 4 },
    answerType: 'choice',
    options: [
      { id: 'a', label: 'התשובה הנכונה היא 4 ו-1/4 (כי ב-5/4 יש עוד שלם שלם)', isCorrect: true },
      { id: 'b', label: 'התשובה שלו נכונה לחלוטין', isCorrect: false, misconceptionExplanation: 'במספר מעורב חלק השבר חייב להיות שבר אמיתי (קטן מ-1)!' },
      { id: 'c', label: 'התשובה הנכונה היא 5 ו-1/4', isCorrect: false, misconceptionExplanation: '5 כפול 4 זה 20, ואין לנו 20 רבעים.' }
    ],
    gentleWrongFeedback: {
      default: 'כלל ברזל: במספר מעורב אסור שחלק השבר יהיה גדול מ-1! 17 חלקי 4 שווה 4 שלמים ו-1/4.'
    }
  }
];
