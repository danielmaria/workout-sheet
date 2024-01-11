import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist-min';
import { HomeComponent } from './pages/home/home.component';
import { WorkoutSheetComponent } from './pages/workout-sheet/workout-sheet.component';
import { EvaluationComponent } from './pages/evaluation/evaluation.component';
import { EvaluationTableComponent } from './pages/evaluation/components/evaluation-table/evaluation-table.component';
import { WorkoutsComponent } from './pages/workout-sheet/components/workouts/workouts.component';
import { BodyMeasurementsComponent } from './pages/home/components/charts/body-measurements/body-measurements.component';
import { MaxRepetitionsComponent } from './pages/home/components/charts/max-repetitions/max-repetitions.component';
import { WarningsComponent } from './pages/home/components/warnings/warnings.component';
import { PieExerciseVolumeComponent } from './pages/home/components/charts/pie-exercise-volume/pie-exercise-volume.component';
import { IntensityVolumeComponent } from './pages/home/components/charts/intensity-volume/intensity-volume.component';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    WorkoutsComponent,
    HomeComponent,
    WorkoutSheetComponent,
    EvaluationComponent,
    EvaluationTableComponent,
    BodyMeasurementsComponent,
    MaxRepetitionsComponent,
    WarningsComponent,
    PieExerciseVolumeComponent,
    IntensityVolumeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    PlotlyModule,
    HttpClientModule,
    NgbCollapseModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
