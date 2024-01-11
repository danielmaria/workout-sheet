import { Component, Input } from '@angular/core';
import { GraphData } from '../../../home.component';
import { WorkoutSheet } from 'src/app/pages/workout-sheet/model/workout-sheet';
import { CalcVolume } from 'src/app/shared/calc/calc-volume';

@Component({
  selector: 'app-pie-exercise-volume',
  templateUrl: './pie-exercise-volume.component.html',
  styleUrls: ['./pie-exercise-volume.component.scss'],
})
export class PieExerciseVolumeComponent {
  @Input() actualWorkout!: WorkoutSheet;

  graphForExercisesVsVolumeData = [] as GraphData[];

  ngOnChanges(): void {
    this.fillGraphForExercisesVsVolume();
  }

  private fillGraphForExercisesVsVolume() {
    const sheet: WorkoutSheet = this.actualWorkout;
    let data = {
      values: [] as number[],
      labels: [] as string[],
      type: 'pie',
      textinfo: 'label+percent',
      insidetextorientation: 'radial',
    };
    sheet?.workout?.forEach((w) => {
      data.labels!.push(w.title);
      data.values!.push(CalcVolume.calculateWorkoutVolume(w.exercises));
    });
    this.graphForExercisesVsVolumeData.push(data);
  }
}
