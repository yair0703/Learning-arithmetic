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
  },
  {
    id: 'fa-master-1',
    topicId: 'fractional-amount',
    skillTag: 'fraction_word_problems',
    difficulty: 4,
    title: 'מאסטר ⭐: תחרות מסע אופניים – מציאת הדרך הנותרת',
    prompt: 'רוכב אופניים יצא למסע בן 180 קילומטרים. ביום הראשון רכב 2/9 מכלל המסלול. ביום השני רכב 3/5 מהדרך שנותרה. כמה קילומטרים נותרו לו לרכוב ביום השלישי?',
    hintSteps: [
      'רמז 1: יום ראשון: 2/9 מתוך 180 = (180 / 9) × 2 = 40 ק"מ. הדרך שנותרה: 180 - 40 = 140 ק"מ.',
      'רמז 2: יום שני: 3/5 מתוך 140 = (140 / 5) × 3 = 28 × 3 = 84 ק"מ.',
      'רמז 3: הדרך ליום השלישי: 140 פחות 84 ק"מ (או 2/5 מתוך 140).'
    ],
    extraExplanation: 'לאחר יום א׳ נותרו 140 ק"מ. ביום ב׳ רכב 84 ק"מ (3/5 מ-140). ליום ג׳ נותרו: 140 - 84 = 56 ק"מ (שהם 2/5 מ-140 ק"מ).',
    visualType: 'bar',
    visualProps: { totalParts: 9, coloredParts: 2, color: '#f59e0b' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '56 ק"מ', isCorrect: true },
      { id: 'b', label: '84 ק"מ', isCorrect: false, misconceptionExplanation: '84 ק"מ זה המרחק שרכב ביום השני בלבד, נשאלתם מה נותר ליום השלישי!' },
      { id: 'c', label: '64 ק"מ', isCorrect: false, misconceptionExplanation: '140 פחות 84 שווה 56 ולא 64.' },
      { id: 'd', label: '48 ק"מ', isCorrect: false, misconceptionExplanation: 'בדקו שוב את חישוב 3/5 מ-140 (140 חלקי 5 = 28, כפול 3 = 84).' }
    ],
    gentleWrongFeedback: {
      default: 'יום 1: 40 ק"מ (נותרו 140). יום 2: 3/5 מ-140 = 84 ק"מ. יום 3: 140 - 84 = 56 ק"מ.'
    }
  },
  {
    id: 'fa-master-2',
    topicId: 'fractional-amount',
    skillTag: 'fraction_word_problems',
    difficulty: 4,
    title: 'מאסטר ⭐: שחזור כמות שלמה וחישוב שבר יעד',
    prompt: 'ידוע כי 3/7 מכמות מיץ במיכל שווה בדיוק ל-54 ליטרים. כמה ליטרים יהיו שווים ל-5/6 מאותו המיכל כשהוא מלא?',
    hintSteps: [
      'רמז 1: מצאו את תכולת המיכל המלא: אם 3/7 = 54 ליטר, אז 1/7 = 54 / 3 = 18 ליטר.',
      'רמז 2: כל המיכל (7/7) מכיל: 18 × 7 = 126 ליטרים.',
      'רמז 3: כעת חשבו 5/6 מתוך 126: (126 / 6) × 5 = 21 × 5.'
    ],
    extraExplanation: 'המיכל כולו: (54 / 3) × 7 = 126 ליטרים. 5/6 מתוך 126 ליטרים: 126 / 6 = 21, 21 × 5 = 105 ליטרים.',
    visualType: 'bar',
    visualProps: { totalParts: 7, coloredParts: 3, color: '#6366f1' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '105 ליטרים', isCorrect: true },
      { id: 'b', label: '110 ליטרים', isCorrect: false, misconceptionExplanation: '21 × 5 = 105 ולא 110.' },
      { id: 'c', label: '96 ליטרים', isCorrect: false, misconceptionExplanation: 'בדקו שוב את כפל 18 ב-7 (126 ליטרים במיכל).' },
      { id: 'd', label: '115 ליטרים', isCorrect: false, misconceptionExplanation: '126 חלקי 6 שווה 21, כפול 5 שווה 105.' }
    ],
    gentleWrongFeedback: {
      default: 'המיכל המלא = (54 / 3) × 7 = 126 ליטר. כעת: 5/6 מ-126 = 21 × 5 = 105 ליטר.'
    }
  },
  {
    id: 'fa-master-3',
    topicId: 'fractional-amount',
    skillTag: 'fraction_word_problems',
    difficulty: 4,
    title: 'מאסטר ⭐: תערובת פירות וחישוב שבר מצומצם מהשלם',
    prompt: 'בארגז פירות יש 240 פירות: 3/10 מהם תפוחים, 1/4 מהם תפוזים, 1/6 מהם אגסים, והשאר בננות. כמה בננות יש בארגז, ואיזה שבר מצומצם הן מהוות מכלל הארגז?',
    hintSteps: [
      'רמז 1: חשבו כל פרי: תפוחים = (240 / 10) × 3 = 72, תפוזים = 240 / 4 = 60, אגסים = 240 / 6 = 40.',
      'רמז 2: סכמו את הפירות הידועים: 72 + 60 + 40 = 172. כמה בננות נותרו? 240 - 172 = 68.',
      'רמז 3: צמצמו את השבר: 68 מתוך 240 = 68/240 (נחלק מונה ומכנה ב-4) = 17/60.'
    ],
    extraExplanation: 'תפוחים (72) + תפוזים (60) + אגסים (40) = 172. בננות: 240 - 172 = 68 בננות. השבר הוא 68/240 = 17/60.',
    visualType: 'bar',
    visualProps: { totalParts: 10, coloredParts: 3, color: '#10b981' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '68 בננות (שהן 17/60 מכלל הארגז)', isCorrect: true },
      { id: 'b', label: '72 בננות (שהן 3/10 מכלל הארגז)', isCorrect: false, misconceptionExplanation: '72 זה מספר התפוחים בארגז.' },
      { id: 'c', label: '64 בננות (שהן 4/15 מכלל הארגז)', isCorrect: false, misconceptionExplanation: '240 פחות 172 שווה 68 ולא 64.' },
      { id: 'd', label: '58 בננות (שהן 29/120 מכלל הארגז)', isCorrect: false, misconceptionExplanation: 'בדקו שוב את חיבור 72 + 60 + 40 = 172.' }
    ],
    gentleWrongFeedback: {
      default: 'פירות אחרים = 72 + 60 + 40 = 172. בננות = 240 - 172 = 68. השבר: 68/240 = 17/60.'
    }
  },
  {
    id: 'fa-master-4',
    topicId: 'fractional-amount',
    skillTag: 'fraction_word_problems',
    difficulty: 4,
    title: 'מאסטר ⭐: השוואת שברי הנחות ומחיר סופי לתשלום',
    prompt: 'חנות א׳ מוכרת מעיל שמחירו המקורי 360 ש״ח בהנחה של 3/8 ממחירו. חנות ב׳ מוכרת מעיל זהה שמחירו המקורי 400 ש״ח בהנחה של 2/5 ממחירו. באיזו חנות המחיר הסופי זול יותר ובכמה?',
    hintSteps: [
      'רמז 1: חנות א׳: הנחה = (360 / 8) × 3 = 135 ש"ח. מחיר סופי = 360 - 135 = 225 ש"ח.',
      'רמז 2: חנות ב׳: הנחה = (400 / 5) × 2 = 160 ש"ח. מחיר סופי = 400 - 160 = 240 ש"ח.',
      'רמז 3: השוו את המחירים הסופיים: 240 פחות 225 שקלים.'
    ],
    extraExplanation: 'חנות א׳: משלמים 5/8 מ-360 = 225 ש"ח. חנות ב׳: משלמים 3/5 מ-400 = 240 ש"ח. בחנות א׳ המחיר זול יותר ב-240 - 225 = 15 ש"ח.',
    visualType: 'bar',
    visualProps: { totalParts: 8, coloredParts: 5, color: '#ec4899' },
    answerType: 'choice',
    options: [
      { id: 'a', label: 'בחנות א׳ זול יותר ב-15 שקלים (225 ש״ח לעומת 240 ש״ח)', isCorrect: true },
      { id: 'b', label: 'בחנות ב׳ זול יותר ב-20 שקלים', isCorrect: false, misconceptionExplanation: 'בחנות ב׳ המחיר הסופי הוא 240 ש"ח, שזה יקר יותר מ-225 ש"ח.' },
      { id: 'c', label: 'בשתי החנויות המחיר הסופי זהה (240 ש״ח)', isCorrect: false, misconceptionExplanation: '225 ש"ח אינו שווה ל-240 ש"ח.' },
      { id: 'd', label: 'בחנות א׳ זול יותר ב-25 שקלים', isCorrect: false, misconceptionExplanation: '240 פחות 225 שווה 15 שקלים.' }
    ],
    gentleWrongFeedback: {
      default: 'חנות א׳: 360 - 135 = 225 ש"ח. חנות ב׳: 400 - 160 = 240 ש"ח. חנות א׳ זולה ב-15 ש"ח.'
    }
  }
];
