import { Component } from '@angular/core';
import { EvaluationService } from 'src/app/services/evaluation/evaluation.service';
import { Evaluation } from './model/evaluation';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss'],
})
export class EvaluationComponent {
  lastEvaluation!: Evaluation;

  constructor(evaluationService: EvaluationService) {
    evaluationService.getLast().subscribe((e) => (this.lastEvaluation = e));
  }
}
