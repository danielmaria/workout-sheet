import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  graphData = [
    {
      x: ['01-03-2023', '01-06-2023', '01-09-2023'],
      y: [13, 15, 17],
      type: 'scatter',
      name: 'Volume',
    },
    {
      x: ['01-03-2023', '01-06-2023', '01-09-2023'],
      y: [17, 19, 18],
      type: 'scatter',
      name: 'Intensity',
    },
  ];

  graphLayout = {
    title: 'Gráfico de intensidade e volume',
    xaxis: {
      title: 'Tempo',
    },
    yaxis: {
      title: 'Valores',
    },
  };

  constructor(private router: Router) {}

  redirectToWorkouts() {
    this.router.navigate(['/workouts']);
  }
}
