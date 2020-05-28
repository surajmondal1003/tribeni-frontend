import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReverseGrnDetailsComponent } from './reverse-grn-details.component';

describe('ReverseGrnDetailsComponent', () => {
  let component: ReverseGrnDetailsComponent;
  let fixture: ComponentFixture<ReverseGrnDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReverseGrnDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReverseGrnDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
