import { Exercise, ExerciseChoiceOption } from '../types';
import { BookShapeKind } from '../components/visuals/BookGeometryShape';
import { FractionEggItem } from '../components/visuals/FractionOrderDragExercise';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Exercise from Book: Check if shaded part is exactly 1/5 (Equal vs Unequal area division).
 * Based on Exercise 2 & 3 in the uploaded book pages!
 */
export function generateBookEqualPartsExercise(difficulty: 1 | 2 | 3): Exercise {
  const id = `book-geom-${Date.now()}-${getRandomInt(100, 999)}`;

  // Pick a shape configuration
  const scenarios: {
    shapeKind: BookShapeKind;
    title: string;
    caption: string;
    isExactlyFifth: boolean;
    coloredIndices: number[];
    explanation: string;
    wrongExplanation: string;
  }[] = [
    {
      shapeKind: 'trapezoid_unequal_5',
      title: 'האם החלק הצבוע הוא חמישית?',
      caption: 'טרפז עם פסים אופקיים',
      isExactlyFifth: false,
      coloredIndices: [2],
      explanation: 'בטרפז הפסים אינם שווים בשטחם! החלק העליון צר והתחתון רחב, לכן אף פס אינו חמישית בדיוק.',
      wrongExplanation: 'שים לב: כדי ששבר ייצג חמישית, כל 5 החלקים חייבים להיות שווים בדיוק בשטחם!'
    },
    {
      shapeKind: 'cross_5',
      title: 'האם החלק הצבוע הוא חמישית?',
      caption: 'צלב הבנוי מ-5 ריבועים',
      isExactlyFifth: true,
      coloredIndices: [0],
      explanation: 'נכון מאוד! הצלב מורכב מ-5 ריבועים שווים בדיוק, ואחד מהם צבוע, לכן זה בדיוק 1/5.',
      wrongExplanation: 'בצלב יש 5 ריבועים זהים לחלוטין. ריבוע אחד מתוכם הוא בדיוק חמישית מהצורה.'
    },
    {
      shapeKind: 'pentagon_5',
      title: 'האם החלק הצבוע הוא חמישית?',
      caption: 'מחומש משוכלל מחולק ממרכזו',
      isExactlyFifth: true,
      coloredIndices: [0],
      explanation: 'המחומש המשוכלל חולק ממרכזו ל-5 משולשים חופפים ושווים בשטחם. משולש אחד הוא בדיוק 1/5!',
      wrongExplanation: 'כל 5 המשולשים במחומש שווים זה לזה. חלק אחד הוא בדיוק חמישית.'
    },
    {
      shapeKind: 'rectangle_unequal_5',
      title: 'האם החלק הצבוע הוא חמישית?',
      caption: 'מלבן מחולק ל-5 פסים',
      isExactlyFifth: false,
      coloredIndices: [1],
      explanation: 'אמנם יש כאן 5 פסים, אך הם ברוחב שונה (אינם שווים)! שבר דורש חלוקה לחלקים שווים.',
      wrongExplanation: 'הבט ברוחב הפסים: הם אינם שווים זה לזה, לכן לא ניתן לומר שכל פס הוא חמישית.'
    },
    {
      shapeKind: 'triangle_4',
      title: 'איזה שבר מייצג החלק הצבוע?',
      caption: 'משולש גדול המחולק ל-4 משולשים שווים',
      isExactlyFifth: false,
      coloredIndices: [0],
      explanation: 'המשולש הגדול מחולק ל-4 משולשים שווים (ולא ל-5), לכן החלק הצבוע הוא רבע (1/4) ולא חמישית!',
      wrongExplanation: 'ספור כמה משולשים שווים יש בסך הכל: יש 4 ולא 5!'
    },
    {
      shapeKind: 'rectangle_10_triangles',
      title: 'האם שני המשולשים הצבועים הם חמישית?',
      caption: 'מלבן המחולק ל-10 משולשים שווים',
      isExactlyFifth: true,
      coloredIndices: [0, 1],
      explanation: 'המלבן מחולק ל-10 משולשים שווים. 2 משולשים מתוך 10 שווים בדיוק לחמישית: 2/10 = 1/5!',
      wrongExplanation: '2 מתוך 10 משולשים שווים יוצרים שבר שווה ערך של 2/10, שהוא בדיוק חמישית (1/5).'
    }
  ];

  const picked = scenarios[getRandomInt(0, scenarios.length - 1)];

  const options: ExerciseChoiceOption[] = shuffleArray([
    {
      id: 'opt-yes',
      label: 'כן, החלק הצבוע הוא בדיוק חמישית (1/5)',
      isCorrect: picked.isExactlyFifth,
      misconceptionExplanation: !picked.isExactlyFifth ? picked.wrongExplanation : undefined
    },
    {
      id: 'opt-no',
      label: 'לא, החלקים אינם שווים או שכמות החלקים אינה 5',
      isCorrect: !picked.isExactlyFifth,
      misconceptionExplanation: picked.isExactlyFifth ? picked.wrongExplanation : undefined
    }
  ]);

  return {
    id,
    topicId: 'whole-part',
    skillTag: 'identify_fraction_shape',
    difficulty,
    title: 'מתוך הספר: האם החלק הצבוע הוא חמישית?',
    prompt: `הבט בצורה שלפניך מתוך ספר הלימוד: האם אפשר לקבוע שהחלק הצבוע בכחול הוא בדיוק חמישית (1/5) מהצורה השלמה?`,
    hintSteps: [
      `רמז 1: זכור את הכלל החשוב של השברים - השלם חייב להיות מחולק לחלקים שווים בדיוק בשטחם!`,
      `רמז 2: ספור כמה חלקים שווים יש, ובדוק האם הם באותו גודל בדיוק או שאחד צר ואחד רחב.`
    ],
    extraExplanation: picked.explanation,
    exampleDemonstration: {
      text: picked.explanation,
      visualType: 'book-shape',
      visualProps: {
        shapeKind: picked.shapeKind,
        coloredPartIndices: picked.coloredIndices,
        caption: picked.caption
      }
    },
    visualType: 'book-shape',
    visualProps: {
      shapeKind: picked.shapeKind,
      coloredPartIndices: picked.coloredIndices,
      caption: picked.caption,
      size: 'md'
    },
    answerType: 'choice',
    options,
    gentleWrongFeedback: {
      default: picked.wrongExplanation
    }
  };
}

/**
 * Exercise from Book: Ordering fractions in oval egg buttons into target slots.
 * Based on Exercise 24 in the uploaded book pages!
 */
export function generateBookFractionOrderExercise(difficulty: 1 | 2 | 3): Exercise {
  const id = `book-order-${Date.now()}-${getRandomInt(100, 999)}`;

  // Set of 4 fractions with different benchmarks (one mixed number, one improper fraction, one proper fraction, one equal to 1 or proper)
  // Matching Exercise 24 item א and ב from the book!
  const presets: {
    items: FractionEggItem[];
    orderType: 'descending' | 'ascending';
    explanation: string;
  }[] = [
    {
      // Item א from book: 8/7, 3/4, 7/8, 2 1/7
      // Descending (מהגדול לקטן): 2 1/7 (>2) -> 8/7 (>1) -> 7/8 (קרוב ל-1) -> 3/4 (0.75)
      items: [
        { id: '1', display: '2 1/7', value: 2 + 1 / 7 },
        { id: '2', display: '7/8', value: 7 / 8 },
        { id: '3', display: '3/4', value: 3 / 4 },
        { id: '4', display: '8/7', value: 8 / 7 }
      ],
      orderType: 'descending',
      explanation:
        'סדר מהגדול לקטן: 2 1/7 (הכי גדול, מעל 2) ← 8/7 (גדול מ-1) ← 7/8 (חסרה רק שמינית ל-1) ← 3/4 (חסר רבע שלם ל-1).'
    },
    {
      // Item ב from book: 9/4, 4/5, 7/7, 4/9
      // Descending: 9/4 (2 1/4) -> 7/7 (שווה ל-1) -> 4/5 (0.8) -> 4/9 (פחות מחצי)
      items: [
        { id: '1', display: '4/9', value: 4 / 9 },
        { id: '2', display: '7/7', value: 1.0 },
        { id: '3', display: '4/5', value: 4 / 5 },
        { id: '4', display: '9/4', value: 9 / 4 }
      ],
      orderType: 'descending',
      explanation:
        'סדר מהגדול לקטן: 9/4 (הוא 2 ורבע, מעל 2) ← 7/7 (שווה בדיוק ל-1) ← 4/5 (גדול מחצי, 0.8) ← 4/9 (קטן מחצי).'
    },
    {
      // Additional dynamic set: 1 3/5, 5/6, 12/10, 1/3
      items: [
        { id: '1', display: '1 3/5', value: 1.6 },
        { id: '2', display: '12/10', value: 1.2 },
        { id: '3', display: '5/6', value: 5 / 6 },
        { id: '4', display: '1/3', value: 1 / 3 }
      ],
      orderType: 'descending',
      explanation:
        'סדר מהגדול לקטן: 1 3/5 (הכי גדול, 1.6) ← 12/10 (שווה 1.2) ← 5/6 (קטן מ-1) ← 1/3 (הכי קטן).'
    }
  ];

  const preset = presets[getRandomInt(0, presets.length - 1)];

  return {
    id,
    topicId: 'summary-review',
    skillTag: 'same_denom_comparison',
    difficulty,
    title: 'מתוך הספר (תרגיל 24): סדרו את המספרים לפי גודלם',
    prompt: `סדרו את המספרים שבביציות מהגדול ביותר אל הקטן ביותר (היעזרו בהשוואה ל-1):`,
    hintSteps: [
      `רמז 1: מצאו קודם את המספר שהכי גדול מכולם (בדקו האם יש מספר מעורב עם שלמים).`,
      `רמז 2: מיינו את השברים לפי עוגנים: איזה שבר גדול מ-1? איזה שבר שווה ל-1? ואילו שברים קטנים מ-1?`,
      `רמז 3: בין שברים הקטנים מ-1, מי מהם חסר לו פחות כדי להגיע לשלם?`
    ],
    extraExplanation: preset.explanation,
    exampleDemonstration: {
      text: preset.explanation,
      visualType: 'book-egg-order',
      visualProps: { items: preset.items, orderType: preset.orderType }
    },
    visualType: 'book-egg-order',
    visualProps: {
      items: preset.items,
      orderType: preset.orderType
    },
    answerType: 'book-egg-order',
    gentleWrongFeedback: {
      default: `היעזרו בהשוואה ל-1: מספר מעורב גדול מ-1, שבר שהמונה קטן מהמכנה קטן מ-1.`
    }
  };
}

/**
 * Exercise from Book: Greater than / Less than / Equal (> / < / =)
 * Based on Exercise 23 in the uploaded book pages!
 */
export function generateBookComparisonExercise(difficulty: 1 | 2 | 3): Exercise {
  const id = `book-comp-${Date.now()}-${getRandomInt(100, 999)}`;

  // Bank of comparison items directly from Exercise 23 in the book!
  const pairs: {
    left: string;
    right: string;
    symbol: '>' | '<' | '=';
    reason: string;
  }[] = [
    {
      left: '25/13',
      right: '1',
      symbol: '>',
      reason: '25/13 גדול מ-1 מכיוון שהמונה (25) גדול מהמכנה (13). זהו שבר מדומה ששווה ל-1 ו-12/13.'
    },
    {
      left: '1',
      right: '34/55',
      symbol: '>',
      reason: '34/55 קטן מ-1 מכיוון שהמונה קטן מהמכנה, לכן 1 גדול מ-34/55.'
    },
    {
      left: '1',
      right: '9/4',
      symbol: '<',
      reason: '9/4 שווה ל-2 ורבע, ולכן 1 קטן מ-9/4.'
    },
    {
      left: '5/6',
      right: '1',
      symbol: '<',
      reason: '5/6 קטן מ-1 מכיוון שחסרה שישית אחת להשלמת שלם.'
    },
    {
      left: '9/11',
      right: '11/9',
      symbol: '<',
      reason: '9/11 קטן מ-1 (מונה קטן ממכנה), בעוד ש-11/9 גדול מ-1 (מונה גדול ממכנה). לכן 9/11 < 11/9.'
    },
    {
      left: '8/9',
      right: '7/7',
      symbol: '<',
      reason: '7/7 שווה בדיוק ל-1 שלם. 8/9 קטן מ-1, ולכן 8/9 < 7/7.'
    },
    {
      left: '3/7',
      right: '4/3',
      symbol: '<',
      reason: '3/7 קטן מ-1 (פחות מחצי), ו-4/3 הוא מספר גדול מ-1 (1 ושליש).'
    },
    {
      left: '61/60',
      right: '99/100',
      symbol: '>',
      reason: '61/60 גדול מ-1 (יש בו שלם ועוד חלק), ואילו 99/100 קטן מ-1. לכן 61/60 > 99/100.'
    },
    {
      left: '1 3/8',
      right: '1 3/5',
      symbol: '<',
      reason: 'לשני המספרים אותו שלם (1) ואותו מונה (3). מכיוון ששמיניות קטנות מחמישיות, 1 3/8 קטן מ-1 3/5.'
    },
    {
      left: '5/5',
      right: '32/32',
      symbol: '=',
      reason: 'שני השברים שווים בדיוק ל-1 שלם! 5/5 = 1 וגם 32/32 = 1.'
    },
    {
      left: '5 1/3',
      right: '5/3',
      symbol: '>',
      reason: '5 1/3 הוא 5 שלמים ושליש, ואילו 5/3 הוא רק שלם אחד ושני שליש (1 2/3).'
    },
    {
      left: '1 4/5',
      right: '2 1/5',
      symbol: '<',
      reason: '2 1/5 מכיל 2 שלמים, ואילו 1 4/5 מכיל רק שלם 1. לכן 1 4/5 < 2 1/5.'
    }
  ];

  const picked = pairs[getRandomInt(0, pairs.length - 1)];

  return {
    id,
    topicId: 'summary-review',
    skillTag: 'same_denom_comparison',
    difficulty,
    title: 'מתוך הספר (תרגיל 23): השלימו > או < או =',
    prompt: `השלימו את הסימן המתאים בין שני המספרים:`,
    hintSteps: [
      `רמז 1: השוו כל מספר לעוגן 1 שלם: האם המונה גדול מהמכנה (גדול מ-1) או קטן מהמכנה (קטן מ-1)?`,
      `רמז 2: אם לשני השברים יש שלמים, השוו קודם כל את מספר השלמים!`
    ],
    extraExplanation: picked.reason,
    exampleDemonstration: {
      text: picked.reason,
      visualType: 'book-comparison',
      visualProps: {
        leftDisplay: picked.left,
        rightDisplay: picked.right,
        correctSymbol: picked.symbol,
        reasonExplanation: picked.reason
      }
    },
    visualType: 'book-comparison',
    visualProps: {
      leftDisplay: picked.left,
      rightDisplay: picked.right,
      correctSymbol: picked.symbol,
      reasonExplanation: picked.reason
    },
    answerType: 'book-comparison',
    gentleWrongFeedback: {
      default: picked.reason
    }
  };
}

/**
 * Exercise from Book: Geoboard deli problem (completing 1/4 pizza slice to a whole pan).
 * Based on Exercise 25 in the uploaded book pages!
 */
export function generateBookGeoboardExercise(difficulty: 1 | 2 | 3): Exercise {
  const id = `book-geo-${Date.now()}-${getRandomInt(100, 999)}`;

  return {
    id,
    topicId: 'whole-part',
    skillTag: 'identify_fraction_shape',
    difficulty,
    title: 'מתוך הספר (תרגיל 25): השלמת מנה לתבנית שלמה',
    prompt: `מעדנייה חדשה נפתחה בשכונה. במעדנייה הזאת כל מנה היא 1/4 מהתבנית בחנות. הרכיבו תבנית שלמה אחת:`,
    hintSteps: [
      `רמז 1: אם מנה אחת היא רבע (1/4), כמה רבעים מרכיבים 1 שלם?`,
      `רמז 2: 4/4 שווים לשלם אחד שלם!`
    ],
    extraExplanation: '4 מנות של 1/4 מרכיבות יחד 4/4, שזה בדיוק תבנית שלמה אחת.',
    exampleDemonstration: {
      text: 'מכיוון שכל מנה היא 1/4, צריך 4 מנות בדיוק כדי לקבל 1 שלם.',
      visualType: 'book-geoboard',
      visualProps: { initialFraction: '1/4', targetSlices: 4 }
    },
    visualType: 'book-geoboard',
    visualProps: {
      initialFraction: '1/4',
      targetSlices: 4
    },
    answerType: 'book-geoboard',
    gentleWrongFeedback: {
      default: 'שלם אחד מורכב מ-4 מנות של רבע (4/4 = 1).'
    }
  };
}
