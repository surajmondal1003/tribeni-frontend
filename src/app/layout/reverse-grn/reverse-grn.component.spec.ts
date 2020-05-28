import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReverseGrnComponent } from './reverse-grn.component';

describe('ReverseGrnComponent', () => {
  let component: ReverseGrnComponent;
  let fixture: ComponentFixture<ReverseGrnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReverseGrnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReverseGrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
