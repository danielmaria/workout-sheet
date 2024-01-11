import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntensityVolumeComponent } from './intensity-volume.component';

describe('IntensityVolumeComponent', () => {
  let component: IntensityVolumeComponent;
  let fixture: ComponentFixture<IntensityVolumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntensityVolumeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntensityVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
