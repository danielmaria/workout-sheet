import { Component, OnInit } from '@angular/core';
import { Layout, PlotData } from 'plotly.js';
import { Evaluation } from 'src/app/pages/evaluation/model/evaluation';
import { EvaluationService } from 'src/app/services/evaluation/evaluation.service';

@Component({
  selector: 'app-body-measurements',
  templateUrl: './body-measurements.component.html',
  styleUrls: ['./body-measurements.component.scss'],
})
export class BodyMeasurementsComponent implements OnInit {
  evaluations: Evaluation[] = [];
  plotData: any[] = [];
  layout: Partial<Layout> = {
    title: 'Medições Corporais ao Longo do Tempo',
    xaxis: {
      title: 'Datas',
    },
    yaxis: {
      title: 'Valores',
    },
  };

  constructor(private evaluationService: EvaluationService) {}

  ngOnInit() {
    this.fetchEvaluations();
  }

  fetchEvaluations() {
    this.evaluationService.getEvaluations().subscribe(
      (data: Evaluation[]) => {
        this.evaluations = data;
        this.createChart();
      },
      (error) => {
        console.error('Error fetching evaluations', error);
      }
    );
  }

  createChart() {
    const uniqueMeasurements = this.getUniqueMeasurements();
    const uniqueDates = this.getUniqueDates();

    uniqueMeasurements.forEach((measurement) => {
      const trace: Partial<PlotData> = {
        x: uniqueDates,
        y: this.getDataForMeasurement(measurement),
        mode: 'lines+markers',
        name: measurement,
      };
      this.plotData.push(trace);
    });
  }

  getUniqueMeasurements(): string[] {
    const uniqueMeasurements: string[] = [];
    this.evaluations.forEach((evaluation) => {
      evaluation.bodyMeasurement.forEach((body) => {
        if (!uniqueMeasurements.includes(body.name)) {
          uniqueMeasurements.push(body.name);
        }
      });
    });
    return uniqueMeasurements;
  }

  getUniqueDates(): Date[] {
    return this.evaluations.map((evaluation) => evaluation.date);
  }

  getDataForMeasurement(measurementName: string): number[] {
    const data: number[] = [];
    this.evaluations.forEach((evaluation) => {
      const measurement = evaluation.bodyMeasurement.find(
        (body) => body.name === measurementName
      );
      data.push(measurement ? measurement.value : 0);
    });
    return data;
  }
}
