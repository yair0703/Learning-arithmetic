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
  }
];
