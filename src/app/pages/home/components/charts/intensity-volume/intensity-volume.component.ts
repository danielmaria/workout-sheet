import { Component, Input, OnChanges } from '@angular/core';
import { GraphData } from '../../../home.component';
import { CalcVolume } from 'src/app/shared/calc/calc-volume';
import {
  Exercise,
  Workout,
  WorkoutSheet,
} from 'src/app/pages/workout-sheet/model/workout-sheet';

import { CalcOneMaximumRepetition } from 'src/app/shared/calc/one-maximum-repetition';
import {
  Evaluation,
  ExerciseMark,
} from 'src/app/services/evaluation/model/evaluation';

@Component({
  selector: 'app-intensity-volume',
  templateUrl: './intensity-volume.component.html',
  styleUrls: ['./intensity-volume.component.scss'],
})
export class IntensityVolumeComponent implements OnChanges {
  @Input() workouts: WorkoutSheet[] = [];
  @Input() evaluations: Evaluation[] = [];
  graphData = [] as GraphData[];

  graphLayout = {
    title: 'Gráfico de Intensidade e Volume',

    legend: {
      orientation: 'h',
      x: 0,
      y: -0.05,
    },
  };

  ngOnChanges(): void {
    if (this.workouts && this.evaluations) {
      this.fillGraphData();
    }
  }

  private fillGraphData() {
    const volumeLine: GraphData = this.calculateVolumeLine();
    const intensityLine: GraphData = this.calculateIntensityLine();

    this.graphData.push(volumeLine, intensityLine);
  }

  private calculateVolumeLine() {
    const volumeLine: GraphData = {
      x: [],
      y: [],
      type: 'scatter',
      name: 'Volume',
    };
    this.workouts.forEach((workout) => {
      const volumes = this.calculateVolume(workout.workout)
        .reduce((partialSum, a) => partialSum + a)
        .toFixed(1);
      volumeLine.x!.push(workout.date);
      volumeLine.y!.push(volumes / 1000);
    });
    return volumeLine;
  }

  private calculateIntensityLine() {
    const intensityLine: GraphData = {
      x: [],
      y: [],
      type: 'scatter',
      name: 'Intensidade',
    };
    this.workouts.forEach((workout) => {
      const intensity = this.calculateIntensity(workout.workout, workout.date);
      intensityLine.x!.push(workout.date);
      intensityLine.y!.push(intensity / 5);
    });
    return intensityLine;
  }

  private calculateVolume(workout: Workout[]) {
    let volumes: any[] = [];
    workout.forEach((exercise) => {
      let volume = CalcVolume.calculateWorkoutVolume(exercise.exercises);
      volumes.push(volume);
    });

    return volumes;
  }

  private calculateIntensity(workout: Workout[], workoutDate: string) {
    let totalIntensity = 0;
    const matchingEvaluation = this.findMatchingEvaluation(workoutDate);

    if (matchingEvaluation) {
      workout.forEach((exercise) => {
        exercise.exercises.forEach((e) => {
          const exerciseMark = this.findMatchingExerciseMark(
            matchingEvaluation,
            e
          );
          if (exerciseMark) {
            const intensity = this.calculateExerciseIntensity(exerciseMark, e);
            totalIntensity += intensity;
          }
        });
      });
    }

    return totalIntensity;
  }

  private findMatchingEvaluation(workoutDate: string): Evaluation | null {
    // Converter a string de data do treino para um objeto Date
    const workoutDateObject = new Date(workoutDate);

    // Filtrar as avaliações que têm datas antes ou iguais à data do treino
    const matchingEvaluations = this.evaluations.filter(
      (evaluation) => new Date(evaluation.date) <= workoutDateObject
    );

    // Ordenar as avaliações por data em ordem decrescente
    matchingEvaluations.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Retornar a avaliação mais recente que seja anterior ou igual à data do treino
    const matchingEvaluation = matchingEvaluations[0];

    return matchingEvaluation || null;
  }

  private findMatchingExerciseMark(
    evaluation: Evaluation,
    exercise: Exercise
  ): ExerciseMark | null {
    // Encontrar correspondência entre o nome do exercício na planilha de treino e na avaliação
    const matchingMark = evaluation.maxRepetitions.find(
      (mark) => mark.name === exercise.name
    );
    return matchingMark || null;
  }

  private calculateExerciseIntensity(
    exerciseMark: ExerciseMark,
    exercise: Exercise
  ): number {
    // Calcular intensidade usando a fórmula desejada (por exemplo, porcentagem da carga máxima)
    // Neste exemplo, estou usando a fórmula de Brzycki como mencionado anteriormente
    const oneRM = CalcOneMaximumRepetition.calculate1RM(exerciseMark);
    const exerciseWeight = CalcVolume.sumAllValues(exercise.weight);

    const brzyckiConstant = 1.0278;
    const intensity = (exerciseWeight / oneRM) * 100;
    return intensity;
  }
}
