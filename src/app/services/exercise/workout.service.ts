import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private readonly exerciseUrl = 'assets/workouts.json';

  constructor(private http: HttpClient) {}

  getLastWorkout(): Observable<any> {
    return this.http.get<any[]>(this.exerciseUrl).pipe(
      map((workouts) => {
        workouts.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        return workouts[0];
      })
    );
  }

  getWorkouts(): Observable<any[]> {
    return this.http.get<any[]>(this.exerciseUrl);
  }
}
