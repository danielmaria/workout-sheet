import { Exercise } from 'src/app/pages/workout-sheet/model/workout-sheet';

export class CalcVolume {
  static calculateWorkoutVolume(exercises: Exercise[]) {
    let volume = 0;
    exercises.forEach((exercise: Exercise) => {
      const exerciseVolue = this.calculateExerciseVolume(exercise);
      volume += exerciseVolue;
    });
    return volume;
  }

  static calculateExerciseVolume(exercise: Exercise) {
    const weight = this.sumAllValues(exercise.weight);
    const repetitions = this.sumAllValues(exercise.repetitions);
    const series = this.sumAllValues(exercise.series);

    return weight * repetitions * series;
  }

  static sumAllValues(valueString: string | number): number {
    if (typeof valueString === 'string' && valueString.includes('/')) {
      const values = valueString.split('/').map(Number);
      return values.reduce((acc, curr) => acc + curr, 0) / values.length;
    } else {
      return parseFloat(valueString.toString());
    }
  }
}
