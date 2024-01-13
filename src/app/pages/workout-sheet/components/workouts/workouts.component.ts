import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss'],
})
export class WorkoutsComponent {
  @Input() workouts: any[] = [];
  selectedWorkout: any;
  clickedRowIndices: Set<number> = new Set<number>();

  constructor() {}

  populateTable(selectedWorkout: any): void {
    this.selectedWorkout = selectedWorkout;
    this.clickedRowIndices.clear();
  }

  toggleRow(index: number) {
    if (this.clickedRowIndices.has(index)) {
      this.clickedRowIndices.delete(index);
    } else {
      this.clickedRowIndices.add(index);
    }
  }
}
