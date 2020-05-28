import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAttendanceEditComponent } from './employee-attendance-edit.component';

describe('EmployeeAttendanceEditComponent', () => {
  let component: EmployeeAttendanceEditComponent;
  let fixture: ComponentFixture<EmployeeAttendanceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAttendanceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAttendanceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
