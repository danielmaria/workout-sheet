import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutService } from 'src/app/services/exercise/workout.service';

interface GraphData {
  x: string[];
  y: number[];
  type: string;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  workouts: any[] = [];
  graphData = [] as GraphData[];

  graphLayout = {
    title: 'Gráfico de intensidade e volume',
    xaxis: {
      title: 'Tempo',
    },
    yaxis: {
      title: 'Valores',
    },
  };

  constructor(private router: Router, private workoutService: WorkoutService) {
    this.preencherGraphData();
  }

  private preencherGraphData() {
    const volumeLine: GraphData = {
      x: [],
      y: [],
      type: 'scatter',
      name: 'Volume',
    };

    this.workoutService.getWorkouts().subscribe((workouts) => {
      this.workouts = workouts;

      this.workouts.forEach((workout) => {
        const volumes = this.calcularVolume(workout.workout)
          .reduce((partialSum, a) => (partialSum + a) / 100, 0)
          .toFixed(1);
        volumeLine.x.push(workout.date);
        volumeLine.y.push(volumes);
      });
    });

    this.graphData.push(volumeLine);
  }

  private calcularVolume(workout: any[]) {
    let volumes: any[] = [];
    workout.forEach((workout) => {
      let volume = 0;
      workout.exercises.forEach((exercise: any) => {
        const weight = this.sumAllValues(exercise.weight);
        const repetitions = this.sumAllValues(exercise.repetitions);
        const series = parseFloat(exercise.series);

        volume += weight * repetitions * series;
      });

      volumes.push(volume);
    });

    return volumes;
  }

  private sumAllValues(valueString: string | number): number {
    if (typeof valueString === 'string' && valueString.includes('/')) {
      const values = valueString.split('/').map(Number);
      return values.reduce((acc, curr) => acc + curr, 0) / values.length;
    } else {
      return parseFloat(valueString.toString());
    }
  }

  redirectToWorkouts() {
    this.router.navigate(['/workouts']);
  }
}
