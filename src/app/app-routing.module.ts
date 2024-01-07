import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkoutsComponent } from './pages/workouts/workouts.component';
import { HistoryComponent } from './pages/history/history.component';
import { HomeComponent } from './pages/home/home.component';
import { WorkoutSheetComponent } from './pages/workout-sheet/workout-sheet.component';

const routes: Routes = [
  { path: 'workouts', component: WorkoutSheetComponent },
  { path: 'history', component: HistoryComponent },
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
