import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutSheetComponent } from './workout-sheet.component';

describe('WorkoutSheetComponent', () => {
  let component: WorkoutSheetComponent;
  let fixture: ComponentFixture<WorkoutSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
