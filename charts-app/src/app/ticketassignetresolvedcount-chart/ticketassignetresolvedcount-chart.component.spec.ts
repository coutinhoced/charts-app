import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketassignetresolvedcountChartComponent } from './ticketassignetresolvedcount-chart.component';

describe('TicketassignetresolvedcountChartComponent', () => {
  let component: TicketassignetresolvedcountChartComponent;
  let fixture: ComponentFixture<TicketassignetresolvedcountChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketassignetresolvedcountChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketassignetresolvedcountChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
