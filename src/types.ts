export type TopicId =
  | 'whole-part'
  | 'number-line'
  | 'mixed-numbers'
  | 'same-denom'
  | 'part-of-quantity'
  | 'fractional-amount'
  | 'summary-review'
  | 'decimals-mult-div';

export type StageType = 'understand' | 'together' | 'practice';
export type TopicStage = StageType;

export interface TopicInfo {
  id: TopicId;
  order: number;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  iconName: string;
  accentColor: string; // tailwind color token
  bgGradient: string;
  coreConcepts: string[];
}

export type SkillTag =
  | 'identify_fraction_shape'
  | 'identify_numerator_denominator'
  | 'number_line_intervals'
  | 'number_line_placement'
  | 'mixed_to_improper'
  | 'improper_to_mixed'
  | 'same_denom_addition'
  | 'same_denom_subtraction'
  | 'same_denom_comparison'
  | 'unit_fraction_of_quantity'
  | 'fraction_of_quantity'
  | 'fraction_word_problems'
  | 'decimal_multiply_10_100'
  | 'decimal_divide_10_100'
  | 'decimal_place_value';

export interface ExerciseChoiceOption {
  id: string;
  label: string; // e.g. "3/5" or "2 1/4" or Hebrew text
  isCorrect: boolean;
  misconceptionTitle?: string;
  misconceptionExplanation?: string;
  misconceptionTip?: string;
}

export interface Exercise {
  id: string;
  topicId: TopicId;
  skillTag: SkillTag;
  difficulty: 1 | 2 | 3 | 4; // 1 = קל, 2 = בינוני, 3 = מתקדם, 4 = מאסטר
  title: string;
  prompt: string;
  hintSteps: string[]; // Progressive hints (1st thought direction, 2nd visual clue, 3rd almost-there)
  extraExplanation: string; // "הסבר נוסף"
  exampleDemonstration?: {
    text: string;
    visualType: string;
    visualProps: Record<string, any>;
  };
  visualType:
    | 'bar'
    | 'circle'
    | 'number-line'
    | 'quantity'
    | 'mixed-bars'
    | 'decimal-table'
    | 'equation'
    | 'book-shape'
    | 'book-egg-order'
    | 'book-comparison'
    | 'book-geoboard';
  visualProps: Record<string, any>;
  answerType:
    | 'choice'
    | 'fraction-input'
    | 'number-line-select'
    | 'interactive-color'
    | 'number-input'
    | 'book-comparison'
    | 'book-egg-order'
    | 'book-geoboard';
  options?: ExerciseChoiceOption[];
  correctFraction?: { whole?: number; numerator: number; denominator: number };
  correctNumber?: number;
  correctTickIndex?: number;
  targetFractionString?: string;
  gentleWrongFeedback: {
    default: string;
    specific?: Record<string, string>;
  };
}

export interface StepByStepExample {
  title: string;
  storyContext: string;
  steps: {
    instruction: string;
    question: string;
    options: { text: string; isCorrect: boolean; feedback: string }[];
    visualState: Record<string, any>;
    explanationOnSuccess: string;
  }[];
  summary: string;
}

export interface TopicLearningContent {
  topicId: TopicId;
  understandStage: {
    title: string;
    intro: string;
    keyPoints: { icon: string; title: string; explanation: string }[];
    interactiveGuidePrompt: string;
    interactiveManipulativeType: 'bar' | 'number-line' | 'mixed' | 'quantity' | 'decimal';
    commonMistakeWarning: string;
  };
  togetherStage: StepByStepExample;
}

export interface StudentProgress {
  totalSolved: number;
  totalCorrect: number;
  totalIncorrect: number;
  timeSpentSeconds: number;
  dailyStreak: number;
  lastActiveDate: string;
  dailyHistory?: Record<string, { solved: number; correct: number; timeSpentSeconds?: number }>;
  topicsProgress: Record<
    TopicId,
    {
      completedUnderstand: boolean;
      completedTogether: boolean;
      exercisesSolved: number;
      correctCount: number;
      currentLevel: 1 | 2 | 3 | 4; // 4 = מאסטר
      consecutiveCorrect: number;
      consecutiveIncorrect: number;
    }
  >;
  errorLog: Array<{
    id: string;
    topicId: TopicId;
    skillTag: SkillTag;
    timestamp: number;
    questionPrompt: string;
    studentAnswer: string;
    correctAnswer: string;
    misconceptionNote: string;
  }>;
}

export interface ParentDiagnosticInsight {
  strengths: string[];
  struggles: string[];
  pedagogicalAdvice: string[];
  totalPracticeTimeFormatted: string;
  accuracyRate: number;
  recentErrors: {
    topicName: string;
    mistakeSummary: string;
    howToHelpAtHome: string;
  }[];
}

export type UserRole = 'student' | 'parent' | 'guest';

export interface UserProfile {
  role: UserRole;
  uid?: string;
  displayName: string;
  email?: string;
  studentCode?: string;
  linkedParentId?: string;
  avatarIcon?: string;
}

export interface LinkedStudentProfile {
  studentId: string;
  studentName: string;
  studentCode?: string;
  magicToken?: string;
  parentId: string;
  createdAt: string;
  lastActiveDate?: string;
  totalSolved?: number;
  totalCorrect?: number;
  accuracyRate?: number;
}
