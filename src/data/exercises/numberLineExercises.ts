import { Exercise } from '../../types';

export const numberLineExercises: Exercise[] = [
  {
    id: 'nl-1',
    topicId: 'number-line',
    skillTag: 'number_line_placement',
    difficulty: 1,
    title: 'מציאת שבר על ישר המספרים (0 עד 1)',
    prompt: 'הבט בישר המספרים. איזה שבר מסומן בנקודה האדומה בין 0 ל-1?',
    hintSteps: [
      'רמז 1: ספור כמה מרווחים (צעדים) שווים יש בין המספר 0 למספר 1. זהו המכנה!',
      'רמז 2: כעת ספור כמה צעדים קפצנו מ-0 ימינה עד הנקודה האדומה. זהו המונה!'
    ],
    extraExplanation: 'הקטע שבין 0 ל-1 מחולק ל-4 קטעים שווים (המכנה 4). הנקודה נמצאת בשנת השלישית מ-0, לכן זהו השבר 3/4.',
    exampleDemonstration: {
      text: 'בישר שמחולק ל-2 קטעים שווים, הנקודה באמצע היא 1/2.',
      visualType: 'number-line',
      visualProps: { min: 0, max: 1, divisions: 2, targetIndex: 1 }
    },
    visualType: 'number-line',
    visualProps: { min: 0, max: 1, divisions: 4, targetIndex: 3, dotColor: '#ef4444' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '3/4', isCorrect: true },
      { id: 'b', label: '1/4', isCorrect: false, misconceptionExplanation: '1/4 היא השנת הראשונה ליד ה-0.' },
      { id: 'c', label: '2/4', isCorrect: false, misconceptionExplanation: '2/4 היא בדיוק באמצע בין 0 ל-1.' },
      { id: 'd', label: '4/3', isCorrect: false, misconceptionExplanation: '4/3 גדול מ-1, אבל הנקודה שלנו נמצאת לפני 1!' }
    ],
    gentleWrongFeedback: {
      default: 'בוא נספור ביחד: מ-0 לקו הראשון = 1/4, לקו השני = 2/4, ולקו השלישי שבו נמצאת הנקודה = ?'
    }
  },
  {
    id: 'nl-2',
    topicId: 'number-line',
    skillTag: 'number_line_intervals',
    difficulty: 1,
    title: 'גילוי גודל השנת בישר',
    prompt: 'בישר המספרים, הקטע בין 0 ל-1 מחולק ל-6 קטעים שווים. מהו הערך של שנת אחת (קפיצה אחת)?',
    hintSteps: [
      'רמז 1: אם שלם חולק ל-6 קטעים שווים, כל קפיצה בודדת מייצגת שבר יחידה.',
      'רמז 2: שבר יחידה של 6 קטעים הוא 1 חלקי 6.'
    ],
    extraExplanation: 'כאשר מחלקים יחידה שלמה ל-6 קטעים שווים, גודל כל קפיצה הוא שישית אחת (1/6).',
    exampleDemonstration: {
      text: 'חלוקה ל-5 קטעים נותנת קפיצות של 1/5.',
      visualType: 'number-line',
      visualProps: { min: 0, max: 1, divisions: 6, targetIndex: 1 }
    },
    visualType: 'number-line',
    visualProps: { min: 0, max: 1, divisions: 6, targetIndex: 1, dotColor: '#10b981' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '1/6', isCorrect: true },
      { id: 'b', label: '6/1', isCorrect: false, misconceptionExplanation: '6/1 שווה ל-6 שלמים, ופה זו קפיצה קטנה בתוך שלם אחד.' },
      { id: 'c', label: '1/5', isCorrect: false, misconceptionExplanation: 'ספור שוב את הקטעים – יש 6 קטעים ולא 5.' }
    ],
    gentleWrongFeedback: {
      default: 'נזכור: כשמחלקים ל-6 קטעים, כל צעד בודד הוא בדיוק שישית (1/6).'
    }
  },
  {
    id: 'nl-3',
    topicId: 'number-line',
    skillTag: 'number_line_placement',
    difficulty: 2,
    title: 'שבר הגדול מ-1 על ישר המספרים (0 עד 2)',
    prompt: 'הבט בישר המספרים שנמשך מ-0 עד 2. איזה שבר מסומן בנקודה הסגולה (אחרי המספר 1)?',
    hintSteps: [
      'רמז 1: בדוק קודם לכמה קטעים שווים מחולקת כל יחידה שלמה (למשל מ-0 עד 1, או מ-1 עד 2).',
      'רמז 2: כל יחידה מחולקת ל-3 קטעים שווים (שלישים). הנקודה נמצאת שלם אחד ועוד שליש אחד קדימה.'
    ],
    extraExplanation: 'מ-0 עד 1 יש 3 שלישים (3/3). הנקודה נמצאת צעד אחד מעבר ל-1, כלומר 4 שלישים (4/3) או 1 ו-1/3.',
    exampleDemonstration: {
      text: 'שנת אחת אחרי 1 בישר של רבעים היא 1 ו-1/4 (או 5/4).',
      visualType: 'number-line',
      visualProps: { min: 0, max: 2, divisions: 3, targetIndex: 4 }
    },
    visualType: 'number-line',
    visualProps: { min: 0, max: 2, divisions: 3, targetIndex: 4, dotColor: '#8b5cf6' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '1 ו-1/3 (שהם 4/3)', isCorrect: true },
      { id: 'b', label: '2/3', isCorrect: false, misconceptionExplanation: '2/3 נמצא לפני המספר 1, והנקודה שלנו עברה את המספר 1!' },
      { id: 'c', label: '1 ו-2/3', isCorrect: false, misconceptionExplanation: 'זה צעד אחד אחרי 1, לא שני צעדים.' },
      { id: 'd', label: '5/3', isCorrect: false, misconceptionExplanation: '5/3 היה שני צעדים אחרי 1.' }
    ],
    gentleWrongFeedback: {
      default: 'שימו לב: הנקודה נמצאת מימין ל-1! היא שווה ל-1 שלם ועוד קפיצה אחת של שליש, כלומר 1 ו-1/3.'
    }
  },
  {
    id: 'nl-4',
    topicId: 'number-line',
    skillTag: 'number_line_placement',
    difficulty: 2,
    title: 'מיקום שבר מדומה בישר מ-0 עד 3',
    prompt: 'איפה ממוקם השבר 5/2 (חמישה חצאים) על ישר המספרים?',
    hintSteps: [
      'רמז 1: הפכו את 5/2 למספר מעורב: כמה פעמים 2 נכנס ב-5?',
      'רמז 2: 5 חלקי 2 שווה ל-2 שלמים וחצי (2 ו-1/2).'
    ],
    extraExplanation: '5 חצאים הם: 2/2 (שלם אחד) + 2/2 (עוד שלם) + 1/2 = 2 שלמים וחצי. הנקודה נמצאת בדיוק באמצע בין 2 ל-3.',
    visualType: 'number-line',
    visualProps: { min: 0, max: 3, divisions: 2, targetIndex: 5, dotColor: '#3b82f6' },
    answerType: 'choice',
    options: [
      { id: 'a', label: 'באמצע בין המספר 2 למספר 3 (שווה ל-2 ו-1/2)', isCorrect: true },
      { id: 'b', label: 'באמצע בין 0 ל-1', isCorrect: false, misconceptionExplanation: 'שם נמצא חצי (1/2), ולא 5 חצאים!' },
      { id: 'c', label: 'באמצע בין 1 ל-2', isCorrect: false, misconceptionExplanation: 'שם נמצא 1 ו-1/2 (שהם 3 חצאים).' },
      { id: 'd', label: 'אחרי המספר 5', isCorrect: false, misconceptionExplanation: '5/2 קטן מ-3, הוא לא נמצא אחרי 5!' }
    ],
    gentleWrongFeedback: {
      default: 'ספרו חצאים מ-0: חצי, שני חצאים (1), 3 חצאים (1.5), 4 חצאים (2), 5 חצאים (2.5).'
    }
  },
  {
    id: 'nl-5',
    topicId: 'number-line',
    skillTag: 'number_line_placement',
    difficulty: 3,
    title: 'השוואת מיקומים: מי נמצא ימינה יותר?',
    prompt: 'על ישר המספרים מ-0 ל-1, איזה שבר נמצא ימינה יותר (קרוב יותר ל-1): 4/7 או 6/7?',
    hintSteps: [
      'רמז 1: לשני השברים יש אותו מכנה (7).',
      'רמז 2: ככל שהמונה גדול יותר – צועדים יותר צעדים ימינה מ-0 לכיוון ה-1.'
    ],
    extraExplanation: 'במכנים שווים, שבר עם מונה גדול יותר נמצא ימינה יותר על הישר. 6 שביעיות קרובות יותר ל-7 שביעיות (1 שלם) מאשר 4 שביעיות.',
    visualType: 'number-line',
    visualProps: { min: 0, max: 1, divisions: 7, targetIndex: 6, dotColor: '#8b5cf6' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '6/7 נמצא ימינה יותר', isCorrect: true },
      { id: 'b', label: '4/7 נמצא ימינה יותר', isCorrect: false, misconceptionExplanation: '4 שביעיות נמצא 2 צעדים שמאלה מ-6 שביעיות.' },
      { id: 'c', label: 'שניהם באותו מקום בדיוק', isCorrect: false, misconceptionExplanation: 'המונים שונים (4 לעומת 6), לכן המיקום שונה.' }
    ],
    gentleWrongFeedback: {
      default: 'ספרו צעדים מ-0: כדי להגיע ל-4/7 קופצים 4 צעדים, וכדי להגיע ל-6/7 קופצים 6 צעדים ימינה!'
    }
  },
  {
    id: 'nl-6',
    topicId: 'number-line',
    skillTag: 'number_line_intervals',
    difficulty: 3,
    title: 'זיהוי מספר השנתות ביחידה',
    prompt: 'אם בין המספר 0 למספר 1 יש 8 קטעים שווים, מהו השבר של השנת הנמצאת במרחק 5 צעדים מ-0?',
    hintSteps: [
      'רמז 1: מספר הקטעים הכולל (8) הוא המכנה.',
      'רמז 2: מספר הצעדים שצעדנו (5) הוא המונה.'
    ],
    extraExplanation: 'חלוקה ל-8 קטעים שווים יוצרת שמיניות. 5 צעדים מ-0 הם 5 שמיניות (5/8).',
    visualType: 'number-line',
    visualProps: { min: 0, max: 1, divisions: 8, targetIndex: 5, dotColor: '#f59e0b' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '5/8', isCorrect: true },
      { id: 'b', label: '8/5', isCorrect: false, misconceptionExplanation: '8/5 גדול מ-1, אך השנת היא לפני 1.' },
      { id: 'c', label: '3/8', isCorrect: false, misconceptionExplanation: '3/8 זה המרחק שנותר עד ל-1.' },
      { id: 'd', label: '5/10', isCorrect: false, misconceptionExplanation: 'הישר חולק ל-8 חלקים ולא ל-10.' }
    ],
    gentleWrongFeedback: {
      default: 'המונה הוא מספר הצעדים (5), והמכנה הוא מספר הקטעים הכולל (8). התשובה היא 5/8.'
    }
  },
  {
    id: 'nl-master-1',
    topicId: 'number-line',
    skillTag: 'number_line_placement',
    difficulty: 4,
    title: 'מאסטר ⭐: קרבה לשלם – השוואת מרחקים על ציר המספרים',
    prompt: 'על ישר המספרים נתונים שני שברים מדומים: 11/4 ו-17/5. איזה מהשברים קרוב יותר למספר השלם 3, ומהו המרחק שלו מ-3?',
    hintSteps: [
      'רמז 1: המירו את שני השברים למספרים מעורבים: 11/4 = 2 3/4, ו-17/5 = 3 2/5.',
      'רמז 2: חשבו את המרחק של כל אחד מ-3: המרחק מ-2 3/4 ל-3 הוא 1/4 (0.25), והמרחק מ-3 ל-3 2/5 הוא 2/5 (0.40).',
      'רמז 3: השוו את המרחקים: 1/4 קטן מ-2/5, ולכן 11/4 קרוב יותר ל-3!'
    ],
    extraExplanation: '11/4 שווה ל-2 ו-3/4 (מרחק של רבע 1/4 מ-3). 17/5 שווה ל-3 ו-2/5 (מרחק של שתי חמישיות 2/5 = 0.4 מ-3). מכיוון ש-1/4 קטן מ-2/5, 11/4 קרוב יותר ל-3.',
    visualType: 'number-line',
    visualProps: { min: 2, max: 4, divisions: 20, targetIndex: 15, dotColor: '#f59e0b' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '11/4 קרוב יותר ל-3 (במרחק 1/4)', isCorrect: true },
      { id: 'b', label: '17/5 קרוב יותר ל-3 (במרחק 2/5)', isCorrect: false, misconceptionExplanation: '2/5 (0.40) גדול יותר מ-1/4 (0.25), ולכן המרחק מ-17/5 גדול יותר.' },
      { id: 'c', label: 'שני השברים נמצאים בדיוק באותו מרחק מ-3', isCorrect: false, misconceptionExplanation: '1/4 (רבע) אינו שווה ל-2/5 (שתי חמישיות).' },
      { id: 'd', label: '11/4 קרוב יותר ל-3 (במרחק 3/4)', isCorrect: false, misconceptionExplanation: 'המרחק מ-2 3/4 ל-3 הוא 1/4 (ההפרש עד השלם הבא), ולא 3/4.' }
    ],
    gentleWrongFeedback: {
      default: 'המירו למעורבים: 11/4 = 2 3/4 (מרחק 1/4 מ-3). 17/5 = 3 2/5 (מרחק 2/5 מ-3). 1/4 קטן מ-2/5 ולכן 11/4 קרוב יותר.'
    }
  },
  {
    id: 'nl-master-2',
    topicId: 'number-line',
    skillTag: 'number_line_placement',
    difficulty: 4,
    title: 'מאסטר ⭐: נקודת אמצע מדויקת על ישר המספרים',
    prompt: 'איזה מספר מייצג את נקודת האמצע המדויקת שבין השבר המדומה 7/3 לבין המספר השלם 3 על ישר המספרים?',
    hintSteps: [
      'רמז 1: רשמו את 3 כשבר עם מכנה 3: 3 = 9/3.',
      'רמז 2: אמצע המרחק בין 7/3 ל-9/3 הוא הממוצע שלהם: (7/3 + 9/3) לחלק ל-2.',
      'רמז 3: (16/3) לחלק ל-2 = 16/6, נצמצם ב-2 ונקבל 8/3 (שהם 2 ו-2/3).'
    ],
    extraExplanation: 'המספר 3 הוא 9/3. בין 7/3 ל-9/3 יש מרחק של 2 שלישים (2/3). חצי מהמרחק הוא שליש אחד (1/3). 7/3 + 1/3 = 8/3 (או 2 2/3).',
    visualType: 'number-line',
    visualProps: { min: 2, max: 4, divisions: 6, targetIndex: 4, dotColor: '#6366f1' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '8/3 (שהם 2 2/3)', isCorrect: true },
      { id: 'b', label: '8/6 (שהם 1 1/3)', isCorrect: false, misconceptionExplanation: '8/6 קטן מ-2, ואילו 7/3 ו-3 נמצאים מעל 2.' },
      { id: 'c', label: '5/2 (שהם 2 1/2)', isCorrect: false, misconceptionExplanation: '2 1/2 = 2.5, בעוד ש-8/3 = 2.666... נקודת האמצע בין 2.333 ל-3 היא 2.666.' },
      { id: 'd', label: '7/2 (שהם 3 1/2)', isCorrect: false, misconceptionExplanation: '3 1/2 גדול מ-3, ולכן אינו יכול להיות האמצע בין 7/3 ל-3.' }
    ],
    gentleWrongFeedback: {
      default: '3 שווה ל-9/3. המספר שנמצא בדיוק באמצע בין 7/3 ל-9/3 הוא 8/3!'
    }
  },
  {
    id: 'nl-master-3',
    topicId: 'number-line',
    skillTag: 'number_line_intervals',
    difficulty: 4,
    title: 'מאסטר ⭐: מרחק מקוטע בין שנתות פנימיות',
    prompt: 'הקטע בין 1 ל-2 על ישר המספרים חולק ל-12 שנתות שוות. נקודה A נמצאת 3 שנתות מימין ל-1, ונקודה B נמצאת 8 שנתות מימין ל-1. מהו המרחק המצומצם בין נקודה B לנקודה A?',
    hintSteps: [
      'רמז 1: ספרו כמה שנתות (קטעים קטנים) מפרידות בין שנת 3 לשנת 8: 8 - 3 = 5 שנתות.',
      'רמז 2: מכיוון שכל יחידה שלמה מחולקת ל-12 שנתות, כל שנתה שווה ל-1/12.',
      'רמז 3: 5 שנתות שוות ל-5/12.'
    ],
    extraExplanation: 'נקודה A היא 1 + 3/12 = 15/12. נקודה B היא 1 + 8/12 = 20/12. המרחק ביניהן הוא 20/12 - 15/12 = 5/12 (חמש חלקי שתים-עשרה).',
    visualType: 'number-line',
    visualProps: { min: 1, max: 2, divisions: 12, targetIndex: 5, dotColor: '#10b981' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '5/12', isCorrect: true },
      { id: 'b', label: '1/2', isCorrect: false, misconceptionExplanation: '1/2 שווה ל-6/12, אך המרחק ביניהן הוא רק 5 שנתות.' },
      { id: 'c', label: '1/3', isCorrect: false, misconceptionExplanation: '1/3 שווה ל-4/12, אך המרחק הוא 8 - 3 = 5 שנתות.' },
      { id: 'd', label: '11/12', isCorrect: false, misconceptionExplanation: '11/12 זה סכום השנתות (3+8) ולא ההפרש ביניהן.' }
    ],
    gentleWrongFeedback: {
      default: 'המרחק בין שנת 3 לשנת 8 הוא 5 קטעים. כיוון שהשלם מחולק ל-12, המרחק הוא 5/12.'
    }
  },
  {
    id: 'nl-master-4',
    topicId: 'number-line',
    skillTag: 'number_line_placement',
    difficulty: 4,
    title: 'מאסטר ⭐: זיהוי השבר הגדול ביותר מבין שברים מדומים',
    prompt: 'איזה מבין ארבעת המספרים הבאים ממוקם בנקודה הימנית ביותר (בעל הערך הגדול ביותר) על ישר המספרים: 19/6, 13/4, 16/5, או 3 1/3?',
    hintSteps: [
      'רמז 1: המירו את כל השברים למספרים מעורבים עם שלם 3: 19/6 = 3 1/6, 13/4 = 3 1/4, 16/5 = 3 1/5, 3 1/3.',
      'רמז 2: השוו את השברים: 1/6, 1/4, 1/5, 1/3. לאיזה שבר יש את המכנה הקטן ביותר (כלומר החלק הגדול ביותר)?',
      'רמז 3: 1/3 גדול מ-1/4, 1/5 ו-1/6. לכן 3 1/3 הוא הגדול מכולם.'
    ],
    extraExplanation: 'כולם שווים ל-3 שלמים ועוד שבר יחידה: 3 1/6 (3.16), 3 1/5 (3.20), 3 1/4 (3.25), 3 1/3 (3.33). השבר 1/3 הוא הגדול מכולם ולכן 3 1/3 נמצא הכי ימינה על הישר.',
    visualType: 'number-line',
    visualProps: { min: 3, max: 4, divisions: 12, targetIndex: 4, dotColor: '#ec4899' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '3 1/3 (שהם 10/3)', isCorrect: true },
      { id: 'b', label: '13/4 (שהם 3 1/4)', isCorrect: false, misconceptionExplanation: '1/4 = 0.25 קטן מ-1/3 = 0.333...' },
      { id: 'c', label: '16/5 (שהם 3 1/5)', isCorrect: false, misconceptionExplanation: '1/5 = 0.20 קטן מ-1/3.' },
      { id: 'd', label: '19/6 (שהם 3 1/6)', isCorrect: false, misconceptionExplanation: '1/6 = 0.166... הוא הקטן מבין ארבעתם.' }
    ],
    gentleWrongFeedback: {
      default: 'המירו למעורבים: 3 1/6, 3 1/5, 3 1/4, 3 1/3. ככל שהמכנה קטן יותר החלק גדול יותר: 1/3 > 1/4 > 1/5 > 1/6, לכן 3 1/3 הוא הגדול ביותר!'
    }
  }
];
