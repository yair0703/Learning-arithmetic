import { Exercise } from '../../types';

export const partOfQuantityExercises: Exercise[] = [
  {
    id: 'pq-1',
    topicId: 'part-of-quantity',
    skillTag: 'unit_fraction_of_quantity',
    difficulty: 1,
    title: 'מציאת שבר יחידה מכמות',
    prompt: 'בסלסילה יש 18 תפוחים. 1/3 (שליש) מהתפוחים ירוקים. כמה תפוחים ירוקים יש בסלסילה?',
    hintSteps: [
      'רמז 1: כדי למצוא שליש (1/3), מחלקים את כל התפוחים ל-3 קבוצות שוות.',
      'רמז 2: כמה זה 18 חלקי 3?'
    ],
    extraExplanation: '1/3 מתוך 18 מחושב על ידי 18 חלקי 3 = 6. יש 6 תפוחים ירוקים.',
    exampleDemonstration: {
      text: '1/4 מתוך 12 = 12 חלקי 4 = 3.',
      visualType: 'quantity',
      visualProps: { totalItems: 18, groups: 3, itemsPerGroup: 6, selectedGroups: 1 }
    },
    visualType: 'quantity',
    visualProps: { totalItems: 18, groups: 3, itemsPerGroup: 6, selectedGroups: 1, itemName: 'תפוחים' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '6 תפוחים', isCorrect: true },
      { id: 'b', label: '3 תפוחים', isCorrect: false, misconceptionExplanation: '3 זה המכנה של השבר, לא התשובה!' },
      { id: 'c', label: '9 תפוחים', isCorrect: false, misconceptionExplanation: '9 זה חצי מ-18, לא שליש.' },
      { id: 'd', label: '15 תפוחים', isCorrect: false, misconceptionExplanation: '18 חלקי 3 שווה 6.' }
    ],
    gentleWrongFeedback: {
      default: 'למציאת שליש (1/3): מחלקים את המספר 18 ב-3. נסה לחשוב בלוח הכפל: 3 כפול כמה שווה 18?'
    }
  },
  {
    id: 'pq-2',
    topicId: 'part-of-quantity',
    skillTag: 'fraction_of_quantity',
    difficulty: 2,
    title: 'מציאת שבר שאינו שבר יחידה',
    prompt: 'בחוג ספורט יש 24 ילדים. 3/8 מהילדים משחקים כדורסל. כמה ילדים משחקים כדורסל?',
    hintSteps: [
      'רמז 1: שלב ראשון – חלקו 24 ב-8 כדי לדעת כמה ילדים יש בשמינית אחת (1/8).',
      'רמז 2: 24 חלקי 8 = 3. שלב שני – הכפילו את התוצאה ב-3 (המונה): 3 כפול 3 = ?'
    ],
    extraExplanation: 'שלב 1: 24 חלקי 8 = 3 ילדים (כל שמינית).\nשלב 2: 3 כפול 3 = 9 ילדים שמשחקים כדורסל.',
    exampleDemonstration: {
      text: '2/5 מתוך 20: 20 חלקי 5 = 4. 4 כפול 2 = 8.',
      visualType: 'quantity',
      visualProps: { totalItems: 24, groups: 8, itemsPerGroup: 3, selectedGroups: 3 }
    },
    visualType: 'quantity',
    visualProps: { totalItems: 24, groups: 8, itemsPerGroup: 3, selectedGroups: 3, itemName: 'ילדים' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '9 ילדים', isCorrect: true },
      { id: 'b', label: '3 ילדים', isCorrect: false, misconceptionExplanation: '3 ילדים זה רק שמינית אחת (1/8), ואנחנו צריכים 3 שמיניות!' },
      { id: 'c', label: '8 ילדים', isCorrect: false, misconceptionExplanation: '8 זה המכנה.' },
      { id: 'd', label: '12 ילדים', isCorrect: false, misconceptionExplanation: '12 זה חצי (4/8), ולא 3/8.' }
    ],
    gentleWrongFeedback: {
      default: 'בצעו בשני שלבים: 24 חלקי 8 = 3. ועכשיו: 3 כפול 3 = ?'
    }
  },
  {
    id: 'pq-3',
    topicId: 'part-of-quantity',
    skillTag: 'fraction_word_problems',
    difficulty: 2,
    title: 'בעיית זמן: דקות בשעה',
    prompt: 'בשעה אחת יש 60 דקות. כמה דקות יש ב-3/4 (שלושת רבעי) שעה?',
    hintSteps: [
      'רמז 1: כמה דקות יש ברבע שעה (1/4 מ-60)? 60 חלקי 4 = 15 דקות.',
      'רמז 2: כעת קחו 3 רבעים כאלה: 15 כפול 3 = ?'
    ],
    extraExplanation: 'שלב 1: 60 חלקי 4 = 15 דקות בכל רבע שעה.\nשלב 2: 15 כפול 3 = 45 דקות בשלושת רבעי שעה.',
    visualType: 'quantity',
    visualProps: { totalItems: 60, groups: 4, itemsPerGroup: 15, selectedGroups: 3, itemName: 'דקות' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '45 דקות', isCorrect: true },
      { id: 'b', label: '15 דקות', isCorrect: false, misconceptionExplanation: '15 דקות הן רק רבע שעה (1/4) אחד!' },
      { id: 'c', label: '30 דקות', isCorrect: false, misconceptionExplanation: '30 דקות הן חצי שעה (2/4).' },
      { id: 'd', label: '40 דקות', isCorrect: false, misconceptionExplanation: '15 כפול 3 שווה 45 ולא 40.' }
    ],
    gentleWrongFeedback: {
      default: 'חישוב בשני שלבים: 60 חלקי 4 = 15 (רבע שעה). 15 כפול 3 = 45 דקות.'
    }
  },
  {
    id: 'pq-4',
    topicId: 'part-of-quantity',
    skillTag: 'fraction_word_problems',
    difficulty: 3,
    title: 'שארית הכמות: מדבקות שנותרו',
    prompt: 'למאיה היו 30 מדבקות. היא נתנה לחברה שלה 2/5 מהמדבקות. כמה מדבקות נשארו למאיה?',
    hintSteps: [
      'רמז 1: קודם חשבו כמה מדבקות מאיה נתנה לחברה: כמה זה 2/5 מתוך 30?',
      'רמז 2: 30 חלקי 5 = 6. 6 כפול 2 = 12 מדבקות לחברה. עכשיו החסירו מ-30 את מה שנתנה!'
    ],
    extraExplanation: 'מאיה נתנה: 30 חלקי 5 כפול 2 = 12 מדבקות. נשארו לה: 30 פחות 12 = 18 מדבקות (או לחילופין נשארו לה 3/5 מ-30 שהם 18).',
    exampleDemonstration: {
      text: 'מתוך 20 שוקולדים אכלו 1/4 (5), נשארו 15.',
      visualType: 'quantity',
      visualProps: { totalItems: 30, groups: 5, itemsPerGroup: 6, selectedGroups: 2 }
    },
    visualType: 'quantity',
    visualProps: { totalItems: 30, groups: 5, itemsPerGroup: 6, selectedGroups: 2, itemName: 'מדבקות' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '18 מדבקות נשארו', isCorrect: true },
      { id: 'b', label: '12 מדבקות', isCorrect: false, misconceptionExplanation: '12 זה כמה שהיא נתנה לחברה, השאלה היא כמה נשאר לה!' },
      { id: 'c', label: '6 מדבקות', isCorrect: false, misconceptionExplanation: '6 זה רק חמישית אחת (1/5).' },
      { id: 'd', label: '15 מדבקות', isCorrect: false, misconceptionExplanation: '15 זה חצי, אבל נשארו לה 3/5.' }
    ],
    gentleWrongFeedback: {
      default: 'שימו לב לשאלה: שאלו כמה נשאר למאיה! חשבו כמה היא נתנה לחברה (12), והחסירו מסך כל המדבקות (30).'
    }
  },
  {
    id: 'pq-5',
    topicId: 'part-of-quantity',
    skillTag: 'fraction_of_quantity',
    difficulty: 3,
    title: 'דמי כיס: כסף ושברים',
    prompt: 'יוסי קיבל 100 שקלים לחג. הוא קנה ספר ב-2/5 מהסכום. כמה שקלים עלה הספר?',
    hintSteps: [
      'רמז 1: כמה זה חמישית (1/5) מתוך 100 שקלים? 100 חלקי 5 = 20 שקלים.',
      'רמז 2: כעת כפלו ב-2 (המונה): 20 כפול 2 = ?'
    ],
    extraExplanation: 'שלב 1: 100 חלקי 5 = 20 ש"ח בכל חמישית.\nשלב 2: 20 כפול 2 = 40 שקלים עלה הספר.',
    visualType: 'quantity',
    visualProps: { totalItems: 100, groups: 5, itemsPerGroup: 20, selectedGroups: 2, itemName: 'שקלים' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '40 שקלים', isCorrect: true },
      { id: 'b', label: '20 שקלים', isCorrect: false, misconceptionExplanation: '20 שקלים זו רק חמישית אחת (1/5) מהכסף.' },
      { id: 'c', label: '50 שקלים', isCorrect: false, misconceptionExplanation: '50 שקלים זה חצי מהסכום (1/2).' },
      { id: 'd', label: '60 שקלים', isCorrect: false, misconceptionExplanation: '60 שקלים זה מה שנשאר לו אחרי הקנייה (3/5).' }
    ],
    gentleWrongFeedback: {
      default: 'חלקו 100 ב-5 (20), וכפלו ב-2: 20 כפול 2 = 40 שקלים.'
    }
  },
  {
    id: 'pq-master-1',
    topicId: 'part-of-quantity',
    skillTag: 'fraction_word_problems',
    difficulty: 4,
    title: 'מאסטר ⭐: שרשרת שברים רב-שלבית בתוך תת-קבוצה',
    prompt: 'בשכבת כיתות ד׳ יש 48 תלמידים. 3/8 מהתלמידים הם בנים, ומתוכם 2/3 אוהבים כדורגל. כמה בנים בשכבה אינם אוהבים כדורגל?',
    hintSteps: [
      'רמז 1: מצאו כמה בנים יש בסך הכל: 48 חלקי 8 כפול 3 = 6 × 3 = 18 בנים.',
      'רמז 2: מתוך 18 הבנים, 2/3 אוהבים כדורגל: 18 חלקי 3 כפול 2 = 12 בנים אוהבים כדורגל.',
      'רמז 3: החסירו כדי לגלות כמה אינם אוהבים כדורגל: 18 פחות 12 = 6 בנים.'
    ],
    extraExplanation: 'שלב א׳: מספר הבנים הוא 3/8 מ-48 = 18. שלב ב׳: הבנים שלא אוהבים כדורגל הם 1/3 מתוך הבנים: 18 / 3 = 6 בנים.',
    visualType: 'quantity',
    visualProps: { totalItems: 48, groups: 8, itemsPerGroup: 6, selectedGroups: 3, itemName: 'תלמידים' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '6 בנים', isCorrect: true },
      { id: 'b', label: '12 בנים', isCorrect: false, misconceptionExplanation: '12 זה מספר הבנים שאוהבים כדורגל, נשאלתם כמה אינם אוהבים!' },
      { id: 'c', label: '18 בנים', isCorrect: false, misconceptionExplanation: '18 זה סך כל הבנים בשכבה.' },
      { id: 'd', label: '16 בנים', isCorrect: false, misconceptionExplanation: 'בדקו שוב את חישוב שבר הכמות (48 חלקי 8 = 6).' }
    ],
    gentleWrongFeedback: {
      default: 'שלב 1: 3/8 מ-48 = 18 בנים. שלב 2: 1/3 מ-18 שאינם אוהבים כדורגל = 6 בנים.'
    }
  },
  {
    id: 'pq-master-2',
    topicId: 'part-of-quantity',
    skillTag: 'fraction_word_problems',
    difficulty: 4,
    title: 'מאסטר ⭐: תקציב משולש עם שבר מתוך השארית',
    prompt: 'דניאלה חסכה 360 שקלים. היא הוציאה 2/9 מהכסף על משחק, ולאחר מכן הוציאה 3/7 מהכסף שנותר לה על נעלי ספורט. כמה שקלים נותרו לה בסוף?',
    hintSteps: [
      'רמז 1: הוצאה ראשונה: 2/9 מתוך 360 = (360 / 9) × 2 = 80 ש"ח. נותרו לה: 360 - 80 = 280 ש"ח.',
      'רמז 2: הוצאה שנייה: 3/7 מתוך 280 = (280 / 7) × 3 = 120 ש"ח.',
      'רמז 3: מה נותר לה בסוף? 280 פחות 120 שקלים.'
    ],
    extraExplanation: 'לאחר הקנייה הראשונה נותרו 280 ש"ח. הקנייה השנייה: 3/7 מ-280 = 120 ש"ח. נותר בסוף: 280 - 120 = 160 ש"ח (או 4/7 מ-280 = 160 ש"ח).',
    visualType: 'quantity',
    visualProps: { totalItems: 360, groups: 9, itemsPerGroup: 40, selectedGroups: 2, itemName: 'שקלים' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '160 שקלים', isCorrect: true },
      { id: 'b', label: '120 שקלים', isCorrect: false, misconceptionExplanation: '120 שקלים עלו נעלי הספורט, נשאלתם כמה כסף נותר בסוף.' },
      { id: 'c', label: '200 שקלים', isCorrect: false, misconceptionExplanation: 'אל תשכחו להוריד את שתי ההוצאות: 80 + 120 = 200 ש"ח סך ההוצאות, ולכן נותר 160 ש"ח.' },
      { id: 'd', label: '140 שקלים', isCorrect: false, misconceptionExplanation: 'בדקו שוב: 280 פחות 120 שווה 160.' }
    ],
    gentleWrongFeedback: {
      default: '360 פחות 80 = 280 ש"ח. 280 פחות 120 (שהם 3/7 מ-280) = 160 ש"ח שנותרו.'
    }
  },
  {
    id: 'pq-master-3',
    topicId: 'part-of-quantity',
    skillTag: 'fraction_word_problems',
    difficulty: 4,
    title: 'מאסטר ⭐: שחזור הכמות השלמה מתוך שבר שארית',
    prompt: 'במפעל ממתקים: 4/11 מהסוכריות בטעם תות, 3/11 בטעם לימון, ושאר 48 הסוכריות שנותרו הן בטעם ענבים. כמה סוכריות יש בסך הכל במפעל?',
    hintSteps: [
      'רמז 1: חברו את שברי התות והלימון: 4/11 + 3/11 = 7/11.',
      'רמז 2: איזה שבר מייצג את טעם הענבים? 1 - 7/11 = 4/11 מהכמות הכוללת.',
      'רמז 3: אם 4 חלקי 11 שווים ל-48 סוכריות, כמה שווה 1/11? (48 / 4 = 12). כפלו ב-11 לקבלת השלם!'
    ],
    extraExplanation: '4/11 + 3/11 = 7/11. נותרו 4/11 שהם 48 סוכריות. 1/11 = 12 סוכריות. סך הכל: 12 × 11 = 132 סוכריות.',
    visualType: 'quantity',
    visualProps: { totalItems: 132, groups: 11, itemsPerGroup: 12, selectedGroups: 4, itemName: 'סוכריות' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '132 סוכריות בסך הכל', isCorrect: true },
      { id: 'b', label: '144 סוכריות', isCorrect: false, misconceptionExplanation: '12 × 11 = 132 ולא 144.' },
      { id: 'c', label: '121 סוכריות', isCorrect: false, misconceptionExplanation: '11 × 11 = 121, אך בכל חלק יש 12 סוכריות (48/4=12).' },
      { id: 'd', label: '96 סוכריות', isCorrect: false, misconceptionExplanation: 'בדקו שוב: 48 מייצג 4/11 מכלל הסוכריות.' }
    ],
    gentleWrongFeedback: {
      default: 'ענבים = 4/11 מהכמות = 48. חלק יחידה 1/11 = 12. כל המפעל = 12 × 11 = 132 סוכריות.'
    }
  },
  {
    id: 'pq-master-4',
    topicId: 'part-of-quantity',
    skillTag: 'fraction_word_problems',
    difficulty: 4,
    title: 'מאסטר ⭐: השוואת שברי כמויות בין שתי ספריות',
    prompt: 'בספרייה א׳ יש 72 ספרים ו-5/8 מהם ספרי מדע. בספרייה ב׳ יש 84 ספרים ו-4/7 מהם ספרי מדע. באיזו ספרייה יש יותר ספרי מדע ובכמה?',
    hintSteps: [
      'רמז 1: חשבו ספרי מדע בספרייה א׳: (72 / 8) × 5 = 9 × 5 = 45 ספרים.',
      'רמז 2: חשבו ספרי מדע בספרייה ב׳: (84 / 7) × 4 = 12 × 4 = 48 ספרים.',
      'רמז 3: השוו וחשבו את ההפרש: 48 פחות 45 ספרים.'
    ],
    extraExplanation: 'ספרייה א׳: 5/8 מ-72 = 45 ספרי מדע. ספרייה ב׳: 4/7 מ-84 = 48 ספרי מדע. בספרייה ב׳ יש 48 - 45 = 3 ספרי מדע יותר.',
    visualType: 'quantity',
    visualProps: { totalItems: 84, groups: 7, itemsPerGroup: 12, selectedGroups: 4, itemName: 'ספרים' },
    answerType: 'choice',
    options: [
      { id: 'a', label: 'בספרייה ב׳ יש 3 ספרי מדע יותר מבספרייה א׳', isCorrect: true },
      { id: 'b', label: 'בספרייה א׳ יש 5 ספרי מדע יותר מבספרייה ב׳', isCorrect: false, misconceptionExplanation: 'בספרייה א׳ יש 45 ובספרייה ב׳ 48, לכן ב׳ גדולה יותר.' },
      { id: 'c', label: 'בשתי הספריות יש בדיוק אותו מספר ספרי מדע', isCorrect: false, misconceptionExplanation: '45 אינו שווה ל-48.' },
      { id: 'd', label: 'בספרייה ב׳ יש 8 ספרי מדע יותר מבספרייה א׳', isCorrect: false, misconceptionExplanation: '48 פחות 45 שווה 3 ספרים.' }
    ],
    gentleWrongFeedback: {
      default: 'א׳: 5/8 מ-72 = 45. ב׳: 4/7 מ-84 = 48. ההפרש: 48 - 45 = 3 ספרי מדע יותר בספרייה ב׳.'
    }
  }
];
