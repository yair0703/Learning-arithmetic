import { Exercise } from '../../types';

export const decimalsExercises: Exercise[] = [
  {
    id: 'dm-1',
    topicId: 'decimals-mult-div',
    skillTag: 'decimal_multiply_10_100',
    difficulty: 1,
    title: 'כפל שבר עשרוני ב-10',
    prompt: 'פתרו את התרגיל: 3.7 כפול 10 = ?',
    hintSteps: [
      'רמז 1: בכפל ב-10 (אפס אחד) המספר גדל, והנקודה העשרונית זזה צעד אחד ימינה.',
      'רמז 2: אם הנקודה זזה ימינה מ-3.7, היא עוברת את הספרה 7.'
    ],
    extraExplanation: 'כפל ב-10 מזיז את הנקודה העשרונית מקום אחד ימינה: 3.7 הופך ל-37 שלמים.',
    exampleDemonstration: {
      text: '2.5 כפול 10 = 25.',
      visualType: 'decimal-table',
      visualProps: { before: '3.7', op: '× 10', after: '37' }
    },
    visualType: 'decimal-table',
    visualProps: { before: '3.7', op: '× 10', after: '37' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '37', isCorrect: true },
      { id: 'b', label: '0.37', isCorrect: false, misconceptionExplanation: 'זה חילוק ב-10 (הזזת נקודה שמאלה).' },
      { id: 'c', label: '370', isCorrect: false, misconceptionExplanation: '370 זה כפל ב-100.' },
      { id: 'd', label: '3.70', isCorrect: false, misconceptionExplanation: '3.70 שווה בדיוק ל-3.7, המספר חייב לגדול פי 10!' }
    ],
    gentleWrongFeedback: {
      default: 'בכפל ב-10 מזיזים את הנקודה העשרונית צעד אחד ימינה. 3.7 נהיה 37.'
    }
  },
  {
    id: 'dm-2',
    topicId: 'decimals-mult-div',
    skillTag: 'decimal_divide_10_100',
    difficulty: 1,
    title: 'חילוק שבר עשרוני ב-10',
    prompt: 'פתרו את התרגיל: 5.6 חלקי 10 = ?',
    hintSteps: [
      'רמז 1: בחילוק ב-10 המספר קטן, והנקודה העשרונית זזה צעד אחד שמאלה.',
      'רמז 2: אם הנקודה זזה שמאלה מעבר ל-5, נוסיף 0 לפני הנקודה: 0.56.'
    ],
    extraExplanation: 'חילוק ב-10 מקטין את המספר פי 10. הנקודה זזה צעד אחד שמאלה: 5.6 חלקי 10 = 0.56.',
    exampleDemonstration: {
      text: '8.2 חלקי 10 = 0.82.',
      visualType: 'decimal-table',
      visualProps: { before: '5.6', op: '÷ 10', after: '0.56' }
    },
    visualType: 'decimal-table',
    visualProps: { before: '5.6', op: '÷ 10', after: '0.56' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '0.56', isCorrect: true },
      { id: 'b', label: '56', isCorrect: false, misconceptionExplanation: 'זה כפל ב-10 ולא חילוק!' },
      { id: 'c', label: '0.056', isCorrect: false, misconceptionExplanation: 'זה חילוק ב-100 (שני צעדים שמאלה).' }
    ],
    gentleWrongFeedback: {
      default: 'בחילוק ב-10 המספר קטן! הנקודה זזה צעד אחד שמאלה: מ-5.6 ל-0.56.'
    }
  },
  {
    id: 'dm-3',
    topicId: 'decimals-mult-div',
    skillTag: 'decimal_multiply_10_100',
    difficulty: 2,
    title: 'כפל שבר עשרוני ב-100',
    prompt: 'פתרו את התרגיל: 0.84 כפול 100 = ?',
    hintSteps: [
      'רמז 1: ב-100 יש 2 אפסים, לכן הנקודה העשרונית קופצת 2 צעדים ימינה.',
      'רמז 2: קפיצה ראשונה מביאה ל-8.4, וקפיצה שנייה מביאה ל-84.'
    ],
    extraExplanation: 'בכפל ב-100 הנקודה קופצת 2 מקומות ימינה: 0.84 כפול 100 = 84.',
    exampleDemonstration: {
      text: '0.35 כפול 100 = 35.',
      visualType: 'decimal-table',
      visualProps: { before: '0.84', op: '× 100', after: '84' }
    },
    visualType: 'decimal-table',
    visualProps: { before: '0.84', op: '× 100', after: '84' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '84', isCorrect: true },
      { id: 'b', label: '8.4', isCorrect: false, misconceptionExplanation: '8.4 זו תוצאה של כפל ב-10 (צעד אחד בלבד).' },
      { id: 'c', label: '840', isCorrect: false, misconceptionExplanation: 'זה כפל ב-1,000.' },
      { id: 'd', label: '0.0084', isCorrect: false, misconceptionExplanation: 'זה חילוק ב-100.' }
    ],
    gentleWrongFeedback: {
      default: 'כפל ב-100 מזיז את הנקודה 2 מקומות ימינה (כמספר האפסים ב-100): 0.84 -> 8.4 -> 84.'
    }
  },
  {
    id: 'dm-4',
    topicId: 'decimals-mult-div',
    skillTag: 'decimal_multiply_10_100',
    difficulty: 2,
    title: 'כפל ב-100 עם השלמת אפס',
    prompt: 'פתרו את התרגיל: 2.5 כפול 100 = ?',
    hintSteps: [
      'רמז 1: צריך להזיז את הנקודה 2 מקומות ימינה.',
      'רמז 2: קפיצה ראשונה מביאה ל-25. בקפיצה השנייה אין ספרה, אז מה מוסיפים? אפס!'
    ],
    extraExplanation: '2.5 כפול 10 = 25. וכופלים בעוד 10: 25 כפול 10 = 250. הנקודה זזה 2 מקומות ימינה ומשלימים עם 0.',
    exampleDemonstration: {
      text: '4.1 כפול 100 = 410.',
      visualType: 'decimal-table',
      visualProps: { before: '2.5', op: '× 100', after: '250' }
    },
    visualType: 'decimal-table',
    visualProps: { before: '2.5', op: '× 100', after: '250' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '250', isCorrect: true },
      { id: 'b', label: '25', isCorrect: false, misconceptionExplanation: '25 זו רק כפולה ב-10!' },
      { id: 'c', label: '2,500', isCorrect: false, misconceptionExplanation: 'הוספת יותר מדי אפסים.' },
      { id: 'd', label: '0.25', isCorrect: false, misconceptionExplanation: 'חילקת ב-10 במקום לכפול ב-100.' }
    ],
    gentleWrongFeedback: {
      default: 'כשאין עוד ספרות וממשיכים ימינה – מוסיפים אפס! 2.5 -> 25 -> 250.'
    }
  },
  {
    id: 'dm-5',
    topicId: 'decimals-mult-div',
    skillTag: 'decimal_divide_10_100',
    difficulty: 3,
    title: 'חילוק מספר שלם ב-100',
    prompt: 'פתרו את התרגיל: 45 חלקי 100 = ?',
    hintSteps: [
      'רמז 1: במספר שלם 45 הנקודה נמצאת בסופו: 45.0.',
      'רמז 2: חילוק ב-100 מזיז את הנקודה 2 מקומות שמאלה: מעבר ל-5 ומעבר ל-4.'
    ],
    extraExplanation: '45 חלקי 100 = 0.45 (ארבעים וחמש מאיות). הנקודה זזה שני מקומות שמאלה.',
    visualType: 'decimal-table',
    visualProps: { before: '45', op: '÷ 100', after: '0.45' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '0.45', isCorrect: true },
      { id: 'b', label: '4.5', isCorrect: false, misconceptionExplanation: '4.5 זו תוצאה של חילוק ב-10 (צעד אחד בלבד).' },
      { id: 'c', label: '0.045', isCorrect: false, misconceptionExplanation: 'זה חילוק ב-1,000.' },
      { id: 'd', label: '450', isCorrect: false, misconceptionExplanation: 'זה כפל ב-10 ולא חילוק.' }
    ],
    gentleWrongFeedback: {
      default: 'חילוק ב-100 מזיז נקודה שמאלה שני מקומות: 45 הופך ל-0.45.'
    }
  },
  {
    id: 'dm-6',
    topicId: 'decimals-mult-div',
    skillTag: 'decimal_place_value',
    difficulty: 3,
    title: 'יישום מחיי היום-יום: סנטימטרים ומטרים',
    prompt: 'במטר אחד יש 100 סנטימטרים. אורך שולחן הוא 150 ס"מ. כמה מטרים הוא אורכו של השולחן? (150 חלקי 100)',
    hintSteps: [
      'רמז 1: כדי להמיר מסנטימטר למטר – מחלקים ב-100.',
      'רמז 2: 150 חלקי 100: מזיזים את הנקודה העשרונית 2 מקומות שמאלה מ-150.'
    ],
    extraExplanation: '150 חלקי 100 = 1.50 = 1.5 מטרים (מטר וחצי).',
    visualType: 'decimal-table',
    visualProps: { before: '150 ס"מ', op: '÷ 100', after: '1.5 מטר' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '1.5 מטר (מטר וחצי)', isCorrect: true },
      { id: 'b', label: '15 מטר', isCorrect: false, misconceptionExplanation: '15 מטר זה 1,500 ס"מ!' },
      { id: 'c', label: '0.15 מטר', isCorrect: false, misconceptionExplanation: '0.15 מטר זה רק 15 סנטימטר.' },
      { id: 'd', label: '1.05 מטר', isCorrect: false, misconceptionExplanation: 'הנקודה זזה שני מקומות: 1.50 = 1.5.' }
    ],
    gentleWrongFeedback: {
      default: 'הזיזו את הנקודה שמאלה שני מקומות: 150 חלקי 100 = 1.5 מטרים.'
    }
  },
  {
    id: 'dm-master-1',
    topicId: 'decimals-mult-div',
    skillTag: 'decimal_multiply_10_100',
    difficulty: 4,
    title: 'מאסטר ⭐: שרשרת כפל וחילוק עשרונית רב-שלבית',
    prompt: 'חשבו את תוצאת השרשרת העשרונית: (0.075 × 100) ÷ 10 × 100 = ?',
    hintSteps: [
      'רמז 1: שלב ראשון: 0.075 × 100 = 7.5 (מזיזים את הנקודה 2 מקומות ימינה).',
      'רמז 2: שלב שני: 7.5 ÷ 10 = 0.75 (מזיזים את הנקודה מקום אחד שמאלה).',
      'רמז 3: שלב שלישי: 0.75 × 100 = 75 (מזיזים את הנקודה 2 מקומות ימינה).'
    ],
    extraExplanation: '0.075 × 100 = 7.5. לאחר מכן: 7.5 ÷ 10 = 0.75. לבסוף: 0.75 × 100 = 75.',
    visualType: 'decimal-table',
    visualProps: { before: '0.075', op: '× 100 ÷ 10 × 100', after: '75' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '75', isCorrect: true },
      { id: 'b', label: '7.5', isCorrect: false, misconceptionExplanation: '7.5 היא התוצאה אחרי השלב הראשון בלבד!' },
      { id: 'c', label: '750', isCorrect: false, misconceptionExplanation: 'הוספתם מקום עשרוני מיותר.' },
      { id: 'd', label: '0.75', isCorrect: false, misconceptionExplanation: '0.75 היא התוצאה לפני הכפל הסופי ב-100.' }
    ],
    gentleWrongFeedback: {
      default: 'עקבו אחרי הנקודה: 0.075 -> (×100) 7.5 -> (÷10) 0.75 -> (×100) 75.'
    }
  },
  {
    id: 'dm-master-2',
    topicId: 'decimals-mult-div',
    skillTag: 'decimal_place_value',
    difficulty: 4,
    title: 'מאסטר ⭐: מציאת הגורם החסר במשוואה עשרונית',
    prompt: 'במשוואה שלפניכם:  3.4 × [?] ÷ 100 = 340 , מהו המספר שחייב להופיע בתוך סימן השאלה [?] ?',
    hintSteps: [
      'רמז 1: נבצע פעולה הפוכה: אם לאחר חילוק ב-100 קיבלנו 340, אז לפני החילוק התוצאה הייתה 340 × 100 = 34,000.',
      'רמז 2: כעת נשאל: 3.4 כפול איזה מספר שווה ל-34,000?',
      'רמז 3: 34,000 / 3.4 = 10,000 (כי מזיזים את הנקודה ב-3.4 ארבעה מקומות ימינה).'
    ],
    extraExplanation: '3.4 × [?] = 340 × 100 = 34,000. לכן [?] = 34,000 / 3.4 = 10,000.',
    visualType: 'decimal-table',
    visualProps: { before: '3.4', op: '× 10,000 ÷ 100', after: '340' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '10,000', isCorrect: true },
      { id: 'b', label: '1,000', isCorrect: false, misconceptionExplanation: '3.4 × 1,000 = 3,400. חלוקה ב-100 הייתה נותנת 34 ולא 340.' },
      { id: 'c', label: '100', isCorrect: false, misconceptionExplanation: 'כפל וחילוק ב-100 היו משאירים את המספר 3.4.' },
      { id: 'd', label: '100,000', isCorrect: false, misconceptionExplanation: 'הכפלה ב-100,000 הייתה מביאה ל-3,400 ולא ל-340.' }
    ],
    gentleWrongFeedback: {
      default: '340 × 100 = 34,000. המספר שכופלים בו את 3.4 לקבלת 34,000 הוא 10,000.'
    }
  },
  {
    id: 'dm-master-3',
    topicId: 'decimals-mult-div',
    skillTag: 'decimal_divide_10_100',
    difficulty: 4,
    title: 'מאסטר ⭐: המרת יחידות רב-שלבית מטרים למילימטרים',
    prompt: 'גליל בד באורך 4.85 מטרים נחתך ל-10 חתיכות שוות. מהו אורכה של כל חתיכה במילימטרים? (ידוע כי 1 מטר = 1,000 מ"מ).',
    hintSteps: [
      'רמז 1: מצאו את האורך במטרים של חתיכה אחת: 4.85 ÷ 10 = 0.485 מטרים.',
      'רמז 2: המירו ממטרים למילימטרים ע"י הכפלה ב-1,000.',
      'רמז 3: 0.485 × 1,000: הזיזו את הנקודה העשרונית 3 מקומות ימינה לקבלת מילימטרים.'
    ],
    extraExplanation: 'שלב 1: 4.85 / 10 = 0.485 מטר לחתיכה. שלב 2: 0.485 × 1,000 = 485 מילימטרים.',
    visualType: 'decimal-table',
    visualProps: { before: '4.85 מטר', op: '÷ 10 × 1000', after: '485 מ״מ' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '485 מ״מ', isCorrect: true },
      { id: 'b', label: '48.5 מ״מ', isCorrect: false, misconceptionExplanation: '48.5 זה אורך בסנטימטרים (כפל ב-100) ולא במילימטרים!' },
      { id: 'c', label: '4,850 מ״מ', isCorrect: false, misconceptionExplanation: '4,850 מ"מ זה אורך הגליל כולו לפני החיתוך ל-10 חתיכות.' },
      { id: 'd', label: '4.85 מ״מ', isCorrect: false, misconceptionExplanation: 'בדקו שוב: 0.485 × 1,000 = 485.' }
    ],
    gentleWrongFeedback: {
      default: '4.85 מ\' חלקי 10 = 0.485 מ\'. הכפלה ב-1,000 (להמרה למ"מ) נותנת 485 מ"מ.'
    }
  },
  {
    id: 'dm-master-4',
    topicId: 'decimals-mult-div',
    skillTag: 'decimal_multiply_10_100',
    difficulty: 4,
    title: 'מאסטר ⭐: חישוב רכש מרובה והמרת מחיר עשרוני',
    prompt: 'קופסת ברגים מכילה 100 ברגים. מחירו של בורג בודד הוא 35 אגורות (0.35 ש״ח). קבלן רכש 10 קופסאות כאלה. כמה שקלים שילם הקבלן בסך הכל?',
    hintSteps: [
      'רמז 1: כמה ברגים יש ב-10 קופסאות? 10 × 100 = 1,000 ברגים בסך הכל.',
      'רמז 2: כפלו את כמות הברגים (1,000) במחיר בורג יחיד (0.35 ש"ח).',
      'רמז 3: 0.35 × 1,000 = מזיזים את הנקודה 3 מקומות ימינה: 0.35 -> 3.5 -> 35 -> 350.'
    ],
    extraExplanation: '10 קופסאות × 100 ברגים = 1,000 ברגים. מחיר כולל: 1,000 × 0.35 = 350 שקלים.',
    visualType: 'decimal-table',
    visualProps: { before: '0.35 ש״ח', op: '× 100 × 10', after: '350 ש״ח' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '350 שקלים', isCorrect: true },
      { id: 'b', label: '35 שקלים', isCorrect: false, misconceptionExplanation: '35 שקלים זה המחיר של קופסה אחת (100 ברגים) בלבד, הקבלן קנה 10 קופסאות!' },
      { id: 'c', label: '3,500 שקלים', isCorrect: false, misconceptionExplanation: 'הזזתם מקום עשרוני אחד יותר מדי.' },
      { id: 'd', label: '3.5 שקלים', isCorrect: false, misconceptionExplanation: '3.5 שקלים שווה ל-10 ברגים בלבד.' }
    ],
    gentleWrongFeedback: {
      default: 'סה"כ 1,000 ברגים. 1,000 × 0.35 ש"ח = 350 שקלים.'
    }
  }
];
