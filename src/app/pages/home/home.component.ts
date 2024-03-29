import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WorkoutSheetService } from 'src/app/services/workout-sheet/workout-sheet.service';
import { WorkoutSheet } from '../workout-sheet/model/workout-sheet';
import { EvaluationService } from 'src/app/services/evaluation/evaluation.service';
import { Evaluation } from 'src/app/services/evaluation/model/evaluation';

export interface GraphData {
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
  warnings: string[] = [];
  workouts: any[] = [];
  actualWorkout!: WorkoutSheet;

  constructor(
    private router: Router,
    private workoutService: WorkoutSheetService,
    private evaluationService: EvaluationService
  ) {
    this.workoutService.getActualWorkout().subscribe((actualWorkout) => {
      this.actualWorkout = actualWorkout;
      this.calculateDaysUntilFinishThisWorkout();
    });
    this.workoutService.getWorkouts().subscribe((workouts) => {
      this.workouts = workouts;
    });
    this.evaluationService.getEvaluations().subscribe((evaluations) => {
      this.allEvaluations = evaluations;
      this.checkIfEvaluationIsUpToDate();
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

    this.warnings.push(message);
  }

  private checkIfEvaluationIsUpToDate() {
    const lastEvaluation = this.allEvaluations
      .slice()
      .sort((a, b) => {
        return Date.parse(a.date.toString()) - Date.parse(b.date.toString());
      })
      .pop();
    if (
      lastEvaluation &&
      new Date(lastEvaluation.date).getTime() <
        new Date().getTime() - 30 * 24 * 60 * 60 * 1000
    ) {
      this.warnings.push('Você está com uma avaliação desatualizada (1 mês).');
    }
  }

  redirectTo(src: string) {
    this.router.navigate([`/${src}`]);
  }
}
