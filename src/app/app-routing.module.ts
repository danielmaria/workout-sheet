import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WorkoutSheetComponent } from './pages/workout-sheet/workout-sheet.component';
import { EvaluationComponent } from './pages/evaluation/evaluation.component';

const routes: Routes = [
  { path: 'workouts', component: WorkoutSheetComponent },
  { path: 'evaluation', component: EvaluationComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
