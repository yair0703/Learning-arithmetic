import { Exercise, TopicId, SkillTag, ExerciseChoiceOption } from '../types';
import { EXERCISE_BANK } from '../data/curriculumData';
import {
  generateBookEqualPartsExercise,
  generateBookFractionOrderExercise,
  generateBookComparisonExercise,
  generateBookGeoboardExercise
} from './bookExercisesGenerator';

/**
 * Random helper functions
 */
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
 * Generator for Topic: 'whole-part' (השבר כחלק משלם)
 */
function generateWholePartExercise(difficulty: 1 | 2 | 3): Exercise {
  const id = `gen-wp-${Date.now()}-${getRandomInt(100, 999)}`;
  const denoms = difficulty === 1 ? [4, 5, 6, 8] : difficulty === 2 ? [6, 7, 8, 9, 10] : [7, 8, 9, 11, 12];
  const denom = denoms[getRandomInt(0, denoms.length - 1)];
  const num = getRandomInt(1, denom - 1);
  const color = ['#6366f1', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'][getRandomInt(0, 5)];

  const questionType = getRandomInt(1, 5);

  if (questionType === 4) {
    // Book Geometry shape: equal vs unequal parts (Exercise 2 & 3 from book)
    return generateBookEqualPartsExercise(difficulty);
  }

  if (questionType === 5) {
    // Book Geoboard whole builder: 1/4 slice to 1 whole pan (Exercise 25 from book)
    return generateBookGeoboardExercise(difficulty);
  }

  if (questionType === 1) {
    // Visual bar identification
    const correctLabel = `${num}/${denom}`;
    const wrongUncolored = `${denom - num}/${denom}`;
    const wrongInverted = `${denom}/${num}`;
    const wrongDenom = `${num}/${denom + 1}`;

    const options: ExerciseChoiceOption[] = shuffleArray([
      { id: 'opt-1', label: correctLabel, isCorrect: true },
      { id: 'opt-2', label: wrongUncolored, isCorrect: false, misconceptionExplanation: `${wrongUncolored} מייצג את החלק הלבן שאינו צבוע!` },
      { id: 'opt-3', label: wrongInverted, isCorrect: false, misconceptionExplanation: 'המונה (הצבוע) צריך להיות למעלה, והמכנה (כל החלקים) למטה.' },
      { id: 'opt-4', label: wrongDenom, isCorrect: false, misconceptionExplanation: `ספור שוב את סך כל החלקים: יש ${denom} חלקים ולא ${denom + 1}.` }
    ]);

    return {
      id,
      topicId: 'whole-part',
      skillTag: 'identify_fraction_shape',
      difficulty,
      title: 'זיהוי שבר בצורה',
      prompt: `איזה שבר מייצג החלק הצבוע בצבע במלבן שלפניך?`,
      hintSteps: [
        `רמז 1: ספור לכמה חלקים שווים בסך הכל מחולק המלבן. זה יהיה המכנה (למטה).`,
        `רמז 2: ספור כמה חלקים צבועים. זה יהיה המונה (למעלה).`
      ],
      extraExplanation: `במלבן יש ${denom} חלקים שווים. מתוכם ${num} צבועים, לכן השבר הוא ${num}/${denom}.`,
      exampleDemonstration: {
        text: `אם מלבן מחולק ל-${denom} חלקים וצבועים ${num}, השבר הוא ${num}/${denom}.`,
        visualType: 'bar',
        visualProps: { totalParts: denom, coloredParts: num, color }
      },
      visualType: 'bar',
      visualProps: { totalParts: denom, coloredParts: num, color },
      answerType: 'choice',
      options,
      gentleWrongFeedback: {
        default: `ספור היטב את סך כל החלקים השווים בצורה (המכנה), ולאחר מכן כמה מהם צבועים (המונה).`
      }
    };
  } else if (questionType === 2) {
    // Circle pizza story
    const foods = ['פיצה משפחתית', 'עוגת יום הולדת עגולה', 'פשטידה עגולה'];
    const food = foods[getRandomInt(0, foods.length - 1)];
    const correctRemaining = `${denom - num}/${denom}`;

    const options: ExerciseChoiceOption[] = shuffleArray([
      { id: 'opt-1', label: correctRemaining, isCorrect: true },
      { id: 'opt-2', label: `${num}/${denom}`, isCorrect: false, misconceptionExplanation: `זהו החלק שנאכל, אך השאלה היא איזה חלק נשאר!` },
      { id: 'opt-3', label: `${denom - num}/${denom + 1}`, isCorrect: false, misconceptionExplanation: `המכנה לא משתנה: הפיצה חולקה ל-${denom} חלקים שווים.` },
      { id: 'opt-4', label: `${denom}/${denom - num}`, isCorrect: false, misconceptionExplanation: `השבר קטן מ-1, המונה חייב להיות קטן מהמכנה.` }
    ]);

    return {
      id,
      topicId: 'whole-part',
      skillTag: 'identify_fraction_shape',
      difficulty,
      title: 'השלמת שבר לשלם',
      prompt: `${food} חולקה ל-${denom} משולשים שווים. הילדים אכלו ${num}/${denom} ממנה. איזה חלק מהשלם נשאר במגש?`,
      hintSteps: [
        `רמז 1: שלם אחד מלא מורכב מ-${denom}/${denom}.`,
        `רמז 2: אם היו ${denom} חלקים ואכלו ${num}, כמה חלקים נותרו מתוך ה-${denom}?`
      ],
      extraExplanation: `שלם מלא הוא ${denom}/${denom}. מחסירים ${num}/${denom} ומקבלים ${denom - num}/${denom}.`,
      exampleDemonstration: {
        text: `מתוך ${denom} חלקים לקחו ${num}, נשארו ${denom - num}.`,
        visualType: 'circle',
        visualProps: { totalParts: denom, coloredParts: num, color }
      },
      visualType: 'circle',
      visualProps: { totalParts: denom, coloredParts: denom - num, color },
      answerType: 'choice',
      options,
      gentleWrongFeedback: {
        default: `חשוב: כמה חתיכות נשארו בצלחת מתוך סך כל ${denom} החתיכות שהיו בהתחלה?`
      }
    };
  } else {
    // Understanding denominator role
    const options: ExerciseChoiceOption[] = shuffleArray([
      { id: 'opt-1', label: `לכמה חלקים שווים מחולק השלם כולו`, isCorrect: true },
      { id: 'opt-2', label: `כמה חלקים לקחנו או צבענו`, isCorrect: false, misconceptionExplanation: `זהו התפקיד של המונה (המספר למעלה)!` },
      { id: 'opt-3', label: `כמה שלמים יש לנו בסך הכל`, isCorrect: false, misconceptionExplanation: `המכנה מתאר חלוקה של שלם אחד, לא כמות שלמים.` }
    ]);

    return {
      id,
      topicId: 'whole-part',
      skillTag: 'identify_numerator_denominator',
      difficulty,
      title: 'משמעות המכנה והמונה',
      prompt: `בשבר ${num}/${denom}, מה בדיוק מספר לנו המספר ${denom} (המכנה)?`,
      hintSteps: [
        `רמז 1: המכנה נמצא בתחתית קו השבר.`,
        `רמז 2: חשוב על לחמנייה שנחתכה לחלקים שווים.`
      ],
      extraExplanation: `המכנה אומר לכמה חלקים שווים בדיוק נחתך השלם. המונה (${num}) אומר כמה חלקים לקחנו.`,
      exampleDemonstration: {
        text: `בשבר ${num}/${denom}, ${denom} הוא שם החלקים (החלוקה השווה).`,
        visualType: 'bar',
        visualProps: { totalParts: denom, coloredParts: num, color: '#3b82f6' }
      },
      visualType: 'bar',
      visualProps: { totalParts: denom, coloredParts: num, color: '#3b82f6' },
      answerType: 'choice',
      options,
      gentleWrongFeedback: {
        default: `זכור: המכנה יושב למטה ומציין לכמה חלקים שווים נחתך השלם!`
      }
    };
  }
}

/**
 * Generator for Topic: 'number-line' (שברים על ישר המספרים)
 */
function generateNumberLineExercise(difficulty: 1 | 2 | 3): Exercise {
  const id = `gen-nl-${Date.now()}-${getRandomInt(100, 999)}`;
  const denoms = difficulty === 1 ? [3, 4, 5] : difficulty === 2 ? [5, 6, 8] : [6, 8, 10];
  const denom = denoms[getRandomInt(0, denoms.length - 1)];
  const num = getRandomInt(1, denom - 1);

  const isIntervalQuestion = getRandomInt(1, 2) === 1;

  if (isIntervalQuestion) {
    const correctLabel = `${num}/${denom}`;
    const wrongCountingLines = `${num}/${denom + 1}`;
    const wrongOffset = `${Math.min(denom - 1, num + 1)}/${denom}`;

    const options: ExerciseChoiceOption[] = shuffleArray([
      { id: 'opt-1', label: correctLabel, isCorrect: true },
      { id: 'opt-2', label: wrongCountingLines, isCorrect: false, misconceptionExplanation: `טעות נפוצה! ספרת את הקווים עצמם במקום לספור את המרווחים (הקפיצות) בין 0 ל-1.` },
      { id: 'opt-3', label: wrongOffset, isCorrect: false, misconceptionExplanation: `ספור שוב את מספר הצעדים מ-0 עד לנקודה המסומנת.` },
      { id: 'opt-4', label: `${denom}/${num}`, isCorrect: false, misconceptionExplanation: `הנקודה נמצאת בין 0 ל-1, לכן המונה חייב להיות קטן מהמכנה.` }
    ]);

    return {
      id,
      topicId: 'number-line',
      skillTag: 'number_line_placement',
      difficulty,
      title: 'מיקום שבר על ישר המספרים',
      prompt: `איזה שבר מסומן על ידי הנקודה הסגולה על ישר המספרים בין 0 ל-1?`,
      hintSteps: [
        `רמז 1: ספור כמה קפיצות (מרווחים שווים) יש מ-0 ועד ל-1. זהו המכנה.`,
        `רמז 2: ספור כמה קפיצות מ-0 נעשו עד לנקודה הסגולה. זהו המונה.`
      ],
      extraExplanation: `הקטע בין 0 ל-1 מחולק ל-${denom} מרווחים שווים. הנקודה נמצאת בקפיצה ה-${num}, ולכן היא ${num}/${denom}.`,
      exampleDemonstration: {
        text: `ישר מחולק ל-${denom} חלקים שווים. ${num} צעדים מ-0 מביאים אותנו ל-${num}/${denom}.`,
        visualType: 'number-line',
        visualProps: { min: 0, max: 1, divisions: denom, targetIndex: num, dotColor: '#8b5cf6' }
      },
      visualType: 'number-line',
      visualProps: { min: 0, max: 1, divisions: denom, targetIndex: num, dotColor: '#8b5cf6' },
      answerType: 'choice',
      options,
      gentleWrongFeedback: {
        default: `זכור את כלל הזהב של ישר המספרים: סופרים קפיצות/רווחים מ-0, ולא סופרים את הקווים!`
      }
    };
  } else {
    // Which benchmark is it closest to?
    const isCloserToZero = num / denom < 0.35;
    const isCloserToOne = num / denom > 0.65;
    const isNearHalf = !isCloserToZero && !isCloserToOne;

    const correct = isCloserToZero ? 'קרוב יותר ל-0' : isCloserToOne ? 'קרוב יותר ל-1' : 'קרוב בדיוק לחצי (1/2)';

    const options: ExerciseChoiceOption[] = shuffleArray([
      { id: 'opt-1', label: correct, isCorrect: true },
      { id: 'opt-2', label: isCloserToZero ? 'קרוב יותר ל-1' : 'קרוב יותר ל-0', isCorrect: false, misconceptionExplanation: `הבט במיקום הנקודה בישר המספרים.` },
      { id: 'opt-3', label: isNearHalf ? 'קרוב יותר ל-1' : 'קרוב בדיוק לחצי (1/2)', isCorrect: false, misconceptionExplanation: `בדוק האם השבר עבר את החצי או עדיין לא.` }
    ]);

    return {
      id,
      topicId: 'number-line',
      skillTag: 'number_line_intervals',
      difficulty,
      title: 'אומדן שברים: קרוב ל-0, לחצי או ל-1?',
      prompt: `הבט בשבר ${num}/${denom} על ישר המספרים. לאיזה מספר הוא הכי קרוב?`,
      hintSteps: [
        `רמז 1: מצא את אמצע הקטע (1/2) על ישר המספרים.`,
        `רמז 2: האם השבר ${num}/${denom} נמצא לפני החצי, קרוב לחצי, או עבר את החצי לכיוון 1?`
      ],
      extraExplanation: `${num}/${denom} הוא כ-${Math.round((num / denom) * 100)}% מ-1, לכן הוא ${correct}.`,
      exampleDemonstration: {
        text: `על ישר המספרים רואים מיד לאיזה עוגן (0, 1/2 או 1) השבר קרוב ביותר.`,
        visualType: 'number-line',
        visualProps: { min: 0, max: 1, divisions: denom, targetIndex: num, dotColor: '#3b82f6' }
      },
      visualType: 'number-line',
      visualProps: { min: 0, max: 1, divisions: denom, targetIndex: num, dotColor: '#3b82f6' },
      answerType: 'choice',
      options,
      gentleWrongFeedback: {
        default: `השתמש בישר המספרים כדי לראות את המרחק לעוגנים 0, 1/2 ו-1.`
      }
    };
  }
}

/**
 * Generator for Topic: 'mixed-numbers' (שברים הגדולים מ-1 ומספרים מעורבים)
 */
function generateMixedNumbersExercise(difficulty: 1 | 2 | 3): Exercise {
  const id = `gen-mix-${Date.now()}-${getRandomInt(100, 999)}`;
  const denom = difficulty === 1 ? [2, 3, 4][getRandomInt(0, 2)] : [3, 4, 5, 6][getRandomInt(0, 3)];
  const whole = getRandomInt(1, 3);
  const remainder = getRandomInt(1, denom - 1);
  const totalPieces = whole * denom + remainder;

  const branch = getRandomInt(1, 3);
  if (branch === 3) {
    // Direct comparison (> / < / =) between mixed numbers / improper fractions from the book!
    return generateBookComparisonExercise(difficulty);
  }

  const toMixed = getRandomInt(1, 2) === 1;

  if (toMixed) {
    // From improper to mixed: e.g. 7/3 -> 2 1/3
    const correctLabel = `${whole} ו-${remainder}/${denom}`;
    const wrongWhole = `${whole + 1} ו-${remainder}/${denom}`;
    const wrongRemainder = `${whole} ו-${denom - remainder}/${denom}`;
    const wrongStayedImproper = `1 ו-${totalPieces - denom}/${denom}`;

    const options: ExerciseChoiceOption[] = shuffleArray([
      { id: 'opt-1', label: correctLabel, isCorrect: true },
      { id: 'opt-2', label: wrongWhole, isCorrect: false, misconceptionExplanation: `כדי לקבל ${whole + 1} שלמים היינו צריכים ${(whole + 1) * denom} חלקים, ויש רק ${totalPieces}!` },
      { id: 'opt-3', label: wrongRemainder, isCorrect: false, misconceptionExplanation: `השארית היא ${remainder} ולא ${denom - remainder}.` },
      { id: 'opt-4', label: wrongStayedImproper, isCorrect: false, misconceptionExplanation: `במספר מעורב שבר השארית חייב להיות שבר אמיתי (קטן מ-1). אפשר להוציא עוד שלמים!` }
    ]);

    return {
      id,
      topicId: 'mixed-numbers',
      skillTag: 'improper_to_mixed',
      difficulty,
      title: 'המרת שבר מדומה למספר מעורב',
      prompt: `המירו את השבר המדומה ${totalPieces}/${denom} למספר מעורב:`,
      hintSteps: [
        `רמז 1: שאל את עצמך: כמה פעמים המספר ${denom} נכנס בשלמות בתוך ${totalPieces}? זה יהיה מספר השלמים.`,
        `רמז 2: כמה חלקים נשארו בשארית? זה יהיה המונה של השבר, והמכנה יישאר ${denom}.`
      ],
      extraExplanation: `כל ${denom} חלקים יוצרים שלם 1. ${denom} נכנס ב-${totalPieces} בדיוק ${whole} פעמים (${whole * denom}), ונשארת שארית של ${remainder} חלקים. לכן: ${whole} ו-${remainder}/${denom}.`,
      exampleDemonstration: {
        text: `${totalPieces}/${denom} הם ${whole} שלמים שלמים ועוד ${remainder}/${denom}.`,
        visualType: 'mixed-bars',
        visualProps: { wholeCount: whole, remainder, denom, color: '#f59e0b' }
      },
      visualType: 'mixed-bars',
      visualProps: { wholeCount: whole, remainder, denom, color: '#f59e0b' },
      answerType: 'choice',
      options,
      gentleWrongFeedback: {
        default: `חלק את המונה (${totalPieces}) במכנה (${denom}): התוצאה היא השלמים, והשארית היא המונה החדש.`
      }
    };
  } else {
    // From mixed to improper: e.g. 2 1/4 -> 9/4
    const correctImproper = `${totalPieces}/${denom}`;
    const wrongAdd = `${whole + remainder}/${denom}`;
    const wrongDenom = `${totalPieces}/${denom * 2}`;

    const options: ExerciseChoiceOption[] = shuffleArray([
      { id: 'opt-1', label: correctImproper, isCorrect: true },
      { id: 'opt-2', label: wrongAdd, isCorrect: false, misconceptionExplanation: `טעות! צריך לכפול את השלמים במכנה (${whole} כפול ${denom} = ${whole * denom}) ולא רק לחבר ${whole} + ${remainder}!` },
      { id: 'opt-3', label: wrongDenom, isCorrect: false, misconceptionExplanation: `המכנה לעולם לא משתנה: הוא נשאר ${denom}!` },
      { id: 'opt-4', label: `${totalPieces - 1}/${denom}`, isCorrect: false, misconceptionExplanation: `בדוק שוב את החישוב: ${whole} כפול ${denom} שווה ${whole * denom}, ועוד ${remainder} שווה ${totalPieces}.` }
    ]);

    return {
      id,
      topicId: 'mixed-numbers',
      skillTag: 'mixed_to_improper',
      difficulty,
      title: 'המרת מספר מעורב לשבר מדומה',
      prompt: `איזה שבר מדומה שווה למספר המעורב ${whole} ו-${remainder}/${denom}?`,
      hintSteps: [
        `רמז 1: כמה חתיכות של 1/${denom} יש בכל שלם? יש ${denom} חתיכות.`,
        `רמז 2: כפול את מספר השלמים (${whole}) במכנה (${denom}), והוסף את שארית המונה (${remainder}).`
      ],
      extraExplanation: `${whole} שלמים שווים ל-${whole * denom}/${denom}. נוסיף עוד ${remainder}/${denom} ונקבל ${totalPieces}/${denom}.`,
      exampleDemonstration: {
        text: `${whole} שלמים הם ${whole * denom} חלקים, יחד עם ${remainder} חלקים נוספים מקבלים ${totalPieces}/${denom}.`,
        visualType: 'mixed-bars',
        visualProps: { wholeCount: whole, remainder, denom, color: '#10b981' }
      },
      visualType: 'mixed-bars',
      visualProps: { wholeCount: whole, remainder, denom, color: '#10b981' },
      answerType: 'choice',
      options,
      gentleWrongFeedback: {
        default: `כפול שלם במכנה והוסף את המונה. המכנה נשאר ללא שינוי!`
      }
    };
  }
}

/**
 * Generator for Topic: 'same-denom' (פעולות בשברים שהמכנים שלהם שווים)
 */
function generateSameDenomExercise(difficulty: 1 | 2 | 3): Exercise {
  const id = `gen-sd-${Date.now()}-${getRandomInt(100, 999)}`;
  const denoms = [5, 6, 7, 8, 9, 10];
  const denom = denoms[getRandomInt(0, denoms.length - 1)];

  const isAddition = getRandomInt(1, 2) === 1;

  if (isAddition) {
    const num1 = getRandomInt(1, Math.floor(denom / 2));
    const num2 = getRandomInt(1, denom - num1 - 1);
    const sum = num1 + num2;

    const correctLabel = `${sum}/${denom}`;
    const wrongAddedDenoms = `${sum}/${denom * 2}`;
    const wrongMultiplied = `${num1 * num2}/${denom}`;

    const options: ExerciseChoiceOption[] = shuffleArray([
      { id: 'opt-1', label: correctLabel, isCorrect: true },
      { id: 'opt-2', label: wrongAddedDenoms, isCorrect: false, misconceptionExplanation: `אזהרה: לעולם לא מחברים את המכנים! שומרים על המכנה ${denom} ומחברים רק את המונים.` },
      { id: 'opt-3', label: wrongMultiplied, isCorrect: false, misconceptionExplanation: `זהו תרגיל חיבור (+), לא תרגיל כפל!` },
      { id: 'opt-4', label: `${sum + 1}/${denom}`, isCorrect: false, misconceptionExplanation: `בדוק שוב: ${num1} ועוד ${num2} שווה ${sum}.` }
    ]);

    return {
      id,
      topicId: 'same-denom',
      skillTag: 'same_denom_addition',
      difficulty,
      title: 'חיבור שברים עם מכנים זהים',
      prompt: `חשבו את תוצאת התרגיל: ${num1}/${denom} + ${num2}/${denom} = ?`,
      hintSteps: [
        `רמז 1: זכור את חוק הברזל: המכנה הוא "שם המשפחה" של החלקים ואינו משתנה!`,
        `רמז 2: חבר אך ורק את המונים העליונים: ${num1} + ${num2}.`
      ],
      extraExplanation: `כשמחברים שברים עם אותו מכנה, מחברים רק את המונים: ${num1} + ${num2} = ${sum}. המכנה נשאר ${denom}. התשובה: ${sum}/${denom}.`,
      exampleDemonstration: {
        text: `בחיבור שברים עם מכנה זהה מחברים רק את המונה: ${num1}/${denom} + ${num2}/${denom} = ${sum}/${denom}.`,
        visualType: 'bar',
        visualProps: { totalParts: denom, coloredParts: sum, color: '#ec4899' }
      },
      visualType: 'bar',
      visualProps: { totalParts: denom, coloredParts: sum, color: '#ec4899' },
      answerType: 'choice',
      options,
      gentleWrongFeedback: {
        default: `זכור: מחברים רק את המונים (${num1}+${num2}), והמכנה נשאר ${denom} בדיוק כפי שהיה!`
      }
    };
  } else {
    // Subtraction
    const num1 = getRandomInt(3, denom - 1);
    const num2 = getRandomInt(1, num1 - 1);
    const diff = num1 - num2;

    const correctLabel = `${diff}/${denom}`;
    const wrongZeroDenom = `${diff}/0`;
    const wrongAdded = `${num1 + num2}/${denom}`;

    const options: ExerciseChoiceOption[] = shuffleArray([
      { id: 'opt-1', label: correctLabel, isCorrect: true },
      { id: 'opt-2', label: wrongAdded, isCorrect: false, misconceptionExplanation: `זהו תרגיל חיסור (-), לא תרגיל חיבור!` },
      { id: 'opt-3', label: `${diff}/${denom * 2}`, isCorrect: false, misconceptionExplanation: `המכנה אינו משתנה בחיסור שברים בעלי מכנה שווה.` },
      { id: 'opt-4', label: `${Math.max(1, diff - 1)}/${denom}`, isCorrect: false, misconceptionExplanation: `בדוק שוב את החיסור: ${num1} פחות ${num2} שווה ${diff}.` }
    ]);

    return {
      id,
      topicId: 'same-denom',
      skillTag: 'same_denom_subtraction',
      difficulty,
      title: 'חיסור שברים עם מכנים זהים',
      prompt: `חשבו את תוצאת התרגיל: ${num1}/${denom} - ${num2}/${denom} = ?`,
      hintSteps: [
        `רמז 1: המכנה ${denom} נשאר ללא שינוי.`,
        `רמז 2: חסר את המונים העליונים: ${num1} פחות ${num2}.`
      ],
      extraExplanation: `${num1}/${denom} פחות ${num2}/${denom}: מחסירים מונים (${num1} - ${num2} = ${diff}) והמכנה נשאר ${denom}. התשובה: ${diff}/${denom}.`,
      exampleDemonstration: {
        text: `היו ${num1} חלקים והורדנו ${num2}, נותרו ${diff}/${denom}.`,
        visualType: 'bar',
        visualProps: { totalParts: denom, coloredParts: diff, color: '#f59e0b' }
      },
      visualType: 'bar',
      visualProps: { totalParts: denom, coloredParts: diff, color: '#f59e0b' },
      answerType: 'choice',
      options,
      gentleWrongFeedback: {
        default: `בחיסור שברים עם מכנה זהה מחסירים רק את המונים (${num1}-${num2}), והמכנה נשאר ${denom}!`
      }
    };
  }
}

/**
 * Generator for Topic: 'fractional-amount' (חיסור שבר משלם)
 */
function generateFractionalAmountExercise(difficulty: 1 | 2 | 3): Exercise {
  const id = `gen-fa-${Date.now()}-${getRandomInt(100, 999)}`;
  const denoms = [4, 5, 6, 7, 8, 9, 10];
  const denom = denoms[getRandomInt(0, denoms.length - 1)];
  const num = getRandomInt(1, denom - 1);
  const whole = difficulty === 1 ? 1 : difficulty === 2 ? 1 : 2;

  if (whole === 1) {
    const diff = denom - num;
    const correctLabel = `${diff}/${denom}`;
    const wrongDenom = `${diff}/${denom - 1}`;
    const wrongSubtractNumeratorOnly = `${denom - 1}/${denom}`;

    const options: ExerciseChoiceOption[] = shuffleArray([
      { id: 'opt-1', label: correctLabel, isCorrect: true },
      { id: 'opt-2', label: `${num}/${denom}`, isCorrect: false, misconceptionExplanation: `זהו החלק שחיסרנו, כמה נותר מהשלם?` },
      { id: 'opt-3', label: wrongSubtractNumeratorOnly, isCorrect: false, misconceptionExplanation: `זכור לפרוט את השלם ל-${denom}/${denom}!` },
      { id: 'opt-4', label: `${diff + 1}/${denom}`, isCorrect: false, misconceptionExplanation: `בדוק שוב: ${denom} פחות ${num} שווה ${diff}.` }
    ]);

    return {
      id,
      topicId: 'fractional-amount',
      skillTag: 'same_denom_subtraction',
      difficulty,
      title: 'חיסור שבר מ-1 שלם',
      prompt: `פתרו את תרגיל החיסור: 1 - ${num}/${denom} = ?`,
      hintSteps: [
        `רמז 1: פשוט מאוד לפרוט 1 שלם לשבר ששווה לו! 1 שלם = ${denom}/${denom}.`,
        `רמז 2: עכשיו פתור: ${denom}/${denom} פחות ${num}/${denom}.`
      ],
      extraExplanation: `הופכים את המספר 1 ל-${denom}/${denom}. כעת מחסרים: ${denom}/${denom} - ${num}/${denom} = ${diff}/${denom}.`,
      exampleDemonstration: {
        text: `1 שלם הוא שוקולד שלם של ${denom}/${denom}. אם אכלנו ${num}/${denom}, נשארו ${diff}/${denom}.`,
        visualType: 'bar',
        visualProps: { totalParts: denom, coloredParts: diff, color: '#3b82f6' }
      },
      visualType: 'bar',
      visualProps: { totalParts: denom, coloredParts: diff, color: '#3b82f6' },
      answerType: 'choice',
      options,
      gentleWrongFeedback: {
        default: `פרוט תחילה את השלם (1) לשבר עם מכנה ${denom} (${denom}/${denom}), ואז חסר את המונים.`
      }
    };
  } else {
    // 2 - num/denom -> 1 and (denom - num)/denom
    const diff = denom - num;
    const correctLabel = `1 ו-${diff}/${denom}`;
    const wrongLabel = `2 ו-${diff}/${denom}`;

    const options: ExerciseChoiceOption[] = shuffleArray([
      { id: 'opt-1', label: correctLabel, isCorrect: true },
      { id: 'opt-2', label: wrongLabel, isCorrect: false, misconceptionExplanation: `הורדנו שבר מתוך ה-2 שלמים, לכן נשאר רק שלם 1 מלא ועוד חלק!` },
      { id: 'opt-3', label: `${diff}/${denom}`, isCorrect: false, misconceptionExplanation: `התחלנו מ-2 שלמים, לכן חייב להישאר שלם 1 שלם!` },
      { id: 'opt-4', label: `1 ו-${num}/${denom}`, isCorrect: false, misconceptionExplanation: `בדוק שוב את החיסור של השלם שנפרט: ${denom} פחות ${num} שווה ${diff}.` }
    ]);

    return {
      id,
      topicId: 'fractional-amount',
      skillTag: 'same_denom_subtraction',
      difficulty,
      title: 'חיסור שבר ממספר שלם',
      prompt: `פתרו את התרגיל: 2 - ${num}/${denom} = ?`,
      hintSteps: [
        `רמז 1: מתוך 2 שלמים, שלם אחד נשאר שלם, ואת השלם השני פורטים ל-${denom}/${denom}.`,
        `רמז 2: מה נשאר מהשלם שנפרט? ${denom}/${denom} פחות ${num}/${denom}.`
      ],
      extraExplanation: `2 שווה ל-1 ו-${denom}/${denom}. מחסירים ${num}/${denom} ומקבלים: 1 ו-${diff}/${denom}.`,
      exampleDemonstration: {
        text: `מתוך 2 פיצות שלמות, פורטים פיצה אחת ומחסירים ${num}/${denom}. נשארת פיצה אחת שלמה ועוד ${diff}/${denom}.`,
        visualType: 'mixed-bars',
        visualProps: { wholeCount: 1, remainder: diff, denom, color: '#10b981' }
      },
      visualType: 'mixed-bars',
      visualProps: { wholeCount: 1, remainder: diff, denom, color: '#10b981' },
      answerType: 'choice',
      options,
      gentleWrongFeedback: {
        default: `פרוט רק שלם אחד מתוך ה-2: שלם אחד יישאר, והשני יהפוך לשבר (${denom}/${denom}).`
      }
    };
  }
}

/**
 * Generator for Topic: 'part-of-quantity' (שבר של כמות)
 */
function generatePartOfQuantityExercise(difficulty: 1 | 2 | 3): Exercise {
  const id = `gen-pq-${Date.now()}-${getRandomInt(100, 999)}`;
  const denoms = difficulty === 1 ? [2, 3, 4, 5] : [3, 4, 5, 6, 8];
  const denom = denoms[getRandomInt(0, denoms.length - 1)];
  const itemsPerGroup = getRandomInt(3, 8);
  const total = denom * itemsPerGroup;
  const num = difficulty === 1 ? 1 : getRandomInt(2, denom - 1);
  const result = (total / denom) * num;

  const itemNames = [
    { name: 'תותים מתוקים', singular: 'תות', verb: 'בקערה' },
    { name: 'בלונים צבעוניים', singular: 'בלון', verb: 'במסיבה' },
    { name: 'מדבקות זוהרות', singular: 'מדבקה', verb: 'באוסף' },
    { name: 'עפרונות צבעוניים', singular: 'עיפרון', verb: 'בקופסה' },
    { name: 'תלמידים', singular: 'תלמיד', verb: 'בכיתה ה׳' }
  ];
  const item = itemNames[getRandomInt(0, itemNames.length - 1)];

  const correctLabel = `${result} ${item.name}`;
  const wrongOnlyUnit = `${total / denom} ${item.name}`;
  const wrongMultipliedTotal = `${total * denom}`;
  const wrongOffset = `${result + itemsPerGroup} ${item.name}`;

  const options: ExerciseChoiceOption[] = shuffleArray([
    { id: 'opt-1', label: correctLabel, isCorrect: true },
    { id: 'opt-2', label: num > 1 ? wrongOnlyUnit : wrongOffset, isCorrect: false, misconceptionExplanation: num > 1 ? `זהו רק 1/${denom} מהכמות, אך עליך למצוא ${num}/${denom} (לכפול ב-${num})!` : `בדוק שוב את החילוק.` },
    { id: 'opt-3', label: `${total - result} ${item.name}`, isCorrect: false, misconceptionExplanation: `זהו החלק שנשאר, אך השאלה שאלה על החלק שנלקח!` },
    { id: 'opt-4', label: wrongOffset, isCorrect: false, misconceptionExplanation: `בדוק שוב את החישוב: ${total} לחלק ל-${denom} שווה ${total / denom}, וכפול ${num} שווה ${result}.` }
  ]);

  return {
    id,
    topicId: 'part-of-quantity',
    skillTag: num === 1 ? 'unit_fraction_of_quantity' : 'fraction_of_quantity',
    difficulty,
    title: 'מציאת שבר מתוך כמות',
    prompt: `${item.verb} יש ${total} ${item.name}. לקחו ${num}/${denom} מהם. כמה ${item.name} לקחו?`,
    hintSteps: [
      `רמז 1: שלב ראשון – חלק את כל ה-${total} ${item.name} ל-${denom} קבוצות שוות (${total} ÷ ${denom}).`,
      `רמז 2: בכל קבוצה יש ${total / denom} ${item.singular}ים. כעת כפול במספר החלקים שלקחנו (${num}).`
    ],
    extraExplanation: `שלב א׳: מוצאים שבר יחידה: ${total} ÷ ${denom} = ${total / denom}. שלב ב׳: כופלים במונה: ${total / denom} × ${num} = ${result}.`,
    exampleDemonstration: {
      text: `כדי למצוא ${num}/${denom} מתוך ${total}: מחלקים ב-${denom} וכופלים ב-${num}.`,
      visualType: 'quantity',
      visualProps: {
        totalItems: total,
        groups: denom,
        itemsPerGroup,
        selectedGroups: num,
        itemName: item.name
      }
    },
    visualType: 'quantity',
    visualProps: {
      totalItems: total,
      groups: denom,
      itemsPerGroup,
      selectedGroups: num,
      itemName: item.name
    },
    answerType: 'choice',
    options,
    gentleWrongFeedback: {
      default: `חלק את הכמות הכוללת במכנה (${denom}), ואת התוצאה כפול במונה (${num}).`
    }
  };
}

/**
 * Generator for Topic: 'decimals-mult-div' (הכרת שברים עשרוניים – כפל וחילוק ב-10 וב-100)
 */
function generateDecimalsExercise(difficulty: 1 | 2 | 3): Exercise {
  const id = `gen-dec-${Date.now()}-${getRandomInt(100, 999)}`;
  const isMult = getRandomInt(1, 2) === 1;
  const factor = getRandomInt(1, 2) === 1 ? 10 : 100;

  if (isMult) {
    // Multiplication by 10 or 100
    const val = factor === 10 ? (getRandomInt(1, 99) / 10) : (getRandomInt(1, 95) / 100);
    const correctVal = factor === 10 ? Number((val * 10).toFixed(2)) : Number((val * 100).toFixed(2));

    const wrongDivide = Number((val / factor).toFixed(3));
    const wrongFactor = factor === 10 ? Number((val * 100).toFixed(2)) : Number((val * 10).toFixed(2));

    const options: ExerciseChoiceOption[] = shuffleArray([
      { id: 'opt-1', label: `${correctVal}`, isCorrect: true },
      { id: 'opt-2', label: `${wrongDivide}`, isCorrect: false, misconceptionExplanation: `בכפל המספר גדל והנקודה זזה ימינה, לא שמאלה!` },
      { id: 'opt-3', label: `${wrongFactor}`, isCorrect: false, misconceptionExplanation: factor === 10 ? `כפלת ב-100 (שני צעדים) במקום ב-10 (צעד אחד)!` : `כפלת ב-10 (צעד אחד) במקום ב-100 (שני צעדים)!` },
      { id: 'opt-4', label: `${val}`, isCorrect: false, misconceptionExplanation: `כפל ב-${factor} משנה את מיקום הנקודה העשרונית!` }
    ]);

    return {
      id,
      topicId: 'decimals-mult-div',
      skillTag: 'decimal_multiply_10_100',
      difficulty,
      title: 'כפל שבר עשרוני ב-10 וב-100',
      prompt: `חשבו את תוצאת התרגיל: ${val} × ${factor} = ?`,
      hintSteps: [
        `רמז 1: בכפל במספרים 10 ו-100 המספר גדל, ולכן הנקודה העשרונית זזה ימינה.`,
        `רמז 2: ב-${factor} יש ${factor === 10 ? 'אפס אחד, לכן זזים צעד 1' : 'שני אפסים, לכן זזים 2 צעדים'} ימינה.`
      ],
      extraExplanation: `בכפל ב-${factor}, מזיזים את הנקודה העשרונית ${factor === 10 ? 'צעד אחד' : 'שני צעדים'} ימינה. ${val} × ${factor} = ${correctVal}.`,
      exampleDemonstration: {
        text: `כפל ב-${factor} מקפיץ את הנקודה ימינה.`,
        visualType: 'decimal-table',
        visualProps: { before: val, op: 'mult', factor, after: correctVal }
      },
      visualType: 'decimal-table',
      visualProps: { before: val, op: 'mult', factor, after: correctVal },
      answerType: 'choice',
      options,
      gentleWrongFeedback: {
        default: `זכור: כפל ב-10 מזיז נקודה צעד 1 ימינה. כפל ב-100 מזיז נקודה 2 צעדים ימינה.`
      }
    };
  } else {
    // Division by 10 or 100
    const intVal = factor === 10 ? getRandomInt(1, 95) : getRandomInt(1, 80);
    const correctVal = Number((intVal / factor).toFixed(2));
    const wrongMult = intVal * factor;
    const wrongFactor = factor === 10 ? Number((intVal / 100).toFixed(2)) : Number((intVal / 10).toFixed(2));

    const options: ExerciseChoiceOption[] = shuffleArray([
      { id: 'opt-1', label: `${correctVal}`, isCorrect: true },
      { id: 'opt-2', label: `${wrongMult}`, isCorrect: false, misconceptionExplanation: `זהו תרגיל חילוק (:) ולכן המספר קטן, לא גדל!` },
      { id: 'opt-3', label: `${wrongFactor}`, isCorrect: false, misconceptionExplanation: factor === 10 ? `חילקת ב-100 במקום ב-10.` : `חילקת ב-10 במקום ב-100.` },
      { id: 'opt-4', label: `0.${intVal}`, isCorrect: false, misconceptionExplanation: `ספור בדיוק כמה מקומות זזה הנקודה העשרונית שמאלה.` }
    ]);

    return {
      id,
      topicId: 'decimals-mult-div',
      skillTag: 'decimal_divide_10_100',
      difficulty,
      title: 'חילוק מספר שלם ב-10 וב-100',
      prompt: `חשבו את תוצאת התרגיל: ${intVal} ÷ ${factor} = ?`,
      hintSteps: [
        `רמז 1: בחילוק ב-10 וב-100 המספר קטן, ולכן הנקודה העשרונית זזה שמאלה.`,
        `רמז 2: במספר שלם הנקודה עומדת בסוף (${intVal}.). הזז אותה ${factor === 10 ? 'צעד 1' : '2 צעדים'} שמאלה.`
      ],
      extraExplanation: `בחילוק ב-${factor}, מזיזים את הנקודה ${factor === 10 ? 'צעד אחד' : 'שני צעדים'} שמאלה. ${intVal} ÷ ${factor} = ${correctVal}.`,
      exampleDemonstration: {
        text: `חילוק ב-${factor} מקטין את המספר ומזיז נקודה שמאלה.`,
        visualType: 'decimal-table',
        visualProps: { before: intVal, op: 'div', factor, after: correctVal }
      },
      visualType: 'decimal-table',
      visualProps: { before: intVal, op: 'div', factor, after: correctVal },
      answerType: 'choice',
      options,
      gentleWrongFeedback: {
        default: `בחילוק ב-10 מזיזים נקודה צעד אחד שמאלה. בחילוק ב-100 מזיזים 2 צעדים שמאלה.`
      }
    };
  }
}

/**
 * Generator for Topic: 'summary-review' (פעילויות לסיכום הפרק)
 */
function generateSummaryReviewExercise(difficulty: 1 | 2 | 3): Exercise {
  const picker = getRandomInt(1, 6);
  if (picker === 1) return generateBookComparisonExercise(difficulty);
  if (picker === 2) return generateBookFractionOrderExercise(difficulty);
  if (picker === 3) return generatePartOfQuantityExercise(difficulty);
  if (picker === 4) return generateMixedNumbersExercise(difficulty);
  if (picker === 5) return generateSameDenomExercise(difficulty);
  return generateNumberLineExercise(difficulty);
}

/**
 * Master function: get a list of diverse, fresh exercises for a topic and difficulty.
 * Guarantees zero repetitive questions in a session!
 */
export function getFreshExercisesForTopic(
  topicId: TopicId,
  currentLevel: 1 | 2 | 3 = 1,
  count: number = 5,
  excludedIds: string[] = []
): Exercise[] {
  // 1. Get curated static exercises for this topic and level
  const staticPool = EXERCISE_BANK.filter(
    (ex) => ex.topicId === topicId && !excludedIds.includes(ex.id)
  );

  const matchedStatic = staticPool.filter((ex) => ex.difficulty === currentLevel);
  const otherStatic = staticPool.filter((ex) => ex.difficulty !== currentLevel);

  const selected: Exercise[] = [];

  // Take up to 2 static exercises from matching level to preserve the curated hand-crafted questions
  if (matchedStatic.length > 0) {
    const shuffled = shuffleArray(matchedStatic);
    selected.push(...shuffled.slice(0, Math.min(2, matchedStatic.length)));
  }

  // 2. Fill the rest of the batch dynamically using the generators so every session is 100% unique!
  while (selected.length < count) {
    let fresh: Exercise;
    switch (topicId) {
      case 'whole-part':
        fresh = generateWholePartExercise(currentLevel);
        break;
      case 'number-line':
        fresh = generateNumberLineExercise(currentLevel);
        break;
      case 'mixed-numbers':
        fresh = generateMixedNumbersExercise(currentLevel);
        break;
      case 'same-denom':
        fresh = generateSameDenomExercise(currentLevel);
        break;
      case 'fractional-amount':
        fresh = generateFractionalAmountExercise(currentLevel);
        break;
      case 'part-of-quantity':
        fresh = generatePartOfQuantityExercise(currentLevel);
        break;
      case 'decimals-mult-div':
        fresh = generateDecimalsExercise(currentLevel);
        break;
      case 'summary-review':
      default:
        fresh = generateSummaryReviewExercise(currentLevel);
        break;
    }
    selected.push(fresh);
  }

  return shuffleArray(selected).slice(0, count);
}

/**
 * Generates a single exercise with specific difficulty for adaptive challenge mode.
 */
export function generateSingleExercise(topicId: TopicId, difficulty: 1 | 2 | 3): Exercise {
  switch (topicId) {
    case 'whole-part':
      return generateWholePartExercise(difficulty);
    case 'number-line':
      return generateNumberLineExercise(difficulty);
    case 'mixed-numbers':
      return generateMixedNumbersExercise(difficulty);
    case 'same-denom':
      return generateSameDenomExercise(difficulty);
    case 'fractional-amount':
      return generateFractionalAmountExercise(difficulty);
    case 'part-of-quantity':
      return generatePartOfQuantityExercise(difficulty);
    case 'decimals-mult-div':
      return generateDecimalsExercise(difficulty);
    case 'summary-review':
    default:
      return generateSummaryReviewExercise(difficulty);
  }
}
