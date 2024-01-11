import { Component } from '@angular/core';
import { WorkoutSheetService } from 'src/app/services/workout-sheet/workout-sheet.service';

@Component({
  selector: 'app-workout-sheet',
  templateUrl: './workout-sheet.component.html',
  styleUrls: ['./workout-sheet.component.scss'],
})
export class WorkoutSheetComponent {
  today = new Date();
  allWorkouts: any[] = [];
  workouts: any[] = [];
  selectedWorkout: any;
  isCollapsed: boolean[] = [];

  constructor(private workoutService: WorkoutSheetService) {
    this.workoutService.getActualWorkout().subscribe((data) => {
      this.workouts = data.workout;
    });
  }

  ngOnInit(): void {
    this.loadExercises();
    this.workoutService.getWorkouts().subscribe((data) => {
      this.allWorkouts = data;
      data.forEach(() => {
        this.isCollapsed.push(true);
      });
    });
  }

  loadExercises(): void {
    this.workoutService.getActualWorkout().subscribe((data) => {
      this.workouts = data.workout;
    });
  }

  populateTable(exercise: any): void {
    this.selectedWorkout = exercise;
  }
}
