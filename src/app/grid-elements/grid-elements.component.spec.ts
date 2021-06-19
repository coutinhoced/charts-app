import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridElementsComponent } from './grid-elements.component';

describe('GridElementsComponent', () => {
  let component: GridElementsComponent;
  let fixture: ComponentFixture<GridElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridElementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
