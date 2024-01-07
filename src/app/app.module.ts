import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist-min';
import { WorkoutsComponent } from './pages/workouts/workouts.component';
import { HistoryComponent } from './pages/history/history.component';
import { HomeComponent } from './pages/home/home.component';
import { WorkoutSheetComponent } from './pages/workout-sheet/workout-sheet.component';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    WorkoutsComponent,
    HistoryComponent,
    HomeComponent,
    WorkoutSheetComponent,
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
