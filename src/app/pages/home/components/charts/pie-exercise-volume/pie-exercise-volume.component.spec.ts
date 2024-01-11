import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieExerciseVolumeComponent } from './pie-exercise-volume.component';

describe('PieExerciseVolumeComponent', () => {
  let component: PieExerciseVolumeComponent;
  let fixture: ComponentFixture<PieExerciseVolumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieExerciseVolumeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieExerciseVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
