import { Component, Input } from '@angular/core';
import { Evaluation } from '../../model/evaluation';

@Component({
  selector: 'app-evaluation-table',
  templateUrl: './evaluation-table.component.html',
  styleUrls: ['./evaluation-table.component.scss'],
})
export class EvaluationTableComponent {
  @Input() evaluation!: Evaluation;
}
