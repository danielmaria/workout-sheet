export interface Evaluation {
  date: Date;
  weight: number;
  bodyMeasurement: BodyMeasurement[];
  maxRepetitions: ExerciseEvaluation[];
}

export interface ExerciseEvaluation {
  name: string;
  weight: number;
  repetition: number;
}

export interface BodyMeasurement {
  name: string;
  value: number;
}
