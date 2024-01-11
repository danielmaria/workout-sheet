type ExerciseFocus =
  | 'CHEST'
  | 'BACK'
  | 'SHOULDERS'
  | 'LEGS'
  | 'ARMS'
  | 'ABDOMEN'
  | 'HAMSTRINGS';

export interface Exercise {
  name: string;
  series: number;
  repetitions: string | number;
  weight: string | number;
  facus: ExerciseFocus;
}

export interface Workout {
  title: string;
  exercises: Exercise[];
}

export interface WorkoutSheet {
  notes: string;
  date: string;
  workout: Workout[];
}
