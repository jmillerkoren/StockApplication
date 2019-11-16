import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPredictionComponent } from './stock-prediction.component';

describe('StockPredictionComponent', () => {
  let component: StockPredictionComponent;
  let fixture: ComponentFixture<StockPredictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockPredictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
