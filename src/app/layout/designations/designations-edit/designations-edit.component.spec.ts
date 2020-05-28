import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationsEditComponent } from './designations-edit.component';

describe('DesignationsEditComponent', () => {
  let component: DesignationsEditComponent;
  let fixture: ComponentFixture<DesignationsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignationsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
