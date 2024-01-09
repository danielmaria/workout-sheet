import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxRepetitionsComponent } from './max-repetitions.component';

describe('MaxRepetitionsComponent', () => {
  let component: MaxRepetitionsComponent;
  let fixture: ComponentFixture<MaxRepetitionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxRepetitionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxRepetitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
