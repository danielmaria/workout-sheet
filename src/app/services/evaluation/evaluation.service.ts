import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Evaluation } from './model/evaluation';

@Injectable({
  providedIn: 'root',
})
export class EvaluationService {
  private readonly evaluationUrl = 'assets/evaluations.json';

  constructor(private http: HttpClient) {}

  getLast(): Observable<Evaluation> {
    return this.http.get<any[]>(this.evaluationUrl).pipe(
      map((evaluations) => {
        evaluations.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        return evaluations[0];
      })
    );
  }

  getEvaluations(): Observable<Evaluation[]> {
    return this.http.get<any[]>(this.evaluationUrl);
  }
}
