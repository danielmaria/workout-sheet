import { Component, Input, OnChanges } from '@angular/core';
import { Layout } from 'plotly.js';
import { Evaluation } from 'src/app/services/evaluation/model/evaluation';

@Component({
  selector: 'app-max-repetitions',
  templateUrl: './max-repetitions.component.html',
  styleUrls: ['./max-repetitions.component.scss'],
})
export class MaxRepetitionsComponent implements OnChanges {
  @Input() evaluations: Evaluation[] = [];
  plotData: any[] = [];
  layout: Partial<Layout> = {
    title: 'Repetições Máximas',
    yaxis: {
      title: 'Valores',
    },
    legend: {
      orientation: 'h',
      x: 0,
      y: -0.1,
    },
  };

  ngOnChanges(): void {
    this.createChart();
  }

  createChart() {
    const uniqueExercises = this.getUniqueExercises();
    const uniqueDates = this.getUniqueDates();

    uniqueExercises?.forEach((exercise) => {
      const trace = {
        x: uniqueDates.map((date) => new Date(date)),
        y: this.getDataForExercise(exercise),
        mode: 'lines+markers',
        name: exercise,
      };
      this.plotData.push(trace);
    });
  }

  getUniqueDates(): Date[] {
    return this.evaluations?.map((evaluation) => evaluation.date);
  }

  getUniqueExercises(): string[] {
    const uniqueExercises: string[] = [];
    this.evaluations?.forEach((evaluation) => {
      evaluation.maxRepetitions.forEach((repetition) => {
        if (!uniqueExercises.includes(repetition.name)) {
          uniqueExercises.push(repetition.name);
        }
      });
    });
    return uniqueExercises;
  }

  getDataForExercise(exerciseName: string): number[] {
    const data: number[] = [];
    this.evaluations?.forEach((evaluation) => {
      const exercise = evaluation.maxRepetitions.find(
        (repetition) => repetition.name === exerciseName
      );
      data.push(exercise ? exercise.weight : 0);
    });
    return data;
  }
}
