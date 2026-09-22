import { TopicInfo, TopicLearningContent, Exercise, TopicId } from '../types';
import { ALL_CURRICULUM_EXERCISES } from './exercises';

export const TOPICS: TopicInfo[] = [
  {
    id: 'whole-part',
    order: 1,
    title: 'השבר כחלק משלם – חזרה והעמקה',
    shortTitle: 'שבר כחלק משלם',
    subtitle: 'מהו שבר? מונה, מכנה וחלקים שווים',
    description: 'נבין לעומק ממה מורכב שבר, למה חובה שהחלקים יהיו שווים, ואיך מזהים שברים בצורות שונות.',
    iconName: 'PieChart',
    accentColor: 'indigo',
    bgGradient: 'from-indigo-500 to-blue-600',
    coreConcepts: ['מונה ומכנה', 'חלקים שווים בלבד', 'שבר יחידה', 'השלם כיחידה אחת']
  },
  {
    id: 'number-line',
    order: 2,
    title: 'שברים על ישר המספרים',
    shortTitle: 'ישר המספרים',
    subtitle: 'איפה השבר גר בין 0 ל-1 ומעבר לו?',
    description: 'נלמד למקם שברים במדויק על ישר המספרים, לזהות מרחקים שווים ולהבין את גודל השבר.',
    iconName: 'Ruler',
    accentColor: 'emerald',
    bgGradient: 'from-emerald-500 to-teal-600',
    coreConcepts: ['חלוקת הקטע מ-0 עד 1', 'שנתות שוות', 'שברים גדולים מ-1', 'שברים שווים על הישר']
  },
  {
    id: 'mixed-numbers',
    order: 3,
    title: 'משבר למספר מעורב ולהפך',
    shortTitle: 'מספר מעורב ושבר מדומה',
    subtitle: 'שלמים וחלקים ביחד – מעבר חלק ביניהם',
    description: 'איך הופכים שבר גדול מ-1 (כמו 7/3) למספר מעורב (2 ו-1/3) ואיך חוזרים בחזרה בקלות?',
    iconName: 'Layers',
    accentColor: 'amber',
    bgGradient: 'from-amber-500 to-orange-600',
    coreConcepts: ['שלמים מלאים וחלק שבור', 'המרת שבר מדומה למעורב', 'המרת מספר מעורב לשבר', 'משמעות חילוק עם שארית']
  },
  {
    id: 'same-denom',
    order: 4,
    title: 'פעולות בשברים שהמכנים שלהם שווים',
    shortTitle: 'חיבור וחיסור מכנים שווים',
    subtitle: 'מחברים ומחסרים רק את המונים!',
    description: 'מגלים את הכלל המוזהב: למה המכנה אף פעם לא משתנה בחיבור וחיסור, ואיך מחסרים משלם שלם.',
    iconName: 'PlusCircle',
    accentColor: 'rose',
    bgGradient: 'from-rose-500 to-red-600',
    coreConcepts: ['חיבור מונים בלבד', 'המכנה נשאר זהה', 'חיסור משלם שלם', 'תוצאה הגדולה מ-1']
  },
  {
    id: 'part-of-quantity',
    order: 5,
    title: 'השבר כחלק מכמות – חזרה והעמקה',
    shortTitle: 'שבר כחלק מכמות',
    subtitle: 'כמה זה חצי מ-12? ושלושה רבעים מ-20?',
    description: 'מחלקים אוסף של עצמים לקבוצות שוות, ומחשבים כמה שווה חלק מהכמות.',
    iconName: 'Coins',
    accentColor: 'sky',
    bgGradient: 'from-sky-500 to-cyan-600',
    coreConcepts: ['חלוקה לקבוצות שוות לפי המכנה', 'לקיחת קבוצות לפי המונה', 'שבר יחידה מכמות', 'כפל וחילוק בכמות']
  },
  {
    id: 'fractional-amount',
    order: 6,
    title: 'השבר ככמות חלקית',
    shortTitle: 'מציאת השלם והחלק',
    subtitle: 'פתרון בעיות מילוליות והבנת השלם',
    description: 'אם ידוע לנו החלק – איך מוצאים את הכמות השלמה? בעיות מילוליות מהחיים בצעדים פשוטים.',
    iconName: 'HelpCircle',
    accentColor: 'violet',
    bgGradient: 'from-violet-500 to-purple-600',
    coreConcepts: ['מציאת הכמות הכוללת', 'קשר בין החלק לשלם', 'בעיות מילוליות', 'תרשימי עזר לפתרון']
  },
  {
    id: 'summary-review',
    order: 7,
    title: 'פעילויות לסיכום הפרק',
    shortTitle: 'סיכום ואתגרים',
    subtitle: 'חידון מסלולים פלוס וחידות שברים',
    description: 'מחברים את כל מה שלמדנו: ישר מספרים, פעולות, מספרים מעורבים וכמויות באתגרים מהנים.',
    iconName: 'Award',
    accentColor: 'teal',
    bgGradient: 'from-teal-500 to-emerald-600',
    coreConcepts: ['אינטגרציה של כל החומר', 'פתרון בעיות רב-שלביות', 'הנמקה מתמטית', 'ביטחון והצלחה']
  },
  {
    id: 'decimals-mult-div',
    order: 8,
    title: 'שבר עשרוני – כפל וחילוק',
    shortTitle: 'עשרוני: כפל וחילוק ב-10 וב-100',
    subtitle: 'תזוזת הנקודה העשרונית והערך המקומי',
    description: 'מה קורה למספר עשרוני כשכופלים או מחלקים ב-10 וב-100? קסם הנקודה העשרונית בלוח הערך המקומי.',
    iconName: 'Sliders',
    accentColor: 'fuchsia',
    bgGradient: 'from-fuchsia-500 to-pink-600',
    coreConcepts: ['כפל ב-10 וב-100 (תזוזה ימינה)', 'חילוק ב-10 וב-100 (תזוזה שמאלה)', 'לוח ערך מקומי', 'משמעות גודל המספר']
  }
];

export const TOPIC_LEARNING_CONTENTS: Record<TopicId, TopicLearningContent> = {
  'whole-part': {
    topicId: 'whole-part',
    understandStage: {
      title: 'השבר כחלק משלם – בוא נבין!',
      intro: 'שבר פשוט מורכב משני מספרים וקו שבר ביניהם. כל מספר מספר לנו סיפור אחר לגמרי על הצורה!',
      keyPoints: [
        {
          icon: 'divide',
          title: 'המכנה (למטה)',
          explanation: 'המכנה אומר לכמה חלקים שווים חילקנו את השלם כולו. למשל, אם המכנה הוא 5, העוגה נחתכה ל-5 חתיכות שוות בדיוק.'
        },
        {
          icon: 'check',
          title: 'המונה (למעלה)',
          explanation: 'המונה אומר כמה חלקים כאלה אנחנו לוקחים, צובעים או אוכלים. למשל ב-3/5, לקחנו 3 חתיכות מתוך ה-5.'
        },
        {
          icon: 'alert-triangle',
          title: 'הכלל החשוב ביותר!',
          explanation: 'שבר קיים רק כאשר החלקים שווים זה לזה בגודלם! אם חלק אחד גדול ואחד קטן – זה לא שבר רגיל.'
        }
      ],
      interactiveGuidePrompt: 'שחקו עם הפסים והעיגול למטה: שנו את המכנה וראו מה קורה לגודל החלקים, ושנו את המונה כדי לראות כמה צבועים!',
      interactiveManipulativeType: 'bar',
      commonMistakeWarning: 'זהירות: ככל שהמכנה גדול יותר (למשל 8 לעומת 3), כל חלק קטן יותר! חצי פיצה (1/2) הרבה יותר גדולה משמינית פיצה (1/8).'
    },
    togetherStage: {
      title: 'בוא נעשה יחד: זיהוי שבר בצורה',
      storyContext: 'לפנינו מלבן שוקולד שחולק למספר חלקים שווים, וחלקם נצבעו בתכלת.',
      steps: [
        {
          instruction: 'הבט במלבן השוקולד. בוא נגלה קודם כל את המכנה (המספר התחתון).',
          question: 'לכמה חלקים שווים בסך הכל מחולק המלבן כולו?',
          options: [
            { text: '4 חלקים', isCorrect: false, feedback: 'ספור שוב את כל החלקים במלבן – גם הצבועים וגם הלבנים!' },
            { text: '6 חלקים שווים', isCorrect: true, feedback: 'מצוין! ספרת נכון: יש 6 חלקים שווים בסך הכל. לכן המכנה הוא 6.' },
            { text: '2 חלקים', isCorrect: false, feedback: '2 זה רק חלק, בוא נספור את כל המשבצות ביחד.' }
          ],
          visualState: { totalParts: 6, coloredParts: 4, label: 'מלבן שוקולד' },
          explanationOnSuccess: 'יופי! המכנה שלנו הוא 6 כי השלם מחולק ל-6 חלקים שווים.'
        },
        {
          instruction: 'עכשיו נבדוק את המונה (המספר העליון).',
          question: 'כמה חלקים מתוך ה-6 צבועים בתכלת?',
          options: [
            { text: '6 חלקים', isCorrect: false, feedback: '6 זה כל החלקים. כמה מתוכם בצבע תכלת?' },
            { text: '4 חלקים', isCorrect: true, feedback: 'מדויק לגמרי! 4 חלקים צבועים. לכן המונה הוא 4.' },
            { text: '2 חלקים', isCorrect: false, feedback: '2 הם החלקים הלבנים, אנחנו שואלים על החלקים הצבועים בתכלת.' }
          ],
          visualState: { totalParts: 6, coloredParts: 4, highlightColored: true },
          explanationOnSuccess: 'מעולה! יש 4 חלקים צבועים מתוך 6.'
        },
        {
          instruction: 'נחבר את המונה והמכנה ביחד לשבר אחד.',
          question: 'איזה שבר מייצג את החלק הצבוע?',
          options: [
            { text: '4/6 (ארבע שישיות)', isCorrect: true, feedback: 'כל הכבוד! מונה 4 למעלה, מכנה 6 למטה: ארבע שישיות!' },
            { text: '6/4 (שש רביעיות)', isCorrect: false, feedback: 'שימו לב: המונה (כמה צבוע) למעלה, והמכנה (סך הכל) למטה.' },
            { text: '2/6 (שתי שישיות)', isCorrect: false, feedback: '2/6 מייצג את החלק הלבן שלא צבוע.' }
          ],
          visualState: { totalParts: 6, coloredParts: 4, fractionLabel: '4/6' },
          explanationOnSuccess: 'הצלחת! ראינו ש-4 מתוך 6 חלקים שווים הם ארבע שישיות (4/6).'
        }
      ],
      summary: 'זכור את הנוסחה: המונה (הצבוע) למעלה, המכנה (סך כל החלקים השווים) למטה!'
    }
  },

  'number-line': {
    topicId: 'number-line',
    understandStage: {
      title: 'שברים על ישר המספרים – בוא נבין!',
      intro: 'ישר המספרים הוא כמו סרגל קסום. בין 0 ל-1 יש עולם שלם של שברים קטנים משלם, ומעבר ל-1 יש שברים גדולים משלם.',
      keyPoints: [
        {
          icon: 'maximize-2',
          title: 'היחידה השלמה',
          explanation: 'המרחק בין 0 ל-1 הוא שלם אחד. כדי לדעת איזה שבר נמצא על שנת מסוימת, נבדוק לכמה קטעים שווים חולקה היחידה מ-0 עד 1.'
        },
        {
          icon: 'arrow-right',
          title: 'סופרים קטעים, לא רק קווים!',
          explanation: 'סופרים את "הצעדים" (הרווחים) בין 0 ל-1. אם יש 4 רווחים שווים – כל צעד שווה רבע (1/4).'
        },
        {
          icon: 'target',
          title: 'שברים מעבר ל-1',
          explanation: 'אחרי המספר 1, ממשיכים באותן קפיצות בדיוק: 1 ורבע, 1 וחצי, 1 ושלושה רבעים, 2 שלמים.'
        }
      ],
      interactiveGuidePrompt: 'הסתכלו בישר המספרים למטה: גררו או לחצו על השנתות כדי לראות את הערך השברי של כל צעד.',
      interactiveManipulativeType: 'number-line',
      commonMistakeWarning: 'טעות נפוצה: ילדים לפעמים סופרים את כל הקווים על הישר במקום לספור את המרווחים שבין 0 ל-1!'
    },
    togetherStage: {
      title: 'בוא נעשה יחד: מציאת שבר על ישר המספרים',
      storyContext: 'נתון ישר מספרים ועליו מסומנת נקודה כחולה בין 0 ל-1. עלינו לגלות איזה שבר היא מייצגת.',
      steps: [
        {
          instruction: 'שלב 1: נגלה מהו גודל הצעד (המכנה). נספור כמה קטעים שווים יש בין 0 ל-1.',
          question: 'כמה מרווחים (קטעים שווים) יש בין המספר 0 למספר 1?',
          options: [
            { text: '5 קטעים שווים', isCorrect: true, feedback: 'בדיוק! אם סופרים את הצעדים מ-0 ל-1, יש 5 קפיצות שוות. לכן כל קפיצה היא חמישית (1/5).' },
            { text: '4 קטעים', isCorrect: false, feedback: 'ספור שוב את המרווחים: מ-0 לקו הראשון, לשני, לשלישי, לרביעי, ול-1.' },
            { text: '6 קטעים', isCorrect: false, feedback: 'קצת יותר מדי, נספור שוב בדיוק מ-0 עד 1.' }
          ],
          visualState: { min: 0, max: 1, divisions: 5, highlightedStep: 3 },
          explanationOnSuccess: 'מצוין! הקטע שבין 0 ל-1 מחולק ל-5 קטעים שווים, אז המכנה הוא 5.'
        },
        {
          instruction: 'שלב 2: נספור כמה צעדים קפצנו מ-0 ימינה עד הנקודה הכחולה.',
          question: 'כמה צעדים (חמישיות) עברנו מ-0 עד הנקודה?',
          options: [
            { text: 'צעד 1', isCorrect: false, feedback: 'הנקודה רחוקה יותר מ-0. ספור את הקפיצות.' },
            { text: '3 צעדים', isCorrect: true, feedback: 'נכון מאוד! 1, 2, 3 קפיצות מ-0.' },
            { text: '5 צעדים', isCorrect: false, feedback: '5 צעדים היו מביאים אותנו עד ל-1 השלם!' }
          ],
          visualState: { min: 0, max: 1, divisions: 5, targetIndex: 3, showJumpArcs: true },
          explanationOnSuccess: 'יופי! קפצנו 3 פעמים מתוך 5.'
        },
        {
          instruction: 'שלב 3: כותבים את השבר.',
          question: 'איזה שבר מייצגת הנקודה?',
          options: [
            { text: '3/5 (שלוש חמישיות)', isCorrect: true, feedback: 'כל הכבוד! 3 קפיצות מתוך 5 שוות שלוש חמישיות.' },
            { text: '5/3', isCorrect: false, feedback: '5/3 גדול מ-1, אבל הנקודה שלנו נמצאת לפני 1!' },
            { text: '2/5', isCorrect: false, feedback: 'ספרת 3 צעדים, לא 2!' }
          ],
          visualState: { min: 0, max: 1, divisions: 5, targetIndex: 3, label: '3/5' },
          explanationOnSuccess: 'הצלחת! הנקודה מייצגת 3/5.'
        }
      ],
      summary: 'כדי למקם שבר: סופרים קודם מרווחים בין 0 ל-1 (זה המכנה), ואז סופרים כמה קפצנו מ-0 (זה המונה).'
    }
  },

  'mixed-numbers': {
    topicId: 'mixed-numbers',
    understandStage: {
      title: 'משבר למספר מעורב ולהפך – בוא נבין!',
      intro: 'כשמזמינים פיצה במסיבה, לפעמים נשארים 2 מגשים שלמים ועוד חצי מגש. זהו מספר מעורב!',
      keyPoints: [
        {
          icon: 'box',
          title: 'מספר מעורב',
          explanation: 'מורכב משלם שלם (כמו 2) ומשבר פשוט (כמו 1/3). כותבים: 2 ו-1/3.'
        },
        {
          icon: 'grid',
          title: 'שבר מדומה (גדול מ-1)',
          explanation: 'שבר שבו המונה גדול מהמכנה, למשל 7/3. זה אומר שיש לנו 7 שלישים. מכיוון שכל 3 שלישים הם שלם אחד, יש כאן 2 שלמים ושליש אחד שנשאר!'
        },
        {
          icon: 'refresh-cw',
          title: 'איך ממירים בקלות?',
          explanation: 'משבר למעורב: שואלים "כמה פעמים המכנה נכנס במונה?". למשל ב-11/4: 4 נכנס ב-11 פעמיים שלמות (8), ונשאר שארית 3. לכן: 2 ו-3/4.'
        }
      ],
      interactiveGuidePrompt: 'הביטו במגשי השוקולד: ראו איך 7 רבעים מתחברים לשלם אחד מלא, עוד שלם מלא, ועוד רבע אחד!',
      interactiveManipulativeType: 'mixed',
      commonMistakeWarning: 'שימו לב: המכנה אף פעם לא משתנה בהמרה! אם התחלנו עם רבעים, נישאר עם רבעים.'
    },
    togetherStage: {
      title: 'בוא נעשה יחד: הפיכת שבר 7/3 למספר מעורב',
      storyContext: 'יש לנו 7 חתיכות של עוגה, וכל חתיכה היא שליש (1/3) מעוגה שלמה.',
      steps: [
        {
          instruction: 'כדי להרכיב עוגה שלמה אחת, כמה שלישים דרושים לנו?',
          question: 'כמה שלישים (1/3) יוצרים שלם אחד (1)?',
          options: [
            { text: '3 שלישים', isCorrect: true, feedback: 'נכון מאוד! 3/3 שווים לעוגה שלמה אחת.' },
            { text: '1 שליש', isCorrect: false, feedback: 'שליש אחד הוא רק חלק קטן מעוגה שלמה.' },
            { text: '7 שלישים', isCorrect: false, feedback: '7 שלישים זה כל מה שיש לנו ביחד.' }
          ],
          visualState: { wholeCount: 2, totalPieces: 7, denom: 3 },
          explanationOnSuccess: 'נפלא! כל 3 שלישים הם שלם אחד.'
        },
        {
          instruction: 'יש לנו 7 שלישים בסך הכל. כמה עוגות שלמות (קבוצות של 3) נוכל ליצור?',
          question: 'כמה פעמים 3 נכנס בתוך 7, ומה השארית?',
          options: [
            { text: '2 שלמים ונשאר שליש אחד (שארית 1)', isCorrect: true, feedback: 'מדויק! 3 כפול 2 זה 6, ועוד 1 מגיע ל-7.' },
            { text: '3 שלמים בדיוק', isCorrect: false, feedback: '3 עוגות שלמות היו דורשות 9 שלישים (3 כפול 3), ויש לנו רק 7!' },
            { text: '1 שלם ו-4 שלישים', isCorrect: false, feedback: 'אם נשארו 4 שלישים, אפשר ליצור מהם עוד עוגה שלמה!' }
          ],
          visualState: { wholeCount: 2, remainder: 1, denom: 3 },
          explanationOnSuccess: 'מעולה! יצרנו 2 עוגות שלמות, ונשאר לנו עוד שליש 1.'
        },
        {
          instruction: 'עכשיו נכתוב את המספר המעורב הסופי.',
          question: 'איך נכתוב את התוצאה כמספר מעורב?',
          options: [
            { text: '2 ו-1/3', isCorrect: true, feedback: 'מצוין! 2 שלמים ושליש אחד.' },
            { text: '1 ו-4/3', isCorrect: false, feedback: 'במספר מעורב, חלק השבר חייב להיות קטן מ-1.' },
            { text: '3 ו-1/2', isCorrect: false, feedback: 'המכנה היה ונשאר 3!' }
          ],
          visualState: { mixedResult: '2 1/3' },
          explanationOnSuccess: 'כל הכבוד! למדנו ש-7/3 שווה בדיוק ל-2 ו-1/3.'
        }
      ],
      summary: 'הנוסחה הפשוטה: מונה חלקי מכנה = שלמים (תוצאה) + שבר עם השארית במונה והמכנה המקורי.'
    }
  },

  'same-denom': {
    topicId: 'same-denom',
    understandStage: {
      title: 'פעולות בשברים שהמכנים שלהם שווים – בוא נבין!',
      intro: 'חיבור וחיסור שברים עם מכנה זהה הוא קל ומהנה – רק צריך לזכור את הכלל הכי חשוב במתמטיקה!',
      keyPoints: [
        {
          icon: 'plus',
          title: 'מחברים רק את המונים!',
          explanation: 'המכנה מספר לנו "איזה סוג חתיכות" יש לנו (למשל: שמיניות). אם יש לנו 2 שמיניות ועוד 3 שמיניות – יש לנו 5 שמיניות (5/8).'
        },
        {
          icon: 'shield-alert',
          title: 'אזהרה חמורה: אף פעם לא מחברים מכנים!',
          explanation: '2/5 + 1/5 אינו שווה 3/10! אם מחברים מכנים, החלקים נהיים קטנים יותר, וזה לא הגיוני. המכנה נשאר 5!'
        },
        {
          icon: 'minus',
          title: 'איך מחסרים משלם שלם?',
          explanation: 'כדי לחסר מ-1, נהפוך את ה-1 לשבר בעל אותו מכנה! למשל: 1 פחות 2/7 = 7/7 פחות 2/7 = 5/7.'
        }
      ],
      interactiveGuidePrompt: 'ראו את פסי השברים: צבעו 2 חמישיות, הוסיפו עוד חמישית אחת, וראו שהתוצאה היא 3 חמישיות והמכנה נשאר 5!',
      interactiveManipulativeType: 'bar',
      commonMistakeWarning: 'זכור: המכנה הוא כמו "שם המשפחה" של השבר. הוא לא משתנה בחיבור ובחיסור!'
    },
    togetherStage: {
      title: 'בוא נעשה יחד: תרגיל חיבור 2/7 + 3/7',
      storyContext: 'דני צבע 2/7 מלוח המודעות בכחול, ונועה צבעה 3/7 מהלוח בירוק. איזה חלק מהלוח צבוע ביחד?',
      steps: [
        {
          instruction: 'הבט במכנים של שני השברים: 2/7 ו-3/7.',
          question: 'מה משותף לשני השברים האלו?',
          options: [
            { text: 'יש להם אותו מכנה (7)', isCorrect: true, feedback: 'נכון מאוד! לשניהם יש מכנה 7, כלומר שניהם שביעיות.' },
            { text: 'יש להם אותו מונה', isCorrect: false, feedback: 'המונים הם 2 ו-3, הם שונים!' },
            { text: 'שניהם שווים ל-1', isCorrect: false, feedback: 'שניהם קטנים מ-1.' }
          ],
          visualState: { denom: 7, partA: 2, partB: 3 },
          explanationOnSuccess: 'יופי! מכיוון שהמכנים שווים, החלקים הם בדיוק מאותו גודל.'
        },
        {
          instruction: 'כעת נחבר: מה עושים עם המונים (2 ו-3) ומה עם המכנה (7)?',
          question: 'איך מחשבים את החיבור 2/7 + 3/7?',
          options: [
            { text: 'מחברים את המונים (2+3=5) והמכנה נשאר 7', isCorrect: true, feedback: 'מדויק להפליא! המכנה נשאר 7 ומחברים רק את המונים למעלה.' },
            { text: 'מחברים גם את המונים וגם את המכנים (5/14)', isCorrect: false, feedback: 'זהירות! אם תחבר מכנים, תקבל ארבע-עשריות שהן חלקים קטנים בהרבה. המכנה לא משתנה!' },
            { text: 'מכפילים את המכנה ב-2', isCorrect: false, feedback: 'אין צורך להכפיל, המכנים כבר שווים.' }
          ],
          visualState: { denom: 7, partA: 2, partB: 3, sumNumerator: 5 },
          explanationOnSuccess: 'מעולה! 2 שביעיות + 3 שביעיות = 5 שביעיות.'
        },
        {
          instruction: 'נרשום את התוצאה הסופית.',
          question: 'מהי תוצאת התרגיל?',
          options: [
            { text: '5/7', isCorrect: true, feedback: 'נכון מאוד! 5/7 מהלוח צבוע.' },
            { text: '5/14', isCorrect: false, feedback: 'זכור לא לחבר את המכנים!' },
            { text: '1 שלם', isCorrect: false, feedback: 'שלם שלם היה 7/7, ויש לנו 5/7.' }
          ],
          visualState: { result: '5/7' },
          explanationOnSuccess: 'כל הכבוד! פתרת בהצלחה תרגיל חיבור שברים.'
        }
      ],
      summary: 'חוק זהב: במכנים שווים – מכנה נשאר במקומו, מונים מתחברים או מתחסרים!'
    }
  },

  'part-of-quantity': {
    topicId: 'part-of-quantity',
    understandStage: {
      title: 'השבר כחלק מכמות – בוא נבין!',
      intro: 'עד עכשיו חילקנו צורה אחת (עוגה אחת). עכשיו נחלק אוסף שלם של דברים – כמו חבילת טושים, כדורים או שקית סוכריות!',
      keyPoints: [
        {
          icon: 'users',
          title: 'מחלקים לקבוצות שוות לפי המכנה',
          explanation: 'אם רוצים למצוא 1/3 מתוך 15 תפוחים: מחלקים את 15 התפוחים ל-3 קבוצות שוות. בכל קבוצה יהיו 5 תפוחים!'
        },
        {
          icon: 'check-circle',
          title: 'לוקחים קבוצות לפי המונה',
          explanation: 'אם מבקשים 2/3 מתוך 15: ראינו שבכל שליש יש 5 תפוחים. ניקח 2 קבוצות כאלה: 5 כפול 2 = 10 תפוחים!'
        },
        {
          icon: 'zap',
          title: 'השיטה בשני צעדים:',
          explanation: '1. מחלקים את הכמות במכנה (מגלים כמה יש בקבוצה אחת).\n2. כופלים במונה (לוקחים את מספר הקבוצות הרצוי).'
        }
      ],
      interactiveGuidePrompt: 'נסו למטה: סדרו 12 כוכבים ב-4 קבוצות שוות, וראו כמה כוכבים יש בכל קבוצה (1/4) וכמה יש ב-3 קבוצות (3/4).',
      interactiveManipulativeType: 'quantity',
      commonMistakeWarning: 'אל תתבלבלו בין סדר הפעולות: קודם מחלקים במכנה (למטה), ואז כופלים במונה (למעלה).'
    },
    togetherStage: {
      title: 'בוא נעשה יחד: מציאת 3/4 מתוך 20 בלונים',
      storyContext: 'ביום ההולדת של איתי היו 20 בלונים. 3/4 מהבלונים היו כחולים. כמה בלונים כחולים היו?',
      steps: [
        {
          instruction: 'צעד 1: נחלק את כל 20 הבלונים ל-4 קבוצות שוות (לפי המכנה 4).',
          question: 'כמה בלונים יש בכל קבוצה אחת (מה זה 1/4 מתוך 20)?',
          options: [
            { text: '5 בלונים (כי 20 חלקי 4 = 5)', isCorrect: true, feedback: 'מדויק! חילקנו 20 ב-4 וקיבלנו 5 בלונים בכל קבוצה.' },
            { text: '4 בלונים', isCorrect: false, feedback: '20 חלקי 4 זה לא 4. כמה זה 4 כפול 5?' },
            { text: '10 בלונים', isCorrect: false, feedback: '10 זה חצי מ-20, לא רבע.' }
          ],
          visualState: { totalItems: 20, groups: 4, itemsPerGroup: 5 },
          explanationOnSuccess: 'מעולה! כל קבוצה (שזה 1/4) מכילה 5 בלונים.'
        },
        {
          instruction: 'צעד 2: אנחנו צריכים 3/4, כלומר לקחת 3 קבוצות כאלה.',
          question: 'אם בכל קבוצה יש 5 בלונים, כמה יש ב-3 קבוצות ביחד?',
          options: [
            { text: '15 בלונים (כי 5 כפול 3 = 15)', isCorrect: true, feedback: 'כל הכבוד! 3 קבוצות של 5 שוות 15 בלונים כחולים.' },
            { text: '8 בלונים', isCorrect: false, feedback: 'זכור לכפול: 3 קבוצות של 5, כלומר 5 ועוד 5 ועוד 5.' },
            { text: '20 בלונים', isCorrect: false, feedback: '20 זה כל הבלונים כולם!' }
          ],
          visualState: { totalItems: 20, groups: 4, selectedGroups: 3, result: 15 },
          explanationOnSuccess: 'יופי! 3/4 מתוך 20 הם 15 בלונים.'
        },
        {
          instruction: 'נסכם את התרגיל.',
          question: 'איזה תרגיל מסכם את כל החישוב שעשינו?',
          options: [
            { text: '(20 חלקי 4) כפול 3 = 15', isCorrect: true, feedback: 'נכון מאוד! חילוק במכנה וכפל במונה.' },
            { text: '20 כפול 4 חלקי 3', isCorrect: false, feedback: 'מחלקים במכנה (4) וכופלים במונה (3).' },
            { text: '20 פחות 4 ועוד 3', isCorrect: false, feedback: 'שבר מכמות מחושב בכפל וחילוק, לא בחיבור וחיסור.' }
          ],
          visualState: { formula: '20 ÷ 4 × 3 = 15' },
          explanationOnSuccess: 'הצלחת לפתור את השאלה צעד אחר צעד!'
        }
      ],
      summary: 'למציאת שבר מכמות: כמות חלקי מכנה = קבוצה אחת. תוצאה כפול מונה = התשובה הסופית.'
    }
  },

  'fractional-amount': {
    topicId: 'fractional-amount',
    understandStage: {
      title: 'השבר ככמות חלקית – בוא נבין!',
      intro: 'מה קורה כשמגלים לנו את החלק, ואנחנו צריכים לגלות את השלם כולו? זה כמו לפתור כתב חידה של בלשים!',
      keyPoints: [
        {
          icon: 'help-circle',
          title: 'הבלש המתמטי: מציאת השלם',
          explanation: 'דוגמה: "אם 2/5 ממספר התלמידים בכיתה הם 8, כמה תלמידים יש בכל הכיתה?"'
        },
        {
          icon: 'search',
          title: 'שלב 1: מוצאים שבר יחידה אחד',
          explanation: 'אם 2 חמישיות שוות 8, אז חמישית אחת (1/5) שווה חצי מזה: 8 חלקי 2 = 4 תלמידים.'
        },
        {
          icon: 'check-square',
          title: 'שלב 2: מכפילים במכנה כדי לקבל שלם',
          explanation: 'הכיתה השלמה מורכבת מ-5 חמישיות. אז אם חמישית אחת היא 4, כל הכיתה היא 4 כפול 5 = 20 תלמידים!'
        }
      ],
      interactiveGuidePrompt: 'הסתכלו בדיאגרמת הבלוקים למטה: כשאתם יודעים כמה שווים חלק מהבלוקים, קל לגלות כמה שווה בלוק יחיד ואז לחשב את כל השלם!',
      interactiveManipulativeType: 'bar',
      commonMistakeWarning: 'זהירות: לא לכפול ישר! קודם מחלקים במונה (לגלות כמה זה חלק יחיד), ורק אז כופלים במכנה (בשלם).'
    },
    togetherStage: {
      title: 'בוא נעשה יחד: גילוי הכמות השלמה',
      storyContext: 'רועי קרא 2/3 מעמודי הספר, שהם 30 עמודים. כמה עמודים יש בספר כולו?',
      steps: [
        {
          instruction: 'אנחנו יודעים ש-2 שלישים (2/3) מהספר הם 30 עמודים.',
          question: 'כמה עמודים שווה שליש אחד (1/3) של הספר?',
          options: [
            { text: '15 עמודים (כי 30 חלקי 2 = 15)', isCorrect: true, feedback: 'מצוין! חילקנו את ה-30 עמודים ל-2 חלקים שווים.' },
            { text: '10 עמודים', isCorrect: false, feedback: '30 חלקי 2 זה 15, לא 10.' },
            { text: '60 עמודים', isCorrect: false, feedback: 'שליש אחד חייב להיות קטן יותר מ-2 שלישים!' }
          ],
          visualState: { partsGiven: 2, totalVal: 30, unitVal: 15 },
          explanationOnSuccess: 'יופי! כל שליש מהספר שווה 15 עמודים.'
        },
        {
          instruction: 'בספר השלם יש 3 שלישים (3/3).',
          question: 'כמה עמודים יש בספר כולו (3 שלישים של 15)?',
          options: [
            { text: '45 עמודים (כי 15 כפול 3 = 45)', isCorrect: true, feedback: 'כל הכבוד! 15 + 15 + 15 = 45 עמודים בספר כולו.' },
            { text: '35 עמודים', isCorrect: false, feedback: '15 כפול 3: 10 כפול 3 זה 30, ו-5 כפול 3 זה 15. ביחד 45.' },
            { text: '30 עמודים', isCorrect: false, feedback: '30 עמודים זה רק 2 שלישים, אנחנו מחפשים את הספר כולו!' }
          ],
          visualState: { totalParts: 3, unitVal: 15, totalBook: 45 },
          explanationOnSuccess: 'נהדר! בספר כולו יש 45 עמודים.'
        }
      ],
      summary: 'הכלל למציאת השלם: כמות נתונה חלקי מונה = שבר יחידה. שבר יחידה כפול מכנה = השלם!'
    }
  },

  'summary-review': {
    topicId: 'summary-review',
    understandStage: {
      title: 'פעילויות לסיכום הפרק – בוא נבין!',
      intro: 'הגעת לסיכום פרק שברים חלק א׳! כאן נחבר את כל מה שלמדנו: שבר כחלק משלם, ישר המספרים, מספרים מעורבים, פעולות ושבר מכמות.',
      keyPoints: [
        {
          icon: 'compass',
          title: 'ארגז הכלים שלך לשברים',
          explanation: '1. צורות: מונה (חלקים צבועים) מתוך מכנה (חלקים שווים בסך הכל).\n2. ישר מספרים: סופרים קטעים בין 0 ל-1.\n3. מספר מעורב: שלמים שלמים ועוד חלק שבור.'
        },
        {
          icon: 'cpu',
          title: 'פעולות בשברים',
          explanation: 'במכנים שווים: מחברים או מחסרים אך ורק את המונים! מכנה לא משתנה.\nמ-1 שלם מחסרים אחרי שהופכים אותו לשבר (כמו 5/5).'
        },
        {
          icon: 'award',
          title: 'שבר מכמות',
          explanation: 'מחלקים במכנה (מוצאים שבר יחידה) וכופלים במונה.'
        }
      ],
      interactiveGuidePrompt: 'לחצו על הנושאים שתרצו לרענן, או המשיכו מיד לפתרון תרגילי הסיכום והחידות!',
      interactiveManipulativeType: 'mixed',
      commonMistakeWarning: 'כשפותרים בעיה מילולית, תמיד קראו פעמיים: האם מחפשים חלק מכמות או את הכמות השלמה?'
    },
    togetherStage: {
      title: 'בוא נעשה יחד: אתגר הסיכום של מסלולים פלוס',
      storyContext: 'בפיצרייה אפו 3 מגשי פיצה משפחתיים. כל מגש חולק ל-8 משולשים שווים. הילדים אכלו 19 משולשים.',
      steps: [
        {
          instruction: 'בואו נרשום קודם כל את כמות המשולשים שנאכלו כשבר מדומה.',
          question: 'איזה שבר מייצג 19 משולשים מתוך פיצות המחולקות לשמיניות?',
          options: [
            { text: '19/8 (תשע עשרה שמיניות)', isCorrect: true, feedback: 'מצוין! כל משולש הוא שמינית (1/8), ולכן 19 משולשים הם 19/8.' },
            { text: '8/19', isCorrect: false, feedback: 'המכנה הוא 8 כי כל פיצה חולקה ל-8 חלקים.' },
            { text: '19/24', isCorrect: false, feedback: 'שימו לב: המכנה מייצג חלוקה של פיצה אחת שלמה (8), ולא של כל המגשים יחד!' }
          ],
          visualState: { totalPieces: 19, denom: 8 },
          explanationOnSuccess: 'יופי! השבר המדומה הוא 19/8.'
        },
        {
          instruction: 'כעת נהפוך את 19/8 למספר מעורב: כמה פיצות שלמות נאכלו, וכמה משולשים נשארו?',
          question: 'כמה פעמים 8 נכנס ב-19, ומה השארית?',
          options: [
            { text: '2 שלמים ו-3 שמיניות (2 ו-3/8)', isCorrect: true, feedback: 'מדויק! 8 כפול 2 זה 16, ועוד 3 משולשים זה בדיוק 19.' },
            { text: '3 שלמים בדיוק', isCorrect: false, feedback: '3 פיצות שלמות היו דורשות 24 משולשים (3 כפול 8).' },
            { text: '1 שלם ו-11 שמיניות', isCorrect: false, feedback: 'ב-11 משולשים יש עוד פיצה שלמה אחת!' }
          ],
          visualState: { wholeCount: 2, remainder: 3, denom: 8 },
          explanationOnSuccess: 'נהדר! נאכלו 2 פיצות שלמות ועוד 3 שמיניות.'
        }
      ],
      summary: 'חיברת בהצלחה מושגי שבר יחידה, שבר מדומה ומספר מעורב במשימה אמיתית אחת!'
    }
  },

  'decimals-mult-div': {
    topicId: 'decimals-mult-div',
    understandStage: {
      title: 'שבר עשרוני: כפל וחילוק ב-10 וב-100 – בוא נבין!',
      intro: 'שבר עשרוני הוא שבר שבו המכנה הוא 10, 100 או 1,000. יש לו תכונה קסומה: כפל וחילוק בעשרות ובמאות מזיזים את הנקודה העשרונית!',
      keyPoints: [
        {
          icon: 'arrow-right-circle',
          title: 'כפל ב-10 וב-100: המספר גדל!',
          explanation: 'כשכופלים ב-10 (אפס אחד): הנקודה העשרונית קופצת צעד אחד ימינה.\nלמשל: 3.4 כפול 10 = 34.\nכשכופלים ב-100 (שני אפסים): הנקודה קופצת שני צעדים ימינה. למשל: 0.58 כפול 100 = 58.'
        },
        {
          icon: 'arrow-left-circle',
          title: 'חילוק ב-10 וב-100: המספר קטן!',
          explanation: 'כשמחלקים ב-10 (אפס אחד): הנקודה קופצת צעד אחד שמאלה.\nלמשל: 25 חלקי 10 = 2.5.\nכשמחלקים ב-100: הנקודה קופצת שני צעדים שמאלה. למשל: 7 חלקי 10 = 0.7.'
        },
        {
          icon: 'table',
          title: 'הסבר לפי הערך המקומי',
          explanation: 'בכפל ב-10, כל ספרה שווה פי 10 (עשיריות הופכות ליחידות, יחידות הופכות לעשרות). לכן המספר גדל פי 10!'
        }
      ],
      interactiveGuidePrompt: 'השתמשו בלוח הערך המקומי למטה: לחצו על "כפול 10" או "חלקי 10" וראו כיצד הספרות והנקודה זזות במדויק!',
      interactiveManipulativeType: 'decimal',
      commonMistakeWarning: 'כשזזים ימינה וחסרות ספרות – מוסיפים אפס! למשל: 4.2 כפול 100 = 420 (קפיצה אחת עוקפת את ה-2, וקפיצה שנייה מוסיפה 0).'
    },
    togetherStage: {
      title: 'בוא נעשה יחד: תרגיל 0.45 כפול 10',
      storyContext: 'אנו רוצים לחשב את התרגיל: 0.45 כפול 10, ולהבין מה קורה לספרות.',
      steps: [
        {
          instruction: 'אנו כופלים ב-10. האם המספר 0.45 צריך לגדול או לקטון?',
          question: 'בכפל במספר שלם כמו 10, מה קורה לערך המספר?',
          options: [
            { text: 'המספר גדל פי 10', isCorrect: true, feedback: 'נכון! כפל מגדיל את המספר פי 10.' },
            { text: 'המספר קטן פי 10', isCorrect: false, feedback: 'חילוק מקטין, כפל מגדיל!' },
            { text: 'המספר נשאר אותו דבר', isCorrect: false, feedback: 'כופלים ב-10, לא ב-1.' }
          ],
          visualState: { num: 0.45, multiplier: 10 },
          explanationOnSuccess: 'יופי! מכיוון שכופלים ב-10, המספר נהיה גדול פי 10.'
        },
        {
          instruction: 'בכפל ב-10 (אפס אחד), לאיזה כיוון וכמה צעדים זזה הנקודה העשרונית?',
          question: 'לאן תזוז הנקודה העשרונית?',
          options: [
            { text: 'צעד אחד ימינה', isCorrect: true, feedback: 'מדויק! צעד אחד ימינה מגדיל את המספר.' },
            { text: 'צעד אחד שמאלה', isCorrect: false, feedback: 'שמאלה היה מקטין את המספר (בחילוק).' },
            { text: 'שני צעדים ימינה', isCorrect: false, feedback: 'שני צעדים זזים רק בכפל ב-100 (שני אפסים).' }
          ],
          visualState: { num: 0.45, stepDirection: 'right', stepCount: 1 },
          explanationOnSuccess: 'מצוין! הנקודה עוברת אל בין ה-4 ל-5.'
        },
        {
          instruction: 'נרשום את התוצאה הסופית.',
          question: 'מהי התוצאה של 0.45 כפול 10?',
          options: [
            { text: '4.5', isCorrect: true, feedback: 'כל הכבוד! 0.45 כפול 10 שווה 4.5.' },
            { text: '45', isCorrect: false, feedback: '45 זו תוצאה של כפל ב-100.' },
            { text: '0.045', isCorrect: false, feedback: 'זו תוצאה של חילוק ב-10.' }
          ],
          visualState: { finalResult: 4.5 },
          explanationOnSuccess: 'הצלחת! הנקודה זזה צעד אחד ימינה והגענו ל-4.5.'
        }
      ],
      summary: 'זכור: כפל ב-10/100 מזיז נקודה ימינה (המספר גדל). חילוק ב-10/100 מזיז נקודה שמאלה (המספר קטן).'
    }
  }
};

export const EXERCISE_BANK: Exercise[] = ALL_CURRICULUM_EXERCISES;
