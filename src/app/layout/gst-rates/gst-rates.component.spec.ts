import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GstRatesComponent } from './gst-rates.component';

describe('GstRatesComponent', () => {
  let component: GstRatesComponent;
  let fixture: ComponentFixture<GstRatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GstRatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GstRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
