import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-workouts',
  templateUrl: './workouts.component.html',
  styleUrls: ['./workouts.component.scss'],
})
export class WorkoutsComponent {
  @Input() workouts: any[] = [];
  selectedWorkout: any;

  constructor() {}

  populateTable(exercise: any): void {
    this.selectedWorkout = exercise;
  }
}
