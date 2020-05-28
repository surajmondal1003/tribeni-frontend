import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GstRatesEditComponent } from './gst-rates-edit.component';

describe('GstRatesEditComponent', () => {
  let component: GstRatesEditComponent;
  let fixture: ComponentFixture<GstRatesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GstRatesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GstRatesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
