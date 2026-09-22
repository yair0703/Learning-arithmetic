import { Exercise } from '../../types';

export const fractionalAmountExercises: Exercise[] = [
  {
    id: 'fa-1',
    topicId: 'fractional-amount',
    skillTag: 'fraction_word_problems',
    difficulty: 1,
    title: 'מציאת השלם משבר יחידה',
    prompt: 'אם 1/4 (רבע) ממחיר ספר הוא 12 שקלים, מהו המחיר המלא של הספר כולו?',
    hintSteps: [
      'רמז 1: בספר כולו יש 4 רבעים (4/4).',
      'רמז 2: אם רבע אחד שווה 12 שקלים, כמה שווים 4 רבעים ביחד? (12 כפול 4)'
    ],
    extraExplanation: 'רבע אחד שווה 12 שקלים. בספר כולו יש 4 רבעים: 12 כפול 4 = 48 שקלים.',
    exampleDemonstration: {
      text: 'אם 1/3 זה 10, אז השלם הוא 10 כפול 3 = 30.',
      visualType: 'bar',
      visualProps: { totalParts: 4, coloredParts: 1 }
    },
    visualType: 'bar',
    visualProps: { totalParts: 4, coloredParts: 1, color: '#8b5cf6' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '48 שקלים', isCorrect: true },
      { id: 'b', label: '24 שקלים', isCorrect: false, misconceptionExplanation: '24 שקלים זה חצי מהספר (שני רבעים).' },
      { id: 'c', label: '3 שקלים', isCorrect: false, misconceptionExplanation: 'חילקת ב-4 במקום לכפול! כשהספר כולו נדרש, המחיר גדל.' },
      { id: 'd', label: '36 שקלים', isCorrect: false, misconceptionExplanation: '36 זה 3 רבעים.' }
    ],
    gentleWrongFeedback: {
      default: 'אם רבע אחד עולה 12 שקלים, הספר המלא עולה פי 4! כפלו 12 ב-4.'
    }
  },
  {
    id: 'fa-2',
    topicId: 'fractional-amount',
    skillTag: 'fraction_word_problems',
    difficulty: 2,
    title: 'מציאת השלם מחלק שאינו שבר יחידה',
    prompt: 'בטיול כיתתי, 2/3 מהתלמידים הם 20 ילדים. כמה תלמידים יש בכל הכיתה?',
    hintSteps: [
      'רמז 1: אם 2 שלישים הם 20 ילדים, כמה ילדים יש בשליש אחד (1/3)? (20 חלקי 2)',
      'רמז 2: שליש אחד שווה 10 ילדים. כמה ילדים יש ב-3 שלישים (בכל הכיתה)? (10 כפול 3)'
    ],
    extraExplanation: 'שלב 1: 20 חלקי 2 = 10 ילדים בכל שליש (1/3).\nשלב 2: 10 כפול 3 = 30 תלמידים בכל הכיתה.',
    exampleDemonstration: {
      text: 'אם 3/4 שווים 15: שליש של 15 זה 5 (1/4), והשלם הוא 5 כפול 4 = 20.',
      visualType: 'bar',
      visualProps: { totalParts: 3, coloredParts: 2 }
    },
    visualType: 'bar',
    visualProps: { totalParts: 3, coloredParts: 2, color: '#3b82f6' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '30 תלמידים', isCorrect: true },
      { id: 'b', label: '40 תלמידים', isCorrect: false, misconceptionExplanation: 'בדקו שוב את הכפל: 10 כפול 3 זה 30.' },
      { id: 'c', label: '10 תלמידים', isCorrect: false, misconceptionExplanation: '10 זה רק שליש אחד מהכיתה!' },
      { id: 'd', label: '25 תלמידים', isCorrect: false, misconceptionExplanation: 'חלקו קודם 20 ב-2 (10), ואז כפלו ב-3.' }
    ],
    gentleWrongFeedback: {
      default: 'בצעו בשני צעדים: 20 חלקי 2 = 10 (שליש אחד). כעת כפלו ב-3 לקבלת כל הכיתה!'
    }
  },
  {
    id: 'fa-3',
    topicId: 'fractional-amount',
    skillTag: 'fraction_word_problems',
    difficulty: 2,
    title: 'מיכל מים וקיבולת מלאה',
    prompt: 'מיכל מים מלא עד כדי 3/5 מקיבולתו ומכיל כעת 15 ליטרים. כמה ליטרים מכיל המיכל כשהוא מלא לגמרי?',
    hintSteps: [
      'רמז 1: אם 3 חמישיות הן 15 ליטר, כמה ליטרים יש בחמישית אחת (1/5)? (15 חלקי 3 = 5 ליטר).',
      'רמז 2: במיכל מלא יש 5 חמישיות: 5 ליטר כפול 5 = ?'
    ],
    extraExplanation: '15 חלקי 3 = 5 ליטרים בכל חמישית. 5 ליטר כפול 5 = 25 ליטרים בסך הכל.',
    visualType: 'bar',
    visualProps: { totalParts: 5, coloredParts: 3, color: '#06b6d4' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '25 ליטרים', isCorrect: true },
      { id: 'b', label: '20 ליטרים', isCorrect: false, misconceptionExplanation: 'בדקו את הכפל: 5 כפול 5 = 25.' },
      { id: 'c', label: '45 ליטרים', isCorrect: false, misconceptionExplanation: 'חלקו קודם ב-3 (המונה) ואז כפלו ב-5 (המכנה).' },
      { id: 'd', label: '15 ליטרים', isCorrect: false, misconceptionExplanation: '15 ליטר זה רק החלק המלא כרגע!' }
    ],
    gentleWrongFeedback: {
      default: 'חלקו 15 ב-3 לקבלת חמישית אחת (5 ליטר), וכפלו ב-5 לקבלת מיכל שלם (25 ליטר).'
    }
  },
  {
    id: 'fa-4',
    topicId: 'fractional-amount',
    skillTag: 'fraction_word_problems',
    difficulty: 3,
    title: 'השוואת כמויות חלקיות',
    prompt: 'מה גדול יותר: 2/5 מתוך 50 או 3/4 מתוך 24?',
    hintSteps: [
      'רמז 1: חשבו קודם את הכמות הראשונה: 50 חלקי 5 = 10. 10 כפול 2 = ?',
      'רמז 2: חשבו את הכמות השנייה: 24 חלקי 4 = 6. 6 כפול 3 = ?'
    ],
    extraExplanation: '2/5 מ-50: 50 חלקי 5 = 10, כפול 2 = 20.\n3/4 מ-24: 24 חלקי 4 = 6, כפול 3 = 18.\n20 גדול מ-18, ולכן 2/5 מתוך 50 גדול יותר.',
    exampleDemonstration: {
      text: 'חצי מ-20 הוא 10, ושליש מ-30 הוא 10 – הם שווים.',
      visualType: 'bar',
      visualProps: { totalParts: 5, coloredParts: 2 }
    },
    visualType: 'bar',
    visualProps: { totalParts: 5, coloredParts: 2, color: '#10b981' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '2/5 מתוך 50 גדול יותר (20 לעומת 18)', isCorrect: true },
      { id: 'b', label: '3/4 מתוך 24 גדול יותר', isCorrect: false, misconceptionExplanation: '3/4 מ-24 שווה 18, שזה קטן מ-20.' },
      { id: 'c', label: 'שתי הכמויות שוות בדיוק', isCorrect: false, misconceptionExplanation: 'האחת היא 20 והשנייה 18, הן אינן שוות.' }
    ],
    gentleWrongFeedback: {
      default: 'חשבו כל חלק בנפרד: כמה זה 2/5 מ-50? (20). וכמה זה 3/4 מ-24? (18). כעת השוו ביניהם.'
    }
  },
  {
    id: 'fa-5',
    topicId: 'fractional-amount',
    skillTag: 'fraction_word_problems',
    difficulty: 3,
    title: 'מסלול ריצה: מציאת האורך הכולל',
    prompt: 'רצה רצה 12 קילומטרים, שהם בדיוק 2/3 (שני שלישים) מאורך המסלול כולו. מהו אורכו של כל המסלול?',
    hintSteps: [
      'רמז 1: אם 2 שלישים שווים 12 ק"מ, כמה שווה שליש אחד (1/3)? (12 חלקי 2 = 6 ק"מ).',
      'רמז 2: המסלול כולו הוא 3 שלישים: 6 ק"מ כפול 3 = ?'
    ],
    extraExplanation: 'שלב 1: 12 חלקי 2 = 6 ק"מ (כל שליש מהמסלול).\nשלב 2: 6 כפול 3 = 18 ק"מ אורכו של המסלול כולו.',
    visualType: 'bar',
    visualProps: { totalParts: 3, coloredParts: 2, color: '#f59e0b' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '18 ק"מ', isCorrect: true },
      { id: 'b', label: '24 ק"מ', isCorrect: false, misconceptionExplanation: 'בדקו את הכפל: 6 כפול 3 = 18.' },
      { id: 'c', label: '8 ק"מ', isCorrect: false, misconceptionExplanation: '8 ק"מ קטן מ-12, אך המסלול כולו ארוך יותר ממה שכבר רצה!' },
      { id: 'd', label: '16 ק"מ', isCorrect: false, misconceptionExplanation: 'חלקו ב-2 וכפלו ב-3.' }
    ],
    gentleWrongFeedback: {
      default: 'שלב 1: 12 חלקי 2 = 6 ק"מ (שליש). שלב 2: 6 כפול 3 = 18 ק"מ למסלול כולו.'
    }
  }
];
