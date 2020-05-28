import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GstRatesAddComponent } from './gst-rates-add.component';

describe('GstRatesAddComponent', () => {
  let component: GstRatesAddComponent;
  let fixture: ComponentFixture<GstRatesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GstRatesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GstRatesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
