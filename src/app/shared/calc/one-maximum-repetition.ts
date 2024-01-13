import { ExerciseMark } from 'src/app/services/evaluation/model/evaluation';

export class CalcOneMaximumRepetition {
  // Função para calcular 1RM usando a fórmula de Brzycki
  static calculate1RM(exercise: ExerciseMark): number {
    const brzyckiConstant = 1.0278;

    return exercise.weight / (brzyckiConstant - 0.0278 * exercise.repetition);
  }
}
