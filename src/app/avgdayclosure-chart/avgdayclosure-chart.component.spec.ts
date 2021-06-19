import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgdayclosureChartComponent } from './avgdayclosure-chart.component';

describe('AvgdayclosureChartComponent', () => {
  let component: AvgdayclosureChartComponent;
  let fixture: ComponentFixture<AvgdayclosureChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvgdayclosureChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvgdayclosureChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
