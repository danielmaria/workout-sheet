import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { WorkoutSheet } from 'src/app/pages/workout-sheet/model/workout-sheet';

@Injectable({
  providedIn: 'root',
})
export class WorkoutSheetService {
  private readonly workoutsUrl = 'assets/workouts-sheet.json';

  constructor(private http: HttpClient) {}

  getActualWorkout(): Observable<WorkoutSheet> {
    return this.http.get<any[]>(this.workoutsUrl).pipe(
      map((workouts) => {
        const currentDate = new Date();

        const futureWorkouts = workouts.filter(
          (workout) => new Date(workout.date) >= currentDate
        );

        if (futureWorkouts.length > 0) {
          futureWorkouts.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
          return futureWorkouts[0];
        }

        workouts.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        return workouts[0];
      })
    );
  }

  getWorkouts(): Observable<any[]> {
    return this.http.get<any[]>(this.workoutsUrl);
  }
}
