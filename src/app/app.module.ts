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
