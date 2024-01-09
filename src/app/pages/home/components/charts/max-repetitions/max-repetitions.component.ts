import { Component, Input, OnInit } from '@angular/core';
import { Layout } from 'plotly.js';
import { Evaluation } from 'src/app/pages/evaluation/model/evaluation';
import { EvaluationService } from 'src/app/services/evaluation/evaluation.service';

@Component({
  selector: 'app-max-repetitions',
  templateUrl: './max-repetitions.component.html',
  styleUrls: ['./max-repetitions.component.scss'],
})
export class MaxRepetitionsComponent implements OnInit {
  @Input() evaluations: Evaluation[] = [];
  plotData: any[] = []; // Alterando para any[] por questões de tipagem
  layout: Partial<Layout> = {
    title: 'Medições Corporais ao Longo do Tempo',
    xaxis: {
      title: 'Datas',
    },
    yaxis: {
      title: 'Valores',
    },
  };

  constructor(private evaluationService: EvaluationService) {}

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    this.evaluationService.getEvaluations().subscribe((e) => {
      this.evaluations = e;

      const uniqueExercises = this.getUniqueExercises();
      const uniqueDates = this.getUniqueDates();

      uniqueExercises.forEach((exercise) => {
        const trace = {
          x: uniqueDates.map((date) => new Date(date)),
          y: this.getDataForExercise(exercise),
          mode: 'lines+markers',
          name: exercise,
        };
        this.plotData.push(trace);
      });
    });
  }

  getUniqueDates(): Date[] {
    return this.evaluations.map((evaluation) => evaluation.date);
  }

  getUniqueExercises(): string[] {
    const uniqueExercises: string[] = [];
    this.evaluations.forEach((evaluation) => {
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
    this.evaluations.forEach((evaluation) => {
      const exercise = evaluation.maxRepetitions.find(
        (repetition) => repetition.name === exerciseName
      );
      data.push(exercise ? exercise.weight : 0);
    });
    return data;
  }
}
