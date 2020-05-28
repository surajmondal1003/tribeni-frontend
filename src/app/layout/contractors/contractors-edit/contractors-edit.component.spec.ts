import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorsEditComponent } from './contractors-edit.component';

describe('ContractorsEditComponent', () => {
  let component: ContractorsEditComponent;
  let fixture: ComponentFixture<ContractorsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
