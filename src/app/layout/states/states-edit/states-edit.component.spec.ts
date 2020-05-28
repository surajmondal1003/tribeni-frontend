import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesEditComponent } from './states-edit.component';

describe('StatesEditComponent', () => {
  let component: StatesEditComponent;
  let fixture: ComponentFixture<StatesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
