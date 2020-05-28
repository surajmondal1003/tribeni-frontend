import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAttendanceAddComponent } from './employee-attendance-add.component';

describe('EmployeeAttendanceAddComponent', () => {
  let component: EmployeeAttendanceAddComponent;
  let fixture: ComponentFixture<EmployeeAttendanceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAttendanceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAttendanceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
