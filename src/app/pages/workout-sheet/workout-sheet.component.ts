import { Component } from '@angular/core';
import { WorkoutService } from 'src/app/services/exercise/workout.service';

@Component({
  selector: 'app-workout-sheet',
  templateUrl: './workout-sheet.component.html',
  styleUrls: ['./workout-sheet.component.scss'],
})
export class WorkoutSheetComponent {
  allWorkouts: any[] = [];
  workouts: any[] = [];
  selectedWorkout: any;
  isCollapsed: boolean[] = [];

  constructor(private workoutService: WorkoutService) {
    this.workoutService.getLastWorkout().subscribe((data) => {
      this.workouts = data.workout;
    });
  }

  ngOnInit(): void {
    this.loadExercises();
    this.workoutService.getWorkouts().subscribe((data) => {
      data.shift();
      this.allWorkouts = data;
      data.forEach(() => {
        this.isCollapsed.push(true);
      });
    });
  }

  loadExercises(): void {
    this.workoutService.getLastWorkout().subscribe((data) => {
      this.workouts = data.workout;
    });
  }

  populateTable(exercise: any): void {
    this.selectedWorkout = exercise;
  }
}
