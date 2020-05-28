import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTreeComponent } from './company-tree.component';

describe('CompanyTreeComponent', () => {
  let component: CompanyTreeComponent;
  let fixture: ComponentFixture<CompanyTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
