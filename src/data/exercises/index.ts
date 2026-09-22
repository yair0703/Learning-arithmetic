import { Exercise } from '../../types';
import { wholePartExercises } from './wholePartExercises';
import { numberLineExercises } from './numberLineExercises';
import { mixedNumbersExercises } from './mixedNumbersExercises';
import { sameDenomExercises } from './sameDenomExercises';
import { partOfQuantityExercises } from './partOfQuantityExercises';
import { fractionalAmountExercises } from './fractionalAmountExercises';
import { summaryReviewExercises } from './summaryReviewExercises';
import { decimalsExercises } from './decimalsExercises';

export const ALL_CURRICULUM_EXERCISES: Exercise[] = [
  ...wholePartExercises,
  ...numberLineExercises,
  ...mixedNumbersExercises,
  ...sameDenomExercises,
  ...partOfQuantityExercises,
  ...fractionalAmountExercises,
  ...summaryReviewExercises,
  ...decimalsExercises
];

export {
  wholePartExercises,
  numberLineExercises,
  mixedNumbersExercises,
  sameDenomExercises,
  partOfQuantityExercises,
  fractionalAmountExercises,
  summaryReviewExercises,
  decimalsExercises
};
