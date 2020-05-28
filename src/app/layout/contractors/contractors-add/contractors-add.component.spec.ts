import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorsAddComponent } from './contractors-add.component';

describe('ContractorsAddComponent', () => {
  let component: ContractorsAddComponent;
  let fixture: ComponentFixture<ContractorsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
