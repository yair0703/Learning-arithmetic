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
    title: 'מאסטר ⭐: פירוק מורכב של שטח בריבוע',
    prompt: 'ריבוע גדול חולק לשני חצאים. חצי אחד נשאר שלם, והחצי השני חולק ל-4 משולשים שווים. נצבע משולש אחד כזה. איזה שבר מהריבוע הגדול כולו נצבע?',
    hintSteps: [
      'רמז 1: כמה משולשים קטנים כאלה ייכנסו בחצי השני (שלא נחתך)? (עוד 4 משולשים).',
      'רמז 2: כמה משולשים שווים בסך הכל מרכיבים את הריבוע השלם כולו? (4 + 4 = 8 משולשים).'
    ],
    extraExplanation: 'אם חצי ריבוע מכיל 4 משולשים, הריבוע כולו מכיל 8 משולשים שווים. לכן משולש אחד הוא 1/8 (שמינית) מהריבוע הגדול.',
    visualType: 'bar',
    visualProps: { totalParts: 8, coloredParts: 1, color: '#f59e0b' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '1/8', isCorrect: true },
      { id: 'b', label: '1/4', isCorrect: false, misconceptionExplanation: '1/4 זה החלק מתוך החצי בלבד, אך מתוך כל הריבוע השלם זה רק 1/8!' },
      { id: 'c', label: '1/5', isCorrect: false, misconceptionExplanation: 'אסור לספור את החצי הלא-מחולק כחלק אחד, כי החלקים חייבים להיות שווים בגודלם!' },
      { id: 'd', label: '1/6', isCorrect: false, misconceptionExplanation: 'ספור לפי חלוקה שווה: 4 משולשים בכל חצי = 8 משולשים בשלם.' }
    ],
    gentleWrongFeedback: {
      default: 'מלכודת מאסטר קלאסית: כדי לדעת את השבר מהשלם, חייבים לדמיין שכל הריבוע חולק לחלקים שווים באותו גודל (8 שמיניות)!'
    }
  },
  {
    id: 'wp-master-2',
    topicId: 'whole-part',
    skillTag: 'identify_fraction_shape',
    difficulty: 4,
    title: 'מאסטר ⭐: מלכודת שטחים וצורות שונות',
    prompt: 'צורת משושה חולקה ל-6 משולשים שווים. נצבעו 2 משולשים, ובנוסף חצי ממשולש שלישי. איזה שבר מתוך המשושה כולו נצבע בסך הכל?',
    hintSteps: [
      'רמז 1: בואו נמדוד את כל המשושה ביחידות קטנות של "חצי משולש". כמה חצאי-משולשים יש בכל המשושה? (6 × 2 = 12).',
      'רמז 2: כמה חצאי-משולשים נצבעו? 2 משולשים שלמים (4 חצאים) + חצי משולש נוסף = 5 חצאים.'
    ],
    extraExplanation: 'אם נחלק כל אחד מ-6 המשולשים ל-2 חלקים שווים, נקבל 12 חלקים שווים בסך הכל. נצבעו 5 חלקים כאלה, ולכן השבר הוא 5/12.',
    visualType: 'bar',
    visualProps: { totalParts: 12, coloredParts: 5, color: '#d97706' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '5/12', isCorrect: true },
      { id: 'b', label: '2.5/6', isCorrect: false, misconceptionExplanation: 'בשבר פשוט תקני המונה והמכנה חייבים להיות מספרים שלמים (כופלים פי 2 ומקבלים 5/12).' },
      { id: 'c', label: '3/6', isCorrect: false, misconceptionExplanation: 'נצבעו פחות מ-3 משולשים מלאים (המשולש השלישי נצבע רק בחציו).' },
      { id: 'd', label: '5/6', isCorrect: false, misconceptionExplanation: '5/6 היה מייצג 5 משולשים שלמים, אך נצבעו רק 2 וחצי משולשים.' }
    ],
    gentleWrongFeedback: {
      default: 'חשיבת מאסטר: כשיש חלקי חלקים, מחלקים את כל השלם ליחידה הקטנה ביותר (12 חצאים) וסופרים כמה נצבעו!'
    }
  },
  {
    id: 'wp-master-3',
    topicId: 'whole-part',
    skillTag: 'identify_fraction_shape',
    difficulty: 4,
    title: 'מאסטר ⭐: הרכבת השלם מחלקים משלימים',
    prompt: 'דני צבע 3/8 מעוגה, ומאיה צבעה 1/4 מאותה העוגה. איזה חלק מהעוגה נותר ללא צבע?',
    hintSteps: [
      'רמז 1: הרחיבו את החלק של מאיה לשמיניות: כמה שמיניות יש ברבע (1/4)? (1/4 = 2/8).',
      'רמז 2: חברו את מה שדני ומאיה צבעו יחד: 3/8 + 2/8 = 5/8. כמה נשאר עד לשלם מלא (8/8)?'
    ],
    extraExplanation: 'מאיה צבעה 1/4 = 2/8. ביחד דני ומאיה צבעו 3/8 + 2/8 = 5/8. השלם הוא 8/8, ולכן החלק שנותר לא צבוע הוא 8/8 - 5/8 = 3/8.',
    visualType: 'bar',
    visualProps: { totalParts: 8, coloredParts: 5, color: '#eab308' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '3/8', isCorrect: true },
      { id: 'b', label: '5/8', isCorrect: false, misconceptionExplanation: '5/8 זה החלק שדני ומאיה צבעו ביחד, אך השאלה שאלה על החלק שנותר ריק!' },
      { id: 'c', label: '1/2', isCorrect: false, misconceptionExplanation: 'חצי מהעוגה הוא 4/8, אך נותרו 3/8.' },
      { id: 'd', label: '4/8', isCorrect: false, misconceptionExplanation: 'בדקו שוב את החיבור: 3 שמיניות ועוד 2 שמיניות הן 5 שמיניות, נותרו 3 שמיניות.' }
    ],
    gentleWrongFeedback: {
      default: 'המירו את הרבע לשמיניות (2/8), סכמו את החלק שנצבע (5/8), ומצאו את המשלים לשלם (3/8).'
    }
  }
];
