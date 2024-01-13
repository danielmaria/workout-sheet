import { Component, Input } from '@angular/core';
import {
  Evaluation,
  ExerciseMark,
} from 'src/app/services/evaluation/model/evaluation';
import { CalcOneMaximumRepetition } from 'src/app/shared/calc/one-maximum-repetition';

interface TableData extends ExerciseMark {
  oneRepMax: number;
}
@Component({
  selector: 'app-evaluation-table',
  templateUrl: './evaluation-table.component.html',
  styleUrls: ['./evaluation-table.component.scss'],
})
export class EvaluationTableComponent {
  @Input() evaluation?: Evaluation;
  tableData?: any[];

  ngOnChanges(): void {
    if (this.evaluation) {
      this.calculateOneRepMax();
    }
  }

  private calculateOneRepMax() {
    this.tableData = this.evaluation?.maxRepetitions.map((max) => {
      const oneRepMax = CalcOneMaximumRepetition.calculate1RM(max);
      return { ...max, oneRepMax: oneRepMax };
    });
  }
}
