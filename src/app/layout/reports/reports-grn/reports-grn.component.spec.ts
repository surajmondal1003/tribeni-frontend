import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsGrnComponent } from './reports-grn.component';

describe('ReportsGrnComponent', () => {
  let component: ReportsGrnComponent;
  let fixture: ComponentFixture<ReportsGrnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsGrnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsGrnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
