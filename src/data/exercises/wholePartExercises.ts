import { Exercise } from '../../types';

export const wholePartExercises: Exercise[] = [
  // תרגילי ספר לימוד: זיהוי האם חלק שווה לחמישית (חלוקה שווה מול לא שווה)
  {
    id: 'book-curated-trapezoid',
    topicId: 'whole-part',
    skillTag: 'identify_fraction_shape',
    difficulty: 1,
    title: 'מתוך הספר: האם החלק הצבוע הוא חמישית?',
    prompt: 'הבט בטרפז המחולק לפסים אופקיים שלפניך: האם הפס הצבוע בכחול הוא בדיוק חמישית (1/5) מהצורה השלמה?',
    hintSteps: [
      'רמז 1: ספור כמה פסים יש בסך הכל (יש 5).',
      'רמז 2: האם כל 5 הפסים שווים בדיוק בגודלם (בשטחם)?'
    ],
    extraExplanation: 'בטרפז הפסים אינם שווים בשטחם! החלק העליון צר והתחתון רחב, לכן אף פס אינו חמישית בדיוק.',
    visualType: 'book-shape',
    visualProps: {
      shapeKind: 'trapezoid_unequal_5',
      coloredPartIndices: [2],
      caption: 'טרפז עם פסים אופקיים'
    },
    answerType: 'choice',
    options: [
      { id: 'opt-no', label: 'לא, מכיוון שהחלקים אינם שווים בגודלם', isCorrect: true },
      { id: 'opt-yes', label: 'כן, יש 5 פסים ואחד צבוע', isCorrect: false, misconceptionExplanation: 'שים לב: שבר קיים אך ורק כאשר החלקים שווים זה לזה בגודלם!' }
    ],
    gentleWrongFeedback: {
      default: 'כדי ששבר ייצג חמישית, כל 5 החלקים חייבים להיות שווים בדיוק בשטחם!'
    }
  },
  {
    id: 'book-curated-cross',
    topicId: 'whole-part',
    skillTag: 'identify_fraction_shape',
    difficulty: 1,
    title: 'מתוך הספר: האם החלק הצבוע הוא חמישית?',
    prompt: 'הבט בצורת הצלב שלפניך: האם הריבוע הצבוע הוא בדיוק חמישית (1/5) מהצורה כולה?',
    hintSteps: [
      'רמז 1: ממה מורכבת הצורה? מ-5 ריבועים.',
      'רמז 2: האם כל 5 הריבועים שווים זה לזה?'
    ],
    extraExplanation: 'הצלב מורכב מ-5 ריבועים שווים בדיוק. ריבוע אחד מתוכם הוא בדיוק 1/5!',
    visualType: 'book-shape',
    visualProps: {
      shapeKind: 'cross_5',
      coloredPartIndices: [0],
      caption: 'צלב מ-5 ריבועים שווים'
    },
    answerType: 'choice',
    options: [
      { id: 'opt-yes', label: 'כן, הצורה מורכבת מ-5 ריבועים שווים ואחד צבוע', isCorrect: true },
      { id: 'opt-no', label: 'לא, החלקים אינם שווים', isCorrect: false, misconceptionExplanation: 'כל 5 הריבועים זהים לחלוטין!' }
    ],
    gentleWrongFeedback: {
      default: 'הצלב מורכב מ-5 ריבועים שווים בדיוק, לכן ריבוע 1 הוא בדיוק 1/5.'
    }
  },
  {
    id: 'wp-1',
    topicId: 'whole-part',
    skillTag: 'identify_fraction_shape',
    difficulty: 1,
    title: 'זיהוי שבר בצורה מלבנית',
    prompt: 'איזה שבר מייצג החלק הצבוע בצבע סגול במלבן?',
    hintSteps: [
      'רמז 1: ספור קודם כל לכמה חלקים שווים בסך הכל מחולק המלבן כולו. זה יהיה המכנה (למטה).',
      'רמז 2: כעת ספור כמה חלקים צבועים בסגול. זה יהיה המונה (למעלה).'
    ],
    extraExplanation: 'במלבן יש 5 חלקים שווים בסך הכל. 3 מתוכם צבועים בסגול. לכן השבר הוא שלוש חמישיות (3/5).',
    exampleDemonstration: {
      text: 'אם עיגול חולק ל-4 רבעים ו-1 צבוע, השבר הוא 1/4.',
      visualType: 'circle',
      visualProps: { totalParts: 4, coloredParts: 1 }
    },
    visualType: 'bar',
    visualProps: { totalParts: 5, coloredParts: 3, color: '#8b5cf6' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '3/5', isCorrect: true },
      { id: 'b', label: '2/5', isCorrect: false, misconceptionExplanation: '2/5 מייצג את החלק הלבן שאינו צבוע!' },
      { id: 'c', label: '5/3', isCorrect: false, misconceptionExplanation: 'המונה (החלקים הצבועים) צריך להיות למעלה, והמכנה (סך הכל) למטה.' },
      { id: 'd', label: '3/4', isCorrect: false, misconceptionExplanation: 'בדוק שוב כמה חלקים יש בסך הכל במלבן: 5 ולא 4!' }
    ],
    gentleWrongFeedback: {
      default: 'לא נורא, בוא נבדוק יחד. ספור בנחת את כל החלקים במלבן: כמה יש בסך הכל וכמה מהם צבועים?'
    }
  },
  {
    id: 'wp-2',
    topicId: 'whole-part',
    skillTag: 'identify_numerator_denominator',
    difficulty: 1,
    title: 'מה תפקיד המכנה?',
    prompt: 'בשבר 4/7, מה המספר 7 (המכנה) מספר לנו על הצורה?',
    hintSteps: [
      'רמז 1: המכנה נמצא למטה. האם הוא אומר כמה צבוע, או לכמה חלקים חילקנו את השלם?',
      'רמז 2: חשוב על פיצה שנחתכה ל-7 משולשים שווים.'
    ],
    extraExplanation: 'המכנה מספר לנו לכמה חלקים שווים בסך הכל חילקנו את השלם. המונה (4) מספר כמה חלקים לקחנו.',
    exampleDemonstration: {
      text: 'בשבר 2/6, המכנה 6 מראה שהעוגה חולקה ל-6 חתיכות שוות.',
      visualType: 'bar',
      visualProps: { totalParts: 6, coloredParts: 2 }
    },
    visualType: 'bar',
    visualProps: { totalParts: 7, coloredParts: 4, color: '#3b82f6' },
    answerType: 'choice',
    options: [
      { id: 'a', label: 'לכמה חלקים שווים מחולק השלם', isCorrect: true },
      { id: 'b', label: 'כמה חלקים צבועים בצורה', isCorrect: false, misconceptionExplanation: 'זה התפקיד של המונה (המספר 4 שלמעלה)!' },
      { id: 'c', label: 'כמה חלקים נשארו לבנים', isCorrect: false, misconceptionExplanation: 'החלקים הלבנים הם 7 פחות 4 = 3, ולא 7.' }
    ],
    gentleWrongFeedback: {
      default: 'בוא נזכור: המכנה יושב למטה ומספר לכמה חלקים שווים השלם מחולק!'
    }
  },
  {
    id: 'wp-3',
    topicId: 'whole-part',
    skillTag: 'identify_fraction_shape',
    difficulty: 2,
    title: 'השלמת שבר לשלם שלם',
    prompt: 'עוגה עגולה חולקה ל-8 חלקים שווים. אכלו 5/8 מהעוגה. איזה חלק מהעוגה נשאר במגש?',
    hintSteps: [
      'רמז 1: עוגה שלמה אחת מורכבת מ-8 שמיניות (8/8).',
      'רמז 2: אם אכלו 5 שמיניות מתוך 8 שמיניות, כמה שמיניות נשארו?'
    ],
    extraExplanation: 'עוגה שלמה היא 8/8. חיסור 5/8 מתוך 8/8 משאיר 3 שמיניות (3/8).',
    exampleDemonstration: {
      text: 'מעוגה של 6 חלקים אכלו 2/6, נשארו 4/6.',
      visualType: 'circle',
      visualProps: { totalParts: 6, coloredParts: 2 }
    },
    visualType: 'circle',
    visualProps: { totalParts: 8, coloredParts: 5, color: '#f59e0b' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '3/8', isCorrect: true },
      { id: 'b', label: '5/8', isCorrect: false, misconceptionExplanation: '5/8 זה החלק שאכלו, אנחנו מחפשים מה שנשאר!' },
      { id: 'c', label: '3/5', isCorrect: false, misconceptionExplanation: 'המכנה חייב להישאר 8 כי העוגה מחולקת לשמיניות!' },
      { id: 'd', label: '1/8', isCorrect: false, misconceptionExplanation: '8 פחות 5 שווה 3, לכן נשארו 3 שמיניות.' }
    ],
    gentleWrongFeedback: {
      default: 'לא נורא! חשוב על 8 חתיכות בצלחת: אם מורידים 5 חתיכות, כמה חתיכות נשארו בצלחת מתוך ה-8?'
    }
  },
  {
    id: 'wp-4',
    topicId: 'whole-part',
    skillTag: 'identify_fraction_shape',
    difficulty: 2,
    title: 'אתגר שברים שווים מצוירים',
    prompt: 'איזה שבר מיוצג בחצי פס צבוע ואיזה שבר שווה בדיוק לחצי (1/2)?',
    hintSteps: [
      'רמז 1: חצי פיצה שווה לחלק שבו צבענו בדיוק חצי מכל החלקים.',
      'רמז 2: אם מלבן מחולק ל-8 חלקים שווים, כמה זה בדיוק חצי ממנו?'
    ],
    extraExplanation: 'חצי מ-8 הוא 4, לכן 4/8 שווה בדיוק ל-1/2.',
    exampleDemonstration: {
      text: '1/2 שווה ל-2/4 ול-3/6 ול-4/8.',
      visualType: 'bar',
      visualProps: { totalParts: 8, coloredParts: 4, color: '#10b981' }
    },
    visualType: 'bar',
    visualProps: { totalParts: 8, coloredParts: 4, color: '#10b981' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '4/8', isCorrect: true },
      { id: 'b', label: '3/8', isCorrect: false, misconceptionExplanation: '3 מתוך 8 זה פחות מחצי (חצי מ-8 זה 4).' },
      { id: 'c', label: '5/8', isCorrect: false, misconceptionExplanation: '5 מתוך 8 זה יותר מחצי.' },
      { id: 'd', label: '2/8', isCorrect: false, misconceptionExplanation: '2 מתוך 8 זה רק רבע.' }
    ],
    gentleWrongFeedback: {
      default: 'בוא נבדוק: כדי לקבל חצי, המונה צריך להיות חצי מדויק מהמכנה! איזה מונה הוא חצי מהמכנה שלו?'
    }
  },
  {
    id: 'wp-5',
    topicId: 'whole-part',
    skillTag: 'identify_fraction_shape',
    difficulty: 2,
    title: 'זיהוי שבר ברשת ריבועים (משבצות)',
    prompt: 'ריבוע שלם חולק ל-9 משבצות שוות (רשת 3 על 3). 4 משבצות נצבעו בכתום. איזה שבר מהריבוע צבוע?',
    hintSteps: [
      'רמז 1: כמה משבצות שוות מרכיבות את הריבוע כולו? (3 שורות של 3 משבצות = 9).',
      'רמז 2: כמה משבצות צבועות? (4 משבצות).'
    ],
    extraExplanation: 'סך כל החלקים השווים הוא 9 (המכנה). מספר החלקים הצבועים הוא 4 (המונה). לכן השבר הוא 4/9.',
    visualType: 'bar',
    visualProps: { totalParts: 9, coloredParts: 4, color: '#f97316' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '4/9', isCorrect: true },
      { id: 'b', label: '5/9', isCorrect: false, misconceptionExplanation: '5/9 זה החלק הלבן הלא צבוע!' },
      { id: 'c', label: '4/6', isCorrect: false, misconceptionExplanation: 'ברשת של 3x3 יש 9 משבצות בסך הכל.' },
      { id: 'd', label: '9/4', isCorrect: false, misconceptionExplanation: 'המונה (הצבוע) למעלה, המכנה (סך הכל) למטה.' }
    ],
    gentleWrongFeedback: {
      default: 'ספור בנחת: כמה משבצות יש בריבוע כולו (9), וכמה נצבעו בכתום (4)? השבר הוא 4 מתוך 9.'
    }
  },
  {
    id: 'wp-6',
    topicId: 'whole-part',
    skillTag: 'identify_fraction_shape',
    difficulty: 3,
    title: 'השוואת שברי יחידה: מי גדול יותר?',
    prompt: 'איזה שבר גדול יותר: 1/3 (שליש) או 1/6 (שישית)?',
    hintSteps: [
      'רמז 1: חשבו על פיצה: האם תקבלו חתיכה גדולה יותר אם נחלק אותה ל-3 ילדים או ל-6 ילדים?',
      'רמז 2: ככל שמחלקים לפחות חלקים – כל חלק יוצא גדול יותר!'
    ],
    extraExplanation: 'כשמחלקים עוגה ל-3 חלקים, כל חתיכה גדולה בהרבה מאשר כשמחלקים ל-6 חלקים. לכן שליש (1/3) גדול משישית (1/6).',
    visualType: 'bar',
    visualProps: { totalParts: 6, coloredParts: 2, color: '#6366f1' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '1/3 גדול יותר מ-1/6', isCorrect: true },
      { id: 'b', label: '1/6 גדול יותר מ-1/3', isCorrect: false, misconceptionExplanation: 'זהירות ממלכודת: 6 אומנם גדול מ-3, אבל במכנה זה אומר שחתכו לחלקים קטנים יותר!' },
      { id: 'c', label: 'שני השברים שווים בדיוק', isCorrect: false, misconceptionExplanation: 'שליש אחד שווה לשתי שישיות (2/6), ולכן הוא גדול מ-1/6.' }
    ],
    gentleWrongFeedback: {
      default: 'כלל מפתח בשברים: ככל שהמכנה קטן יותר (פחות חלוקות), החלק עצמו גדול יותר! לכן שליש גדול משישית.'
    }
  },
  {
    id: 'wp-7',
    topicId: 'whole-part',
    skillTag: 'identify_fraction_shape',
    difficulty: 3,
    title: 'זיהוי חלקים שאינם שווים',
    prompt: 'משולש נחצה ל-3 חלקים על ידי שני קווים ישרים. מדוע חלק אחד אינו בהכרח 1/3 מהמשולש?',
    hintSteps: [
      'רמז 1: מהו התנאי היסודי והחשוב ביותר להגדרת שבר?',
      'רמז 2: האם החלקים חייבים להיות שווים בדיוק בשטחם?'
    ],
    extraExplanation: 'כדי שחלק יהיה שליש (1/3), כל 3 החלקים חייבים להיות שווים בדיוק בשטחם ובגודלם!',
    visualType: 'book-shape',
    visualProps: {
      shapeKind: 'trapezoid_unequal_5',
      coloredPartIndices: [0],
      caption: 'צורה שחולקה לחלקים לא שווים'
    },
    answerType: 'choice',
    options: [
      { id: 'a', label: 'מכיוון שהחלקים אינם שווים בשטחם ובגודלם', isCorrect: true },
      { id: 'b', label: 'מכיוון שמשולש לא יכול להתחלק ל-3', isCorrect: false, misconceptionExplanation: 'אפשר לחלק משולש ל-3 חלקים שווים אם עושים זאת נכון מקודקודי המשולש.' },
      { id: 'c', label: 'מכיוון ששבר חייב להיות רק עגול', isCorrect: false, misconceptionExplanation: 'שברים קיימים בכל צורה הנדסית, בתנאי שהחלקים שווים!' }
    ],
    gentleWrongFeedback: {
      default: 'זכרו תמיד: שבר מתמטי קיים רק כאשר החלוקה היא לחלקים שווים בדיוק!'
    }
  },
  {
    id: 'wp-master-1',
    topicId: 'whole-part',
    skillTag: 'identify_fraction_shape',
    difficulty: 4,
    title: 'מאסטר ⭐: פירוק רב-שלבי של שטח בריבוע',
    prompt: 'ריבוע גדול חולק ל-4 ריבועים שווים. ריבוע אחד נצבע כולו. ריבוע שני חולק ל-4 משולשים שווים ושניים מהם נצבעו. ריבוע שלישי חולק ל-8 משולשונים ואחד מהם נצבע. הריבוע הרביעי נשאר לבן. איזה שבר מהריבוע הגדול נצבע בסך הכל?',
    hintSteps: [
      'רמז 1: נמדוד הכל ביחידות הקטנות ביותר: כל ריבוע מתוך ה-4 מכיל 8 משולשונים קטנים. כמה משולשונים יש בריבוע הגדול כולו? (4 × 8 = 32).',
      'רמז 2: כמה משולשונים נצבעו? ריבוע ראשון = 8, ריבוע שני (2 מתוך 4 משולשים = 4 משולשונים), ריבוע שלישי = 1. סה"כ: 8 + 4 + 1 = 13.'
    ],
    extraExplanation: 'בריבוע הגדול יש סה"כ 32 משולשונים שווים. נצבעו: 8 (ריבוע ראשון) + 4 (חצי מריבוע שני) + 1 (שמינית מריבוע שלישי) = 13 מתוך 32, כלומר 13/32.',
    visualType: 'bar',
    visualProps: { totalParts: 32, coloredParts: 13, color: '#f59e0b' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '13/32', isCorrect: true },
      { id: 'b', label: '7/16', isCorrect: false, misconceptionExplanation: '7/16 שווה ל-14/32, וזה היה נכון אם בריבוע השלישי היו נצבעים 2 משולשונים במקום 1.' },
      { id: 'c', label: '3/8', isCorrect: false, misconceptionExplanation: '3/8 שווה ל-12/32, וזה מתעלם מהמשולשון הבודד שנצבע בריבוע השלישי.' },
      { id: 'd', label: '11/32', isCorrect: false, misconceptionExplanation: 'בדקו שוב: בריבוע השני נצבעו 2 מתוך 4 משולשים שזה שווה ל-4 משולשונים מתוך 8.' }
    ],
    gentleWrongFeedback: {
      default: 'מלכודת מאסטר: המירו את כל חלקי הריבועים לאותה יחידת מידה אחידה (32 משולשונים) וחברו את החלקים הצבועים!'
    }
  },
  {
    id: 'wp-master-2',
    topicId: 'whole-part',
    skillTag: 'identify_fraction_shape',
    difficulty: 4,
    title: 'מאסטר ⭐: שרשרת צביעה ושאריות (3 שלבים)',
    prompt: 'לוח מלבני חולק ל-24 משבצות שוות. בשלב ראשון נצבעו 1/3 מהמשבצות. בשלב השני נצבעו בדיוק חצי מהמשבצות שנותרו לבנות! בשלב השלישי נצבעו עוד 2 משבצות. איזה שבר מתוך הלוח כולו נותר לבן (ללא צבע)?',
    hintSteps: [
      'רמז 1: בשלב 1: 1/3 מ-24 = 8 משבצות נצבעו, נותרו 16 משבצות לבנות.',
      'רמז 2: בשלב 2: חצי מ-16 = 8 משבצות נצבעו, נותרו 8 לבנות. בשלב 3: נצבעו עוד 2, נותרו 6 משבצות לבנות.',
      'רמז 3: צמצמו את השבר: 6 משבצות מתוך 24 משבצות = 6/24 = 1/4.'
    ],
    extraExplanation: '24 - 8 (שליש ראשון) = 16. חצי מ-16 הוא 8, לכן נותרו 8. פחות עוד 2 = 6 משבצות לבנות. 6 מתוך 24 שווה 6/24 = 1/4 (רבע).',
    visualType: 'bar',
    visualProps: { totalParts: 24, coloredParts: 18, color: '#d97706' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '1/4', isCorrect: true },
      { id: 'b', label: '1/3', isCorrect: false, misconceptionExplanation: '1/3 מ-24 זה 8 משבצות, אך לאחר הורדת 2 המשבצות הנוספות נותרו רק 6 (שהן 1/4).' },
      { id: 'c', label: '1/6', isCorrect: false, misconceptionExplanation: '1/6 מ-24 זה 4 משבצות, אך נותרו 6 משבצות לבנות.' },
      { id: 'd', label: '3/8', isCorrect: false, misconceptionExplanation: '3/8 מ-24 זה 9 משבצות. עקבו במדויק אחרי כל שלב חיסור.' }
    ],
    gentleWrongFeedback: {
      default: 'עקבו צעד-אחר-צעד: 24 פחות 8 = 16. 16 פחות 8 = 8. 8 פחות 2 = 6 משבצות לבנות. 6/24 מצטמצם ל-1/4.'
    }
  },
  {
    id: 'wp-master-3',
    topicId: 'whole-part',
    skillTag: 'identify_fraction_shape',
    difficulty: 4,
    title: 'מאסטר ⭐: חלוקת משנה מורכבת במשושה',
    prompt: 'משושה משוכלל חולק ל-6 משולשים שווים. כל משולש חולק ל-3 חלקים שווים. נצבעו 7 חלקים קטנים כאלה. איזה שבר מצורת המשושה נותר ללא צבע?',
    hintSteps: [
      'רמז 1: כמה חלקים קטנים שווים מרכיבים את המשושה כולו? (6 משולשים × 3 חלקים = 18 חלקים).',
      'רמז 2: אם נצבעו 7 חלקים מתוך 18, כמה חלקים נותרו ללא צבע? (18 - 7 = 11).'
    ],
    extraExplanation: 'במשושה כולו יש 6 × 3 = 18 חלקים שווים. נצבעו 7 חלקים, ולכן נותרו 18 - 7 = 11 חלקים לא צבועים, שהם 11/18 מהמשושה.',
    visualType: 'bar',
    visualProps: { totalParts: 18, coloredParts: 7, color: '#eab308' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '11/18', isCorrect: true },
      { id: 'b', label: '7/18', isCorrect: false, misconceptionExplanation: '7/18 זה החלק שנצבע, אך השאלה ביקשה את החלק שנותר ללא צבע!' },
      { id: 'c', label: '5/12', isCorrect: false, misconceptionExplanation: 'במשושה יש 18 חלקים שווים בסך הכל (ולא 12).' },
      { id: 'd', label: '13/18', isCorrect: false, misconceptionExplanation: '18 פחות 7 שווה 11 ולא 13.' }
    ],
    gentleWrongFeedback: {
      default: 'מצאו את סך כל החלוקות (18), חסרו את החלקים הצבועים (7) וקבלו את השבר הנותר: 11/18.'
    }
  },
  {
    id: 'wp-master-4',
    topicId: 'whole-part',
    skillTag: 'identify_fraction_shape',
    difficulty: 4,
    title: 'מאסטר ⭐: שילוב שאריות משני מגשים',
    prompt: 'במגש פיצה א׳ (חתוך ל-12) נאכלו 3/4 מהפיצה. במגש פיצה ב׳ (זהה בגודלו, חתוך ל-16) נאכלו 5/8 מהפיצה. איזה שבר מתוך מגש פיצה אחד שלם נותר בשני המגשים יחד?',
    hintSteps: [
      'רמז 1: במגש א׳ נותר: 1 - 3/4 = 1/4 מגש (או 2/8).',
      'רמז 2: במגש ב׳ נותר: 1 - 5/8 = 3/8 מגש.',
      'רמז 3: חברו את השאריות של שני המגשים יחד: 2/8 + 3/8.'
    ],
    extraExplanation: 'במגש א׳ נותר 1/4 = 2/8 מגש. במגש ב׳ נותר 3/8 מגש. ביחד נותר: 2/8 + 3/8 = 5/8 מגש שלם.',
    visualType: 'bar',
    visualProps: { totalParts: 8, coloredParts: 5, color: '#f59e0b' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '5/8', isCorrect: true },
      { id: 'b', label: '7/8', isCorrect: false, misconceptionExplanation: '7/8 היה מתקבל מחיבור 1/2 ועוד 3/8, אך במגש א׳ נותר רק 1/4.' },
      { id: 'c', label: '1/2', isCorrect: false, misconceptionExplanation: '1/2 שווה ל-4/8, אך נותר 5/8 (יותר מחצי מגש).' },
      { id: 'd', label: '11/16', isCorrect: false, misconceptionExplanation: '1/4 = 4/16 ועוד 6/16 (שזה 3/8) שווה 10/16 = 5/8.' }
    ],
    gentleWrongFeedback: {
      default: 'חשבו את השארית בכל מגש (1/4 ו-3/8), הביאו למכנה משותף 8 (2/8 + 3/8), וקבלו 5/8.'
    }
  }
];
