import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutSheetService } from 'src/app/services/workout-sheet/workout-sheet.service';
import { Exercise, WorkoutSheet } from '../workout-sheet/model/workout-sheet';
import { Evaluation } from '../evaluation/model/evaluation';

interface GraphData {
  x?: string[];
  y?: number[];
  values?: number[];
  labels?: string[];
  type?: string;
  name?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  allEvaluations!: Evaluation[];
  warning: string[] = [];
  workouts: any[] = [];
  actualWorkout!: WorkoutSheet;
  graphData = [] as GraphData[];
  graphForExercisesVsVolumeData = [] as GraphData[];

  graphLayout = {
    title: 'Gráfico de intensidade e volume',
    xaxis: {
      title: 'Tempo',
    },
    yaxis: {
      title: 'Colume',
    },
  };

  graphBodyMeasurementLayout = {
    title: 'Gráfico de medidas corporais',
    xaxis: {
      title: 'Tempo',
    },
    yaxis: {
      title: 'Valores',
    },
  };

  graphForExercisesVsVolume = [
    {
      height: 700,
      width: 700,
    },
  ];

  constructor(
    private router: Router,
    private workoutService: WorkoutSheetService
  ) {
    this.workoutService.getLastWorkout().subscribe((w) => {
      this.actualWorkout = w;
      this.calculateDaysUntilFinishThisWorkout();
      this.fillGraphForExercisesVsVolume();
    });
    this.workoutService.getWorkouts().subscribe((workouts) => {
      this.workouts = workouts;
      this.preencherGraphData();
    });
  }

  private calculateDaysUntilFinishThisWorkout() {
    const currentDate = new Date();
    const today = Date.parse(currentDate.toISOString().slice(0, 10));
    const workoutDate = Date.parse(this.actualWorkout.date);
    const differenceInMilliseconds = workoutDate - today;
    const differenceInDays = Math.ceil(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );

    let message = '';
    if (differenceInDays > 0) {
      message = `Faltam ${differenceInDays} dias para acabar o seu treino atual.`;
    } else {
      message = `Você está com um treino desatualizado (${Math.abs(
        differenceInDays
      )} dias).`;
    }

    this.warning.push(message);
  }

  private fillGraphForExercisesVsVolume() {
    const sheet: WorkoutSheet = this.actualWorkout;
    let data = {
      values: [] as number[],
      labels: [] as string[],
      type: 'pie',
      textinfo: 'label+percent',
      insidetextorientation: 'radial',
    };
    sheet.workout.forEach((w) => {
      data.labels!.push(w.title);
      data.values!.push(this.calculateWorkoutVolume(w.exercises));
    });
    this.graphForExercisesVsVolumeData.push(data);
  }

  private preencherGraphData() {
    const volumeLine: GraphData = {
      x: [],
      y: [],
      type: 'scatter',
      name: 'Volume',
    };
    this.workouts.forEach((workout) => {
      const volumes = this.calculateVolume(workout.workout)
        .reduce((partialSum, a) => (partialSum + a) / 100, 0)
        .toFixed(1);
      volumeLine.x!.push(workout.date);
      volumeLine.y!.push(volumes);
    });

    this.graphData.push(volumeLine);
  }

  private calculateVolume(workout: any[]) {
    let volumes: any[] = [];
    workout.forEach((workout) => {
      let volume = this.calculateWorkoutVolume(workout.exercises);
      volumes.push(volume);
    });

    return volumes;
  }

  private calculateWorkoutVolume(exercises: Exercise[]) {
    let volume = 0;
    exercises.forEach((exercise: Exercise) => {
      const exerciseVolue = this.calculateExerciseVolume(exercise);
      volume += exerciseVolue;
    });
    return volume;
  }

  private calculateExerciseVolume(exercise: Exercise) {
    const weight = this.sumAllValues(exercise.weight);
    const repetitions = this.sumAllValues(exercise.repetitions);
    const series = this.sumAllValues(exercise.series);

    return weight * repetitions * series;
  }

  private sumAllValues(valueString: string | number): number {
    if (typeof valueString === 'string' && valueString.includes('/')) {
      const values = valueString.split('/').map(Number);
      return values.reduce((acc, curr) => acc + curr, 0) / values.length;
    } else {
      return parseFloat(valueString.toString());
    }
  }

  redirectTo(src: string) {
    this.router.navigate([`/${src}`]);
  }
}
