import { TopicInfo, TopicLearningContent, Exercise, TopicId } from '../types';

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

export const EXERCISE_BANK: Exercise[] = [
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
  // TOPIC 1: השבר כחלק משלם
  {
    id: 'wp-1',
    topicId: 'whole-part',
    skillTag: 'identify_fraction_shape',
    difficulty: 1,
    title: 'זיהוי שבר בצורה',
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
    prompt: 'עוגה חולקה ל-8 חלקים שווים. אכלו 5/8 מהעוגה. איזה חלק מהעוגה נשאר?',
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
    difficulty: 3,
    title: 'אתגר שברים שווים מצוירים',
    prompt: 'איזה שבר מייצג חלק זהה בדיוק לחצי (1/2)?',
    hintSteps: [
      'רמז 1: חצי פיצה שווה לחלק שבו צבענו בדיוק חצי מכל החלקים.',
      'רמז 2: אם פיצה מחולקת ל-8 חלקים שווים, כמה זה בדיוק חצי ממנה?'
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

  // TOPIC 2: שברים על ישר המספרים
  {
    id: 'nl-1',
    topicId: 'number-line',
    skillTag: 'number_line_placement',
    difficulty: 1,
    title: 'מציאת שבר על ישר המספרים',
    prompt: 'הבט בישר המספרים. איזה שבר מסומן בנקודה האדומה בין 0 ל-1?',
    hintSteps: [
      'רמז 1: ספור כמה מרווחים (צעדים) שווים יש בין המספר 0 למספר 1. זהו המכנה!',
      'רמז 2: כעת ספור כמה צעדים קפצנו מ-0 ימינה עד הנקודה האדומה. זהו המונה!'
    ],
    extraExplanation: 'הקטע שבין 0 ל-1 מחולק ל-4 קטעים שווים (המכנה 4). הנקודה נמצאת בשנת השלישית מ-0, לכן זהו השבר 3/4.',
    exampleDemonstration: {
      text: 'בישר שמחולק ל-2 קטעים שווים, הנקודה באמצע היא 1/2.',
      visualType: 'number-line',
      visualProps: { min: 0, max: 1, divisions: 2, targetIndex: 1 }
    },
    visualType: 'number-line',
    visualProps: { min: 0, max: 1, divisions: 4, targetIndex: 3, dotColor: '#ef4444' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '3/4', isCorrect: true },
      { id: 'b', label: '1/4', isCorrect: false, misconceptionExplanation: '1/4 היא השנת הראשונה ליד ה-0.' },
      { id: 'c', label: '2/4', isCorrect: false, misconceptionExplanation: '2/4 היא בדיוק באמצע בין 0 ל-1.' },
      { id: 'd', label: '4/3', isCorrect: false, misconceptionExplanation: '4/3 גדול מ-1, אבל הנקודה שלנו נמצאת לפני 1!' }
    ],
    gentleWrongFeedback: {
      default: 'בוא נספור ביחד: מ-0 לקו הראשון = 1/4, לקו השני = 2/4, ולקו השלישי שבו נמצאת הנקודה = ?'
    }
  },
  {
    id: 'nl-2',
    topicId: 'number-line',
    skillTag: 'number_line_intervals',
    difficulty: 2,
    title: 'גילוי גודל השנת בישר',
    prompt: 'בישר המספרים, הקטע בין 0 ל-1 מחולק ל-6 קטעים שווים. מהו הערך של שנת אחת (קפיצה אחת)?',
    hintSteps: [
      'רמז 1: אם שלם חולק ל-6 קטעים שווים, כל קפיצה בודדת מייצגת שבר יחידה.',
      'רמז 2: שבר יחידה של 6 קטעים הוא 1 חלקי 6.'
    ],
    extraExplanation: 'כאשר מחלקים יחידה שלמה ל-6 קטעים שווים, גודל כל קפיצה הוא שישית אחת (1/6).',
    exampleDemonstration: {
      text: 'חלוקה ל-5 קטעים נותנת קפיצות של 1/5.',
      visualType: 'number-line',
      visualProps: { min: 0, max: 1, divisions: 6, targetIndex: 1 }
    },
    visualType: 'number-line',
    visualProps: { min: 0, max: 1, divisions: 6, targetIndex: 1, dotColor: '#10b981' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '1/6', isCorrect: true },
      { id: 'b', label: '6/1', isCorrect: false, misconceptionExplanation: '6/1 שווה ל-6 שלמים, ופה זו קפיצה קטנה בתוך שלם אחד.' },
      { id: 'c', label: '1/5', isCorrect: false, misconceptionExplanation: 'ספור שוב את הקטעים – יש 6 קטעים ולא 5.' }
    ],
    gentleWrongFeedback: {
      default: 'נזכור: כשמחלקים ל-6 קטעים, כל צעד בודד הוא בדיוק שישית (1/6).'
    }
  },
  {
    id: 'nl-3',
    topicId: 'number-line',
    skillTag: 'number_line_placement',
    difficulty: 3,
    title: 'שבר הגדול מ-1 על ישר המספרים',
    prompt: 'הבט בישר המספרים שנמשך מ-0 עד 2. איזה שבר מסומן בנקודה הסגולה (אחרי המספר 1)?',
    hintSteps: [
      'רמז 1: בדוק קודם לכמה קטעים שווים מחולקת כל יחידה שלמה (למשל מ-0 עד 1, או מ-1 עד 2).',
      'רמז 2: כל יחידה מחולקת ל-3 קטעים שווים (שלישים). הנקודה נמצאת שלם אחד ועוד שליש אחד קדימה.'
    ],
    extraExplanation: 'מ-0 עד 1 יש 3 שלישים (3/3). הנקודה נמצאת צעד אחד מעבר ל-1, כלומר 4 שלישים (4/3) או 1 ו-1/3.',
    exampleDemonstration: {
      text: 'שנת אחת אחרי 1 בישר של רבעים היא 1 ו-1/4 (או 5/4).',
      visualType: 'number-line',
      visualProps: { min: 0, max: 2, divisions: 3, targetIndex: 4 }
    },
    visualType: 'number-line',
    visualProps: { min: 0, max: 2, divisions: 3, targetIndex: 4, dotColor: '#8b5cf6' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '1 ו-1/3 (שהם 4/3)', isCorrect: true },
      { id: 'b', label: '2/3', isCorrect: false, misconceptionExplanation: '2/3 נמצא לפני המספר 1, והנקודה שלנו עברה את המספר 1!' },
      { id: 'c', label: '1 ו-2/3', isCorrect: false, misconceptionExplanation: 'זה צעד אחד אחרי 1, לא שני צעדים.' },
      { id: 'd', label: '5/3', isCorrect: false, misconceptionExplanation: '5/3 היה שני צעדים אחרי 1.' }
    ],
    gentleWrongFeedback: {
      default: 'שימו לב: הנקודה נמצאת מימין ל-1! היא שווה ל-1 שלם ועוד קפיצה אחת של שליש, כלומר 1 ו-1/3.'
    }
  },

  // TOPIC 3: משבר למספר מעורב ולהפך
  {
    id: 'mn-1',
    topicId: 'mixed-numbers',
    skillTag: 'improper_to_mixed',
    difficulty: 1,
    title: 'המרת שבר מדומה למספר מעורב',
    prompt: 'הפכו את השבר 5/2 למספר מעורב:',
    hintSteps: [
      'רמז 1: כל 2 חצאים (2/2) שווים לשלם אחד.',
      'רמז 2: כמה פעמים 2 נכנס בתוך 5? ומה השארית?'
    ],
    extraExplanation: '2 נכנס ב-5 פעמיים שלמות (2 כפול 2 = 4) ונשאר חצי אחד (שארית 1). לכן: 2 ו-1/2.',
    exampleDemonstration: {
      text: '7/2 = 3 שלמים וחצי (3 1/2).',
      visualType: 'mixed-bars',
      visualProps: { wholeCount: 2, remainder: 1, denom: 2 }
    },
    visualType: 'mixed-bars',
    visualProps: { wholeCount: 2, remainder: 1, denom: 2 },
    answerType: 'choice',
    options: [
      { id: 'a', label: '2 ו-1/2', isCorrect: true },
      { id: 'b', label: '1 ו-3/2', isCorrect: false, misconceptionExplanation: 'במספר מעורב אסור שחלק השבר יהיה גדול מ-1 (3/2 גדול מ-1).' },
      { id: 'c', label: '3 ו-1/2', isCorrect: false, misconceptionExplanation: '3 כפול 2 זה 6, אבל היה לנו רק 5!' },
      { id: 'd', label: '5 ו-1/2', isCorrect: false, misconceptionExplanation: '5 זה מספר החצאים הכולל, לא מספר השלמים!' }
    ],
    gentleWrongFeedback: {
      default: 'בוא נחשוב על חצאי תפוזים: אם יש לך 5 חצאי תפוזים, כמה תפוזים שלמים אפשר להרכיב? (כל 2 חצאים = תפוז שלם).'
    }
  },
  {
    id: 'mn-2',
    topicId: 'mixed-numbers',
    skillTag: 'mixed_to_improper',
    difficulty: 2,
    title: 'המרת מספר מעורב לשבר מדומה',
    prompt: 'הפכו את המספר המעורב 3 ו-1/4 לשבר מדומה (שבר שבו המונה גדול מהמכנה):',
    hintSteps: [
      'רמז 1: בכל שלם יש 4 רבעים. כמה רבעים יש ב-3 שלמים?',
      'רמז 2: 3 כפול 4 = 12 רבעים. עכשיו אל תשכח להוסיף את הרבע הנוסף שיש לנו!'
    ],
    extraExplanation: 'ב-3 שלמים יש 12 רבעים (3 כפול 4 = 12). נוסיף את הרבע הקיים: 12 + 1 = 13 רבעים (13/4). המכנה נשאר 4.',
    exampleDemonstration: {
      text: '2 ו-1/3 = (2 כפול 3) + 1 = 7 שלישים (7/3).',
      visualType: 'mixed-bars',
      visualProps: { wholeCount: 3, remainder: 1, denom: 4 }
    },
    visualType: 'mixed-bars',
    visualProps: { wholeCount: 3, remainder: 1, denom: 4 },
    answerType: 'choice',
    options: [
      { id: 'a', label: '13/4', isCorrect: true },
      { id: 'b', label: '12/4', isCorrect: false, misconceptionExplanation: '12/4 זה רק 3 השלמים, שכחת להוסיף את ה-1/4!' },
      { id: 'c', label: '7/4', isCorrect: false, misconceptionExplanation: 'כופלים את השלם (3) במכנה (4), לא מחברים 3 + 4.' },
      { id: 'd', label: '13/3', isCorrect: false, misconceptionExplanation: 'המכנה היה 4 והוא חייב להישאר 4!' }
    ],
    gentleWrongFeedback: {
      default: 'נוסחת הקסם: שלמים כפול מכנה ועוד מונה! 3 כפול 4 = 12, ועוד 1 = 13. והמכנה נשאר 4!'
    }
  },
  {
    id: 'mn-3',
    topicId: 'mixed-numbers',
    skillTag: 'improper_to_mixed',
    difficulty: 3,
    title: 'אתגר המרה מורכבת',
    prompt: 'איזה מספר מעורב שווה לשבר 14/5?',
    hintSteps: [
      'רמז 1: שאל: כמה פעמים 5 נכנס בתוך 14?',
      'רמז 2: 5 נכנס ב-14 פעמיים (5 כפול 2 = 10). כמה נשאר מ-10 עד 14?'
    ],
    extraExplanation: '14 חלקי 5 שווה 2 עם שארית 4. לכן התוצאה היא 2 שלמים ו-4 חמישיות (2 ו-4/5).',
    exampleDemonstration: {
      text: '11/5 = 2 ו-1/5.',
      visualType: 'mixed-bars',
      visualProps: { wholeCount: 2, remainder: 4, denom: 5 }
    },
    visualType: 'mixed-bars',
    visualProps: { wholeCount: 2, remainder: 4, denom: 5 },
    answerType: 'choice',
    options: [
      { id: 'a', label: '2 ו-4/5', isCorrect: true },
      { id: 'b', label: '2 ו-2/5', isCorrect: false, misconceptionExplanation: '14 פחות 10 שווה 4, לא 2!' },
      { id: 'c', label: '3 ו-1/5', isCorrect: false, misconceptionExplanation: '3 כפול 5 זה 15, ואין לנו 15, יש לנו רק 14.' },
      { id: 'd', label: '1 ו-9/5', isCorrect: false, misconceptionExplanation: 'במספר מעורב המונה של השבר חייב להיות קטן מהמכנה.' }
    ],
    gentleWrongFeedback: {
      default: 'בוא נבדוק: 5 כפול 2 = 10. נשאר לנו עוד 4 חמישיות! לכן זה 2 שלמים ו-4/5.'
    }
  },

  // TOPIC 4: פעולות בשברים שהמכנים שלהם שווים
  {
    id: 'sd-1',
    topicId: 'same-denom',
    skillTag: 'same_denom_addition',
    difficulty: 1,
    title: 'חיבור שברים בעלי מכנה שווה',
    prompt: 'פתרו את התרגיל: 2/6 + 3/6 = ?',
    hintSteps: [
      'רמז 1: המכנים שווים (6). מה קורה למכנה בחיבור? הוא נשאר בדיוק אותו דבר!',
      'רמז 2: חברו רק את המונים שלמעלה: 2 + 3 = ?'
    ],
    extraExplanation: 'בחיבור שברים בעלי מכנה זהה, המכנה נשאר 6, ומחברים רק את המונים: 2 + 3 = 5. התוצאה: 5/6.',
    exampleDemonstration: {
      text: '1/5 + 2/5 = 3/5.',
      visualType: 'bar',
      visualProps: { totalParts: 6, coloredParts: 5, color: '#ef4444' }
    },
    visualType: 'bar',
    visualProps: { totalParts: 6, coloredParts: 5, color: '#ef4444' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '5/6', isCorrect: true },
      { id: 'b', label: '5/12', isCorrect: false, misconceptionExplanation: 'אזהרה! אסור לחבר את המכנים (6+6)! המכנה נשאר 6.' },
      { id: 'c', label: '1/6', isCorrect: false, misconceptionExplanation: 'זה חיבור ולא חיסור.' },
      { id: 'd', label: '6/5', isCorrect: false, misconceptionExplanation: 'המונה למעלה (5) והמכנה למטה (6).' }
    ],
    gentleWrongFeedback: {
      default: 'זכור את הכלל המוזהב של כיתה ה׳: המכנה אף פעם לא משתנה בחיבור! מחברים רק את המונים למעלה.'
    }
  },
  {
    id: 'sd-2',
    topicId: 'same-denom',
    skillTag: 'same_denom_subtraction',
    difficulty: 1,
    title: 'חיסור שברים בעלי מכנה שווה',
    prompt: 'פתרו את התרגיל: 7/9 - 4/9 = ?',
    hintSteps: [
      'רמז 1: המכנה 9 נשאר ללא שינוי.',
      'רמז 2: החסירו את המונים: 7 פחות 4 = ?'
    ],
    extraExplanation: 'המכנה נשאר 9. מחסרים את המונים: 7 - 4 = 3. התוצאה היא 3/9.',
    exampleDemonstration: {
      text: '5/7 - 2/7 = 3/7.',
      visualType: 'bar',
      visualProps: { totalParts: 9, coloredParts: 3, color: '#06b6d4' }
    },
    visualType: 'bar',
    visualProps: { totalParts: 9, coloredParts: 3, color: '#06b6d4' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '3/9', isCorrect: true },
      { id: 'b', label: '3/0', isCorrect: false, misconceptionExplanation: 'אסור להחסיר מכנים! המכנה נשאר 9.' },
      { id: 'c', label: '11/9', isCorrect: false, misconceptionExplanation: 'זהו תרגיל חיסור, לא חיבור.' }
    ],
    gentleWrongFeedback: {
      default: 'מחסרים רק את המונים: 7 פחות 4 שווה 3, והמכנה 9 נשאר בדיוק כפי שהיה!'
    }
  },
  {
    id: 'sd-3',
    topicId: 'same-denom',
    skillTag: 'same_denom_subtraction',
    difficulty: 2,
    title: 'חיסור משלם שלם',
    prompt: 'פתרו את התרגיל: 1 - 3/7 = ?',
    hintSteps: [
      'רמז 1: כדי לחסר מ-1 שלם, נהפוך קודם את ה-1 לשבר עם מכנה 7.',
      'רמז 2: 1 שלם שווה ל-7 שביעיות (7/7). כעת חשבו: 7/7 פחות 3/7 = ?'
    ],
    extraExplanation: 'הופכים 1 ל-7/7. כעת מחסרים: 7/7 - 3/7 = 4/7.',
    exampleDemonstration: {
      text: '1 - 2/5 = 5/5 - 2/5 = 3/5.',
      visualType: 'bar',
      visualProps: { totalParts: 7, coloredParts: 4, color: '#ec4899' }
    },
    visualType: 'bar',
    visualProps: { totalParts: 7, coloredParts: 4, color: '#ec4899' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '4/7', isCorrect: true },
      { id: 'b', label: '2/7', isCorrect: false, misconceptionExplanation: '7 פחות 3 זה 4, לא 2!' },
      { id: 'c', label: '3/7', isCorrect: false, misconceptionExplanation: '3/7 זה מה שהחסרנו, לא מה שנשאר.' },
      { id: 'd', label: '1 ו-3/7', isCorrect: false, misconceptionExplanation: 'זה תרגיל חיסור, לא חיבור.' }
    ],
    gentleWrongFeedback: {
      default: 'טיפ של אלופים: הפכו תמיד את המספר 1 לשבר שמתאים למכנה! כאן 1 הופך ל-7/7, ואז 7 פחות 3 = 4 שביעיות.'
    }
  },
  {
    id: 'sd-4',
    topicId: 'same-denom',
    skillTag: 'same_denom_addition',
    difficulty: 3,
    title: 'חיבור שהתוצאה גדולה מ-1',
    prompt: 'חשבו: 4/5 + 3/5 = ? וכתבו כמספר מעורב:',
    hintSteps: [
      'רמז 1: חברו את המונים: 4 + 3 = 7. התוצאה היא 7/5 (שבע חמישיות).',
      'רמז 2: הפכו את 7/5 למספר מעורב: 5 נכנס ב-7 פעם אחת ונשאר 2.'
    ],
    extraExplanation: '4/5 + 3/5 = 7/5. ב-7 חמישיות יש שלם אחד (5/5) ועוד 2 חמישיות. לכן: 1 ו-2/5.',
    exampleDemonstration: {
      text: '3/4 + 2/4 = 5/4 = 1 ו-1/4.',
      visualType: 'mixed-bars',
      visualProps: { wholeCount: 1, remainder: 2, denom: 5 }
    },
    visualType: 'mixed-bars',
    visualProps: { wholeCount: 1, remainder: 2, denom: 5 },
    answerType: 'choice',
    options: [
      { id: 'a', label: '1 ו-2/5', isCorrect: true },
      { id: 'b', label: '7/10', isCorrect: false, misconceptionExplanation: 'זכור לא לחבר מכנים!' },
      { id: 'c', label: '1 ו-1/5', isCorrect: false, misconceptionExplanation: '7 פחות 5 שווה 2, לכן נשארות 2 חמישיות.' },
      { id: 'd', label: '2 שלמים', isCorrect: false, misconceptionExplanation: '2 שלמים היו דורשים 10 חמישיות.' }
    ],
    gentleWrongFeedback: {
      default: 'חברו קודם: 4 + 3 = 7 חמישיות. עכשיו הפכו למספר מעורב: כמה שלמים יש ב-7 חמישיות?'
    }
  },

  // TOPIC 5: השבר כחלק מכמות – חזרה והעמקה
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
    difficulty: 3,
    title: 'בעיית מילולית: שארית הכמות',
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
      { id: 'a', label: '18 מדבקות', isCorrect: true },
      { id: 'b', label: '12 מדבקות', isCorrect: false, misconceptionExplanation: '12 זה כמה שהיא נתנה לחברה, השאלה היא כמה נשאר לה!' },
      { id: 'c', label: '6 מדבקות', isCorrect: false, misconceptionExplanation: '6 זה רק חמישית אחת (1/5).' },
      { id: 'd', label: '15 מדבקות', isCorrect: false, misconceptionExplanation: '15 זה חצי, אבל נשארו לה 3/5.' }
    ],
    gentleWrongFeedback: {
      default: 'שימו לב לשאלה: שאלו כמה נשאר למאיה! חשבו כמה היא נתנה לחברה (12), והחסירו מסך כל המדבקות (30).'
    }
  },

  // TOPIC 6: השבר ככמות חלקית
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

  // TOPIC 7: פעילויות לסיכום הפרק
  {
    id: 'sr-1',
    topicId: 'summary-review',
    skillTag: 'same_denom_addition',
    difficulty: 2,
    title: 'חידת שרשרת שברים',
    prompt: 'מהי התוצאה של התרגיל: 2/9 + 4/9 + 1/9 = ?',
    hintSteps: [
      'רמז 1: לכל שלושת השברים יש מכנה 9.',
      'רמז 2: חברו את כל המונים יחד: 2 + 4 + 1 = ?'
    ],
    extraExplanation: 'המכנה 9 נשאר כפי שהוא. מחברים את המונים: 2 + 4 + 1 = 7. התוצאה היא 7/9.',
    exampleDemonstration: {
      text: '1/7 + 2/7 + 3/7 = 6/7.',
      visualType: 'bar',
      visualProps: { totalParts: 9, coloredParts: 7 }
    },
    visualType: 'bar',
    visualProps: { totalParts: 9, coloredParts: 7, color: '#0ea5e9' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '7/9', isCorrect: true },
      { id: 'b', label: '7/27', isCorrect: false, misconceptionExplanation: 'אל תחברו את המכנים! המכנה נשאר 9.' },
      { id: 'c', label: '6/9', isCorrect: false, misconceptionExplanation: 'ספרו שוב: 2 + 4 = 6, ועוד 1 = 7.' }
    ],
    gentleWrongFeedback: {
      default: 'המכנה נשאר 9, ופשוט מחברים את המונים: 2 + 4 + 1 = ?'
    }
  },
  {
    id: 'sr-2',
    topicId: 'summary-review',
    skillTag: 'mixed_to_improper',
    difficulty: 2,
    title: 'אתגר שוויון מספרים',
    prompt: 'איזה שבר מדומה שווה בדיוק למספר המעורב 2 ו-3/5?',
    hintSteps: [
      'רמז 1: כפלו את השלם (2) במכנה (5): 2 כפול 5 = 10 חמישיות.',
      'רמז 2: הוסיפו את 3 החמישיות שיש לנו: 10 + 3 = ?'
    ],
    extraExplanation: '2 כפול 5 = 10, ועוד 3 = 13. התוצאה היא 13/5.',
    exampleDemonstration: {
      text: '1 ו-2/5 = 7/5.',
      visualType: 'mixed-bars',
      visualProps: { wholeCount: 2, remainder: 3, denom: 5 }
    },
    visualType: 'mixed-bars',
    visualProps: { wholeCount: 2, remainder: 3, denom: 5 },
    answerType: 'choice',
    options: [
      { id: 'a', label: '13/5', isCorrect: true },
      { id: 'b', label: '11/5', isCorrect: false, misconceptionExplanation: '2 כפול 5 זה 10, ועוד 3 זה 13 ולא 11.' },
      { id: 'c', label: '8/5', isCorrect: false, misconceptionExplanation: 'כופלים 2 ב-5 ולא מחברים 2 + 5!' },
      { id: 'd', label: '13/10', isCorrect: false, misconceptionExplanation: 'המכנה נשאר 5!' }
    ],
    gentleWrongFeedback: {
      default: 'שלמים כפול מכנה ועוד מונה: 2 כפול 5 = 10, ועוד 3 = 13 חמישיות.'
    }
  },
  {
    id: 'sr-3',
    topicId: 'summary-review',
    skillTag: 'fraction_word_problems',
    difficulty: 3,
    title: 'משימת סיכום מסלולים פלוס',
    prompt: 'דן אכל 1/4 מפיצה, ויעל אכלה 2/4 מאותה פיצה. איזה חלק מהפיצה נשאר לאכול?',
    hintSteps: [
      'רמז 1: כמה אכלו שניהם ביחד? 1/4 + 2/4 = ?',
      'רמז 2: שניהם אכלו 3/4. הפיצה השלמה היא 4/4. כמה נשאר?'
    ],
    extraExplanation: 'יחד אכלו: 1/4 + 2/4 = 3/4 מהפיצה. פיצה שלמה היא 4/4, ולכן נשאר: 4/4 - 3/4 = 1/4 (רבע).',
    exampleDemonstration: {
      text: 'אם אכלו חצי ועוד רבע (3/4), נשאר רבע (1/4).',
      visualType: 'circle',
      visualProps: { totalParts: 4, coloredParts: 3 }
    },
    visualType: 'circle',
    visualProps: { totalParts: 4, coloredParts: 3, color: '#f59e0b' },
    answerType: 'choice',
    options: [
      { id: 'a', label: '1/4 (רבע פיצה)', isCorrect: true },
      { id: 'b', label: '3/4', isCorrect: false, misconceptionExplanation: '3/4 זה מה שהם אכלו ביחד, השאלה היא מה נשאר!' },
      { id: 'c', label: '2/4', isCorrect: false, misconceptionExplanation: '4 פחות 3 משאיר 1.' }
    ],
    gentleWrongFeedback: {
      default: 'שניהם יחד אכלו 3 רבעים מתוך 4. כמה רבעים חסרים כדי להגיע לפיצה שלמה?'
    }
  },

  // TOPIC 8: שבר עשרוני – כפל וחילוק
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
    difficulty: 3,
    title: 'כפל ב-100 עם הוספת אפס',
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
  }
];
