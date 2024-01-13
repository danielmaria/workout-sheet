export interface Evaluation {
  date: Date;
  weight: number;
  bodyMeasurement: BodyMeasurement[];
  maxRepetitions: ExerciseMark[];
}

export interface ExerciseMark {
  name: string;
  weight: number;
  repetition: number;
}

export interface BodyMeasurement {
  name: string;
  value: number;
}
