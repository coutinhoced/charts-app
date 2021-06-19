import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketstatusChartComponent } from './ticketstatus-chart.component';

describe('TicketstatusChartComponent', () => {
  let component: TicketstatusChartComponent;
  let fixture: ComponentFixture<TicketstatusChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketstatusChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketstatusChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
