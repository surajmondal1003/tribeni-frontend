import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsEditComponent } from './departments-edit.component';

describe('DepartmentsEditComponent', () => {
  let component: DepartmentsEditComponent;
  let fixture: ComponentFixture<DepartmentsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
